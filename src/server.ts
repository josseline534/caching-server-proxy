import express from 'express';
import { cacheMiddleware } from './proxyMiddleware';
import Cache from './redisCache';

export const startServer = (port: number, origin: string) => {
  const app = express();

  app.use(cacheMiddleware(origin));

  app.listen(port, () => {
    console.log(`Caching proxy server started on port ${port}`);
  });
};

export const clearCache = async (key?: string) => {
  console.group('CACHING PROXY START')
  console.time()
  const cache = new Cache()
  await cache.clearCache(key)
  console.timeEnd()
  console.groupEnd()
}