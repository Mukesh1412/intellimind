const dotenv = require('dotenv')
dotenv.config()

const config = {
    redis:{
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB,
        port: process.env.REDIS_PORT
    }
}

module.exports = config
