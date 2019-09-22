class UserDataServiceProvider {
    async getAllUserIds(redis) {
        return new Promise((resolve, reject) => {
            redis.keys('user*', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            })
        })

    }
    async getAllUsers(redis) {
        const userIds = await this.getAllUserIds(redis) || []
        const promiseArr = userIds.map(userId => this.getUserById(redis, userId))
        return Promise.all(promiseArr) 
    }

    async getUserCount(redis) {
        return new Promise((resolve, reject) => {
            redis.get('total_users', (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    async increaseUserCount(redis) {
        return redis.incr('total_users')
    }

    async addUser(redis, data) {
        try {
            const count = await this.getUserCount(redis) || 0;
            console.log(count)
            data._id = parseInt(count) + 1;
            const key = `user:${data._id}`
            console.log(key, data)
            return redis.hmset(key, data)
        } catch (err) {
            console.log(err)
        }
    }

    async getUser(redis, userId) {
        const key = `user:${userId}`
        return new Promise((resolve, reject) => {
            redis.hgetall(key, (err, data) => {
                if (err) {
                    reject(err)
                }
                console.log(data)
                resolve(data)
            })
        })
    }

    async getUserById(redis,key) {
        return new Promise((resolve, reject) => {
            redis.hgetall(key, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

}
module.exports = new UserDataServiceProvider();