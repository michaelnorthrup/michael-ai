import Anthropic from '@anthropic-ai/sdk';
import { oidcFederationProvider } from '@anthropic-ai/sdk/lib/credentials/oidc-federation';

// Workload Identity Federation with the Worker as its own OIDC issuer.
// The Worker signs a short-lived ES256 JWT with WIF_SIGNING_KEY; the Claude
// Console trusts the matching public key (inline JWKS in wif/jwks.json) and a
// federation rule exchanges the JWT for a short-lived, inference-only token.
// No Anthropic API key exists anywhere.

export interface AuthEnv {
  WIF_SIGNING_KEY?: string; // private JWK (secret)
  WIF_ISSUER: string;
  WIF_SUBJECT: string;
  WIF_AUDIENCE: string;
  ANTHROPIC_ORGANIZATION_ID: string;
  ANTHROPIC_FEDERATION_RULE_ID: string;
  ANTHROPIC_WORKSPACE_ID?: string;
  ANTHROPIC_API_KEY?: string; // optional local-dev fallback
}

const ASSERTION_TTL_SECONDS = 300;

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlJson = (value: unknown) => b64url(new TextEncoder().encode(JSON.stringify(value)));

async function importSigningKey(jwkJson: string): Promise<{ key: CryptoKey; kid: string }> {
  const jwk = JSON.parse(jwkJson) as JsonWebKey & { kid?: string };
  if (!jwk.kid) throw new Error('WIF_SIGNING_KEY is missing a kid');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  return { key, kid: jwk.kid };
}

export function identityTokenProvider(env: AuthEnv & { WIF_SIGNING_KEY: string }) {
  const signing = importSigningKey(env.WIF_SIGNING_KEY);
  return async (): Promise<string> => {
    const { key, kid } = await signing;
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'ES256', typ: 'JWT', kid };
    const claims = {
      iss: env.WIF_ISSUER,
      sub: env.WIF_SUBJECT,
      aud: env.WIF_AUDIENCE,
      iat: now,
      exp: now + ASSERTION_TTL_SECONDS,
      jti: crypto.randomUUID(),
    };
    const input = `${b64urlJson(header)}.${b64urlJson(claims)}`;
    // WebCrypto ECDSA returns the raw r||s signature, which is what JWS ES256 expects.
    const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(input));
    return `${input}.${b64url(new Uint8Array(sig))}`;
  };
}

let cached: { signature: string; client: Anthropic } | undefined;

/** One client per isolate; the SDK caches and refreshes the access token. */
export function anthropicClient(env: AuthEnv): Anthropic {
  const signature = `${env.WIF_SIGNING_KEY ? 'wif' : 'key'}:${env.ANTHROPIC_FEDERATION_RULE_ID}`;
  if (cached?.signature === signature) return cached.client;

  let client: Anthropic;
  if (env.WIF_SIGNING_KEY) {
    const baseURL = 'https://api.anthropic.com';
    client = new Anthropic({
      baseURL,
      credentials: oidcFederationProvider({
        identityTokenProvider: identityTokenProvider({ ...env, WIF_SIGNING_KEY: env.WIF_SIGNING_KEY }),
        federationRuleId: env.ANTHROPIC_FEDERATION_RULE_ID,
        organizationId: env.ANTHROPIC_ORGANIZATION_ID,
        workspaceId: env.ANTHROPIC_WORKSPACE_ID || undefined,
        baseURL,
        fetch: (input, init) => fetch(input, init),
      }),
    });
  } else if (env.ANTHROPIC_API_KEY) {
    client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  } else {
    throw new Error('No Anthropic credentials: set WIF_SIGNING_KEY (or ANTHROPIC_API_KEY for local dev)');
  }
  cached = { signature, client };
  return client;
}
