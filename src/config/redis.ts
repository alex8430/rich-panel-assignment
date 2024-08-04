import { redis } from './config';
import { createClient } from 'redis';
import Logger from '../utils/Logger';

const redisURL = `redis://:${redis.password}@${redis.host}:${redis.port}`;

const redisClient = createClient({ url: redisURL });

redisClient.on('connect', () => Logger.info('Cache is connecting'));
redisClient.on('ready', () => Logger.info('Cache is ready'));
redisClient.on('end', () => Logger.info('Cache disconnected'));
redisClient.on('reconnecting', () => Logger.info('Cache is reconnecting'));
redisClient.on('error', (e) => Logger.error(e));

(async () => {
  await redisClient.connect();
})();

// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
  await redisClient.disconnect();
});

export default redisClient;
