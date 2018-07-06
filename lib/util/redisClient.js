import Redis from 'ioredis';
import config from 'config';

const redisClient = new Redis(config.redis);
redisClient.set('yelpAccessToken', process.env.YELP_ACCESS_TOKEN);

export default redisClient;

