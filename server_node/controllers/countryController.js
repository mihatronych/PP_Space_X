const {Country} = require('../models/models')
const ApiError = require('../error/ApiError')

class CountryController{
    async create(req, res){
        const {name} = req.body
        console.log(req.body);
        console.log("Country create");
        const country = await Country.create({name})
        return res.json({country})
    }
    async getAll(req, res){
        const countries = await Country.findAll()
        return res.json(countries)
    }
    async getOne(req, res){
        const {id} = req.params
        const country = await Country.findOne(
            {where: {id}},
        )
        return res.json(country)
    }
    async update(req, res, next){ //Вот в этих функциях я максимально неуверен
        try {
            const {name} = req.body
            const session = await Country.findOne(
                {where: {name}},
            ).update({name:name})
            return res.json({session})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res){    //Вот в этих функциях я максимально неуверен
        const {id} = req.params
        const session = await Country.destroy(
            {where: {id}},
        )
        return res.json(session)
    }
}

module.exports = new CountryController()
