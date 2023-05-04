const { formatSign } = require('../helpers/JWT')
const { formatCompare } = require('../helpers/bcrypt')
const { User } = require('../models')

class ControllerUser {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "email/password is required" }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { name: "InvalidUser" }
            }
            const isPassword = formatCompare(password, user.password)
            if (!isPassword) {
                throw { name: "InvalidUser" }
            }

            const payload = {
                id: user.id,
                email: user.email,
            }

            const access_token = formatSign(payload)
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            const user = await User.create({ username, email, password, role, phoneNumber, address })
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async addAdmin(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const user = await User.create({ username, email, password, phoneNumber, address })
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerUser