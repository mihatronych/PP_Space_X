require('dotenv').config()
const express = require('express')
const sequalize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 7000
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}


start()