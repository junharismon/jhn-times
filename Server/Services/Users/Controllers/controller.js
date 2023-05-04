const { response } = require("express");
const User = require("../Models/model");
const { formatBcrypt } = require("../helpers/bcrypt")
const Redis = require("ioredis");

const redis = new Redis({
    port: 13733, // Redis port
    host: process.env.HOST_REDIS_USER, // Redis host
    username: process.env.USERNAME_REDIS, // needs Redis >= 6
    password: process.env.PASSWORD_REDIS_USER,
});

class Controller {
    static async fetchUser(req, res) {
        try {
            const cache = await redis.get("app:users")
            if (cache) {
                const result = JSON.parse(cache)
                res.status(200).json(result)
            } else {
                const user = await User.findAll()
                await redis.set("app:users", JSON.stringify(user))
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async createUser(req, res) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            let hash = formatBcrypt(password)
            const user = await User.createUser({ username, email, password: hash, role, phoneNumber, address })
            await redis.del("app:users", (err, result) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("s", result === 1);
                }
            });
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.deleteUser(id)
            await redis.del("app:users", (err, result) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("s", result === 1);
                }
            });
            res.status(200).json({ message: 'delete success' })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = Controller