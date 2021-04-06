const Router = require('express')
const router = new Router()
const  countryController = require('../controllers/countryController')

router.post('/', countryController.create)
router.get('/', countryController.getAll)
router.get('/:id', countryController.getOne)
router.put('/', countryController.update)
router.delete('/:id', countryController.delete)
module.exports = router