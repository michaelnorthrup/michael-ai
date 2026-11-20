import { chat, type Env } from './chat.js';

export { DailyBudget } from './budget.js';

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/chat') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
      return chat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
