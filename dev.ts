// Local dev server: serves index.html and routes POST /api/chat to the Vercel handler.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { POST } from "./api/chat.ts";

const port = Number(process.env.PORT ?? 3000);

createServer(async (req, res) => {
  if (req.url === "/api/chat" && req.method === "POST") {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const response = await POST(new Request(`http://localhost${req.url}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: Buffer.concat(chunks),
    }));
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) Readable.fromWeb(response.body as any).pipe(res); else res.end();
    return;
  }
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(await readFile("index.html"));
    return;
  }
  res.writeHead(404).end("Not found");
}).listen(port, () => console.log(`http://localhost:${port}`));
