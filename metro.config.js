const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const target = process.env.EXPO_PUBLIC_PANEL_PROXY_ORIGIN;

if (target) {
  const upstream = new URL(target);
  if (upstream.protocol !== 'https:') throw new Error('Panel proxy requires HTTPS');
  config.server = {
    ...config.server,
    enhanceMiddleware: (middleware) => async (req, res, next) => {
      if (!req.url.startsWith('/panel-api/')) return middleware(req, res, next);
      const path = req.url.slice('/panel-api'.length);
      const origin = req.headers.origin;
      if (req.method !== 'POST' || !['/system', '/data', '/site'].includes(path) ||
          (origin && origin !== `http://${req.headers.host}`) ||
          !['localhost:8081', '127.0.0.1:8081'].includes(req.headers.host)) {
        res.writeHead(403).end();
        return;
      }
      try {
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 65536) {
            res.writeHead(413).end();
            return;
          }
          chunks.push(chunk);
        }
        const response = await fetch(new URL(path, upstream), {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: Buffer.concat(chunks),
          redirect: 'error',
          signal: AbortSignal.timeout(60000),
        });
        res.writeHead(response.status, {
          'Content-Type': response.headers.get('content-type') || 'application/json',
          'Cache-Control': 'no-store',
        });
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: false, msg: 'Panel proxy request failed' }));
      }
    },
  };
}

module.exports = config;
