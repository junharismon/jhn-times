const express = require('express')
const cors = require('cors')
const { mongoConnect } = require('./config/connection')
const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 4001

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

mongoConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`using port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
