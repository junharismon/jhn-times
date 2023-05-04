const express = require('express')
const ControllerCategory = require('../controllers/controllerCategory')
const { authorization } = require('../middleware/authorization')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

router.get('/', ControllerCategory.fetchCategory)
// router.use(authentication)
router.post('/', ControllerCategory.createCategory)
router.delete('/:id', ControllerCategory.deleteCategory)
router.put('/:id', ControllerCategory.updateCategory)

module.exports = router