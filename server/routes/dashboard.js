const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const {isLoggedIn} = require('../middleware/checkAuth')

// DASHBOARD route
router.get('/dashboard', isLoggedIn, dashboardController.dashboard)
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote)
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote)
router.delete('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardDeleteNote)
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote)
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSumit)
router.get('/dashboards/search', isLoggedIn, dashboardController.dashboardSearch)
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit)
 
module.exports = router