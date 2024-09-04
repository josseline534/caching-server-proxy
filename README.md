# Node.js Application with TypeScript and Redis

This is a Node.js backend application built with TypeScript that connects to a Redis database.

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Redis server (local, Docker, or managed service like AWS ElastiCache)
- Docker (if you plan to run Redis in a Docker container)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd CachingProxy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**

Create a .env file in the root directory and configure the following environment variables:

   ```.env
   REDIS_HOST=localhost
   ```

## Running the Application

1. **Compile TypeScript:**

   ```bash
   npm run build
   ```

2. **Start the Local Application:**

   ```bash
   npm run dev:exec -- start --port 3000 --origin https://pokeapi.co/api/v2
   ```

3. **Start the Prod Application:**

   ```bash
   npm run exec -- start --port 3000 --origin https://pokeapi.co/api/v2
   ```

4. **Clear cache the Local Application:**

   ```bash
   npm run dev:exec -- clear-cache
   ```

5. **Clear cache the Local Application:**

   ```bash
   npm run exec -- clear-cache
   ```

## Running Redis with Docker (Optional)

If you don't have a Redis server running, you can use Docker to run Redis locally:

1. **Create a `docker-compose.yml` file:**

  ```yaml
   version: '3.8'

  services:
    redis:
      image: redis:alpine
      container_name: redis
      ports:
        - "6379:6379"
  ```

2.**Start Redis with Docker Compose:**

  ```bash
  docker-compose up -d
  ```

  This will start a Redis server on localhost:6379.

## Install CLI

1.**Vía `npm`:**

  ```bash
  npm i caching-server-proxy
  ```

2.**Start Application:**

  ```bash
  caching-server-proxy start --port 3000 --origin https://pokeapi.co/api/v2
  ```

3.**Clear Cache Application:**

  ```bash
  caching-server-proxy clear-cache
  ```

## Links project

[GitHub](https://github.com/josseline534/caching-server-proxy 'GitHub')

[NPM](https://www.npmjs.com/package/caching-server-proxy 'npm')

[WebSite](https://josseline534.github.io/professional-profile/ 'WebSite')
