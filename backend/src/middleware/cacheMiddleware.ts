/**
 * Middleware Server Cache
 */

import Elysia from "elysia";
import path from "path";
import { cache as lruCache, defaultTTL } from "@lib/cache";

const cacheMiddleware = (ttl: number = 1) => (app: Elysia) => app
  .decorate("key", "")
  .decorate("newTTL", 0)

  .onBeforeHandle((apps) => {
    apps.set.headers["Cache-Control"] = `public, max-age=${1 * 60}`;
    apps.set.headers["x-powered-by"] = "Elysia";

    const key = path.join(apps.request.url, "/").replace(/\\/g, "/");
    const cachedData = lruCache.get(key);
    console.log("Cache key:", key);
    const newTTL = ttl ? 1000 * 60 * ttl : defaultTTL;

    if (cachedData) {
      console.log("hit");

      if (typeof cachedData === "object") {
        // console.log("ini object");

        return cachedData;
      }

      if (typeof cachedData === "string") {
        // console.log("ini string");

        return cachedData;
      }

      console.log("ini bukan object / string");

      return String(cachedData);
    }

    console.log("miss");

    apps.key = key
    apps.newTTL = newTTL
  })

  .onAfterHandle(async ({ response, newTTL, key }) => {
    if (!(response instanceof Response)) {
      lruCache.set(key, response as any, { ttl: newTTL });
    }
  })


export default cacheMiddleware;