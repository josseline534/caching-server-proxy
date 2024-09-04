import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import Cache from './redisCache'

export const cacheMiddleware = (origin: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (req: Request, res: Response, next: NextFunction) => {
    console.group('CACHING PROXY START')
    console.time()
    const url = `${origin}${req.url}`
    console.info('url: ', url)
    const cacheKey = `${req.method}:${req.url}`
    const cache = new Cache()
    const cachedResponse = await cache.getCache(cacheKey)

    if (cachedResponse) {
      res.set('X-Cache', 'HIT')
      console.info('SUCCESS')
      console.timeEnd()
      console.groupEnd()
      return res.send(cachedResponse)
    }

    try {
      const response = await axios.get(url)
      await cache.setCache(cacheKey, response.data)
      res.set('X-Cache', 'MISS')
      console.info('SUCCESS')
      console.timeEnd()
      console.groupEnd()
      return res.send(response.data)
    } catch (error) {
      console.error('[error] .cacheMiddleware: ', error)
      return res.status(500).send('Error fetching from origin server')
    }
  }
}
