const jwt = require('jsonwebtoken')
module.exports = {
    formatSign: (payload) => {
        return jwt.sign(payload, process.env.JWT_NEWS)
    },
    formatVerify: (payload) => {
        return jwt.verify(payload, process.env.JWT_NEWS)
    }
}