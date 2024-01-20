const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

// App routes
router.get('/', mainController.home)
router.get('/about', mainController.about)
router.get('/features', mainController.features)
router.get('/faqs', mainController.faqs)

module.exports = router