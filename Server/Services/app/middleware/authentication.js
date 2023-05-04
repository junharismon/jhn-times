
const { formatVerify } = require('../helpers/JWT')
const { User } = require('../models')

module.exports = {
    authentication: async (req, res, next) => {
        try {
            if (!req.headers.access_token) {
                throw { name: "InvalidToken" }
            }
            const payload = formatVerify(req.headers.access_token)
            const user = await User.findByPk(payload.id)
            if (!user) {
                throw { name: "InvalidToken" }
            }
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}