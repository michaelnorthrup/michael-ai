// Generates the Worker's WIF signing key pair.
//   private JWK -> .keys/wif-signing-key.json (gitignored, mode 600)
//   public JWKS -> wif/jwks.json (committed; paste into the Console issuer)
// The private key is never printed.
import { mkdir, writeFile, access } from 'node:fs/promises';

const privPath = '.keys/wif-signing-key.json';
try {
  await access(privPath);
  console.error(`${privPath} already exists. Delete it first to rotate.`);
  process.exit(1);
} catch {}

const { privateKey, publicKey } = await crypto.subtle.generateKey(
  { name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify'],
);
const kid = `michael-ai-${new Date().toISOString().slice(0, 10)}`;
const priv = { ...(await crypto.subtle.exportKey('jwk', privateKey)), kid, alg: 'ES256', use: 'sig' };
const pub = await crypto.subtle.exportKey('jwk', publicKey);
const jwks = { keys: [{ kty: pub.kty, crv: pub.crv, x: pub.x, y: pub.y, kid, alg: 'ES256', use: 'sig' }] };

await mkdir('.keys', { recursive: true, mode: 0o700 });
await writeFile(privPath, JSON.stringify(priv), { mode: 0o600 });
await mkdir('wif', { recursive: true });
await writeFile('wif/jwks.json', JSON.stringify(jwks, null, 2) + '\n');
console.log(`Wrote ${privPath} (private, gitignored) and wif/jwks.json (public).`);
