import { createClient, RedisClientType } from 'redis'
import { ServiceEnv } from './config'

class Cache {
  private client: RedisClientType

  constructor() {
    this.client = createClient({
      url: ServiceEnv.REDIS_HOST
      /* socket: {
        host: ServiceEnv.REDIS_HOST,
        port: ServiceEnv.REDIS_PORT
      } */
    })
    this.client.on('error', (err) => console.error('Redis Client Error', err))
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect()
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect()
    }
  }

  async setCache(key: string, value: unknown): Promise<void> {
    await this.connect()
    await this.client.set(key, JSON.stringify(value), {
      EX: 300,
    })
    await this.disconnect()
  }

  async getCache<T>(key: string): Promise<T | null> {
    await this.connect()
    const data = await this.client.get(key)
    await this.disconnect()
    return data ? (JSON.parse(data) as T) : null
  }

  async clearCache(key?: string): Promise<void> {
    await this.connect()
    if (key)
      await this.client.del(key)
    else
      await this.client.flushAll();
    await this.disconnect()
  }
}

export default Cache
