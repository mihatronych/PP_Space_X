const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer asfasnfkajsfnjk
        // console.log("first", token)
        if(!token){
            return res.status(401).json({message: "Не авторизван"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.gamer = decoded
        next()
    } catch (e){
        // console.log("second")
        res.status(401).json({message: "Не авторизован"})
    }
}
