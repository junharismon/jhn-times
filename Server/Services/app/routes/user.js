const express = require('express')
const ControllerUser = require('../controllers/controller')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')
const router = express.Router()

router.post('/login', ControllerUser.login)
router.post('/register', ControllerUser.register)
// router.use(authentication)
router.post('/add-admin', ControllerUser.addAdmin)

module.exports = router