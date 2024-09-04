import express from 'express';
import { cacheMiddleware } from './proxyMiddleware';
import Cache from './redisCache';

export const startServer = (port: number, origin: string) => {
  console.log('origin: ', origin);
  const app = express();

  app.use(cacheMiddleware(origin));

  app.listen(port, () => {
    console.log(`Caching proxy server started on port ${port}`);
  });
};

export const clearCache = async (key?: string) => {
  const cache = new Cache()
  await cache.clearCache(key)
}