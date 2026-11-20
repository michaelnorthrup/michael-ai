import { chat, type Env } from './chat.js';

export { DailyBudget } from './budget.js';

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // One canonical address: www.mnorthrup.com -> mnorthrup.com
    if (url.hostname === 'www.mnorthrup.com') {
      url.hostname = 'mnorthrup.com';
      return Response.redirect(url.toString(), 301);
    }

    if (pathname === '/api/chat') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
      return chat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
