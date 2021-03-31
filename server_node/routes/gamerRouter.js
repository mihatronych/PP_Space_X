const Router = require('express')
const router = new Router()
const gamerController = require('../controllers/gamerController')

router.post('/registration', gamerController.registration)
router.post('/login', gamerController.login)
router.get('/auth', gamerController.check)
//Еще нужен delete

module.exports = router