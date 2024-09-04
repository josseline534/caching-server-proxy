import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import Cache from './redisCache'

export const cacheMiddleware = (origin: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = `${req.method}:${req.url}`
    const cache = new Cache()
    const cachedResponse = await cache.getCache(cacheKey)

    if (cachedResponse) {
      res.set('X-Cache', 'HIT')
      return res.send(cachedResponse)
    }

    try {
      const response = await axios.get(`${origin}${req.url}`)
      await cache.setCache(cacheKey, response.data)
      res.set('X-Cache', 'MISS')
      return res.send(response.data)
    } catch (error) {
      console.error('[error] .cacheMiddleware: ', error)
      return res.status(500).send('Error fetching from origin server')
    }
  }
}
