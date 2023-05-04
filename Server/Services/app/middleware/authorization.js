const { User } = require('../models')

module.exports = {
    authorization: async (req, res, next) => {
        try {
            const user = req.user
            if (user.role !== 'admin') {
                throw { name: "forbiddenError" }
            } else {
                next()
            }
        } catch (error) {
            next(error)
        }
    }
}