require('dotenv').config()
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// npm i bcrypt jsonwebtoken
const {Gamer} = require('../models/models')

const generateJwt = (id, nickname, email, countryId) =>{
    return jwt.sign(
        {id: id, nickname: nickname, email: email, countryId: countryId},
        process.env.SECRET_KEY,
        {expiresIn: '72h'})
}

class GamerController{
    async registration(req, res, next){
        const {nickname, email, password, countryId} = req.body
        if(!email || !password || !nickname || !countryId){
            return next(ApiError.badRequest('Некорректный nickname, email или password'))
        }
        const candidate1 = await Gamer.findOne({where: {email}})
        if(candidate1){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const candidate2 = await Gamer.findOne({where: {nickname}})
        if(candidate2){
            return next(ApiError.badRequest('Пользователь с таким nickname уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const gamer = await Gamer.create({nickname, email, password: hashPassword, countryId:countryId })
        const token = generateJwt(gamer.id, nickname, email, gamer.countryId)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const gamer = await Gamer.findOne({where: {email}})
        if (!gamer){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, gamer.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(gamer.id, gamer.nickname, email, gamer.countryId)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.gamer.id, req.gamer.nickname, req.gamer.email, req.gamer.countryId)
        return res.json({token})
    }
    async getAll(req, res){
        let {countryId, limit, page} = req.body
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let gamers;
        if (!countryId){
            gamers = await Gamer.findAndCountAll({limit, offset})
        }
        if (countryId){
            gamers = await Gamer.findAndCountAll({where: {countryId}, limit, offset})
        }
        return res.json(gamers)
    }
    async getOne(req, res){
        const {id} = req.params
        const gamer = await Gamer.findOne(
            {where: {id}},
        )
        return res.json(gamer)
    }
    async create(req, res){
        // нужен ли он?
    }
    async update(req, res, next){   //Вот в этих функциях я максимально неуверен
        let {nickname, email, password, countryId} = req.body
        const id = req.gamer.id;
        const cur_gamer = await Gamer.findOne({where: {id}});

        if(email === undefined || email === ""){
            email = cur_gamer.email;
        }else{
            const candidate1 = await Gamer.findOne({where: {email}})
            if(candidate1 && candidate1.id !== id){
                return next(ApiError.badRequest('Пользователь с таким email или nickname уже существует'))
            }
        }
        if(!nickname || nickname===""){
            nickname = cur_gamer.nickname;
        }else{
            const candidate2 = await Gamer.findOne({where: {nickname}})
            if(candidate2 && candidate2.id !== id){
                return next(ApiError.badRequest('Пользователь с таким email или nickname уже существует'))
            }
        }

        let hashPassword;
        if(!password || password==="" || password===undefined){
            hashPassword = cur_gamer.password;
        }
        else{
            hashPassword = await bcrypt.hash(password, 5);
        }

        if(!countryId && countryId!==""){
            countryId = cur_gamer.countryId;
        }
        const gamer = await (await (Gamer.findOne(
            {where: {id}},
        ))).update({nickname: nickname, email:email, password:hashPassword, countryId:countryId},)
        const token = generateJwt(id, nickname, email, countryId)
        return res.json({token, password})
    }
    async delete(req, res){    //Вот в этих функциях я максимально неуверен
        const {id} = req.params
        const gamer = await Gamer.destroy(
            {where: {id}},
        )
        return res.json(gamer)
    }
}

module.exports = new GamerController()
