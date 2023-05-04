const bcrypt = require('bcryptjs')

module.exports = {
    formatBcrypt: (password) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password)
        return hash
    },
    formatHash: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}