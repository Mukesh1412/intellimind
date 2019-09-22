const userDataServiceProvider = require("../services/redis/userDataServiceProvider");

module.exports.addUser = async (req, res, next) => {
    try {
        const redis = req.app.get('redis');
        const data = req.body;
        await userDataServiceProvider.addUser(redis, data)
        await userDataServiceProvider.increaseUserCount(redis)
        return res.status(201).json({ success: true, message: 'success fully added' })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports.getUserById = async function (req, res, next) {
    try {
        const redis = req.app.get('redis');
        const userId = req.params.user_id;
        const userDetails = await userDataServiceProvider.getUser(redis, userId);
        console.log("user details ", userDetails);
        return res.status(201).json({
            success: true,
            message: 'successfully fetched',
            user_details: userDetails
        })
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const redis = req.app.get('redis');
        const allUsers = await userDataServiceProvider.getAllUsers(redis);
        return res.status(201).json({
            success:true,
            message:'all users fetched',
            users:allUsers
        })

    } catch (err) {
        console.log(err);
        next(err);
    }
}