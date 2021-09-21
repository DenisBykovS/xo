const express = require('express')
const controller = require('../controllers/admin')
const router = express.Router()

router.post('/login', controller.login)
router.get('/register', controller.register)

module.exports = router
