const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGO
const client = new MongoClient(uri);
let DB;
async function mongoConnect() {
    try {
        const database = client.db("JHN");
        // const users = database.collection("users");
        DB = database;
        // console.log(database);
        // console.log(users);
    } catch (err) {
        console.log(err);
        await client.close();
    }
}

function getDB() {
    return DB;
}

module.exports = {
    getDB,
    mongoConnect,
};