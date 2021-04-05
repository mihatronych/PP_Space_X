const Router = require('express')
const router = new Router()
const gamerRouter = require('./gamerRouter')
const sessionRouter = require('./sessionRouter')
const countryRouter = require('./countryRouter')

router.use('/gamer', gamerRouter)
router.use('/session', sessionRouter)
router.use('/country', countryRouter)

module.exports = router