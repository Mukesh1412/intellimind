const config = require("../config/database")
const redis = require("redis")
module.exports = function(){
    const redisClient = redis.createClient({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        // db: config.redis.db
    })
    return redisClient
}

