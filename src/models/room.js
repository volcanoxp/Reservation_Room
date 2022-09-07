const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');


const Room = sequelize.define(
    'Room',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priceDay: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 40
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }
)

module.exports = Room;

const Reservation = require('./reservation');
Room.hasMany(Reservation, {
    foreignKey: {
        name: 'roomId'
    }
});