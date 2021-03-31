const {Session} = require('../models/models')
const ApiError = require('../error/ApiError')

class SessionController{
    async create(req, res, next){
        try {
            const {score, time_session, gamerId} = req.body
            const session = await Session.create({score, time_session, gamerId})
            return res.json({session})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {gamerId, limit, page} = req.body
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let sessions;
        if (!gamerId){
            sessions = await Session.findAndCountAll({limit, offset})
        }
        if (gamerId){
            sessions = await Session.findAndCountAll({where: {gamerId}, limit, offset})
        }
        return res.json(sessions)
    }
    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne(
            {where: {id}},

        )
        return res.json(device)
    }
}

module.exports = new SessionController()