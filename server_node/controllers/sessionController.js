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
        let {gamerId} = req.body

        let sessions;
        if (!gamerId){
            sessions = await Session.findAll()
        }
        if (gamerId){
            sessions = await Session.findAll({where: {gamerId}})
        }
        return res.json(sessions)
    }
    async getOne(req, res){
        const {id} = req.params
        const session = await Session.findOne(
            {where: {id}},
        )
        return res.json(session)
    }

    async update(req, res, next){
        try {

            const {id, score, time_session, gamerId} = req.body
            const session = await (await Session.findOne(
                {where: {id}},
            )).update({score:score, time_session:time_session, gamerId:gamerId})
            return res.json({session})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res){    //Вот в этих функциях я максимально неуверен
        const {id} = req.params
        const session = await Session.destroy(
            {where: {id}},
        )
        return res.json(session)
    }
}

module.exports = new SessionController()
