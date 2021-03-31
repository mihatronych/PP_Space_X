class GamerController{
    async registration(req, res){

    }
    async login(req, res){

    }
    async check(req, res){
        const query = res.query
        res.json(query)

    }
}

module.exports = new GamerController()