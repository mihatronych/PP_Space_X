const Router = require('express')
const router = new Router()
const gamerController = require('../controllers/gamerController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', gamerController.registration)
router.post('/login', gamerController.login)
router.get('/auth', authMiddleware, gamerController.check)
router.get('/', gamerController.getAll)
router.get('/:id', gamerController.getOne)
router.put('/',authMiddleware, gamerController.update)
router.delete('/:id',authMiddleware, gamerController.delete)
//Еще нужен delete

module.exports = router