const express = require('express')
const ControllerNews = require('../controllers/controllerNews')
const { authorization } = require('../middleware/authorization')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

router.get('/', ControllerNews.fetchNews)
router.get('/:slug', ControllerNews.fetchNewsSlug)
// router.use(authentication)
router.post('/', ControllerNews.createNews)
router.delete('/:id', ControllerNews.deleteNews)
router.put('/:id', ControllerNews.updateNews)

module.exports = router