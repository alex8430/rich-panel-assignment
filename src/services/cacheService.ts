import Logger from '../utils/Logger';
import redisClient from '../config/redis';

class CacheService {
  private cacheExpiry = 600; // Cache expiry time (e.g., 10 minutes)

  async get<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return JSON.parse(cachedData) as T;
      }
      return null;
    } catch (error) {
      Logger.error(`Cache GET error for key "${key}":`, error);
      return null; // Return null if there is an error
    }
  }

  async set<T>(key: string, data: T): Promise<void> {
    try {
      await redisClient.set(key, JSON.stringify(data), {
        EX: this.cacheExpiry,
      });
    } catch (error) {
      Logger.error(`Cache SET error for key "${key}":`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      Logger.error(`Cache DEL error for key "${key}":`, error);
    }
  }

  async invalidateCachePattern(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    await Promise.all(keys.map(key => redisClient.del(key)));
  }

}

export default new CacheService();
