const sequalize = require('../db')
const {DataTypes} = require('sequelize')

const Gamer = sequalize.define('gamer',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true, },
    email: {type: DataTypes.STRING, unique: true, allowNull: false },
    password: {type: DataTypes.STRING, allowNull: false}
})

const Session = sequalize.define('session',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    score: {type: DataTypes.INTEGER, defaultValue: 0 },
    time_session: {type: DataTypes.TIME, allowNull: false}
})

const Country = sequalize.define('country',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false }
})

Gamer.hasMany(Session, { onDelete: "cascade" })
Session.belongsTo(Gamer)

Country.hasMany(Gamer)
Gamer.belongsTo(Country)

module.exports = {
    Gamer,
    Session,
    Country
}
