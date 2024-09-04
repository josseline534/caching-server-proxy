import * as dotenv from 'dotenv'
dotenv.config()

export const ServiceEnv = {
  TAG: 'MODULE_CACHING_PROXY',
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_HOST: process.env.REDIS_HOST,
}
