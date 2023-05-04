const express = require('express')
const Controller = require('../Controllers/controller')
const router = express.Router()

router.post('/users', Controller.createUser)
router.get('/users', Controller.fetchUser)
router.get('/users/:id', Controller.findById)
router.delete('/users/:id', Controller.deleteUser)


module.exports = router