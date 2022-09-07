const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Reservation = sequelize.define(
    'Reservation',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roomId: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'Room',
                    schema: 'public'
                },
                key: 'id'
            },
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDING','PAID','CANCELED'),
            allowNull: false,
            defaultValue: 'PENDING'
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        paymentMethod: {
            type: DataTypes.ENUM('CASH','CARD'),
            allowNull: true,
        },
        days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        initDay: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }
)

module.exports = Reservation;

const Room = require('./room');
Reservation.belongsTo(Room, {
    foreignKey: {
        name: 'roomId'
    }
});