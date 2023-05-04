const { getDB } = require("../config/connection")
const { ObjectId } = require('mongodb')

class User {
    static getUser() {
        const db = getDB()
        const collection = db.collection('users')
        return collection
    }

    static async createUser({ username, email, password, phoneNumber, address }) {
        const newUser = { username, email, password, role: "admin", phoneNumber, address }
        const user = await this.getUser().insertOne(newUser)
        return {
            ...newUser
        }
    }

    static async findAll() {
        const user = await this.getUser().find().toArray()
        return user
    }

    static async findById(id) {
        const userId = new ObjectId(id)
        const user = await this.getUser().findOne({
            _id: userId
        })
        return user
    }

    static async deleteUser(id) {
        const userId = new ObjectId(id)
        const user = await this.getUser().deleteOne({
            _id: userId
        })
        return user
    }
}

module.exports = User