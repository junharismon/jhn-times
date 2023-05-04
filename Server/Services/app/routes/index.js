const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerNews = require('./news')
const routerCategory = require('./category')

router.use('/users', routerUser)
router.use('/news', routerNews)
router.use('/category', routerCategory)

module.exports = router