const Router = require('express')
const router = new Router()
const sessionController = require('../controllers/sessionController')

router.post('/', sessionController.create)
router.get('/', sessionController.getAll)
router.get('/:id', sessionController.getOne)

module.exports = router