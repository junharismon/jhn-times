const bcrypt = require('bcryptjs')
module.exports = {
    formatHash: (password) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return hash
    },
    formatCompare: (password, hashPasword) => {
        return bcrypt.compareSync(password, hashPasword)
    }
}
