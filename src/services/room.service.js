const Room = require('../models/room');
const sequelize = require('../database/database');
const { QueryTypes } = require('sequelize');
const boom = require('@hapi/boom');

const generateLetterFromNumber = (n) => {
    n = n - 1;
    let letter =  `${n >= 26 ? generateLetterFromNumber(Math.floor(n / 26) - 1) : ''}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 26]}`;
    return letter
}

const generateRooms = (floor, quantity, maxCode=null) => {

    let initialCode = 0;
    let rooms = [];
    let letterFloor = generateLetterFromNumber(floor);

    if (maxCode) {
        initialCode = parseInt(maxCode.split('_')[1]);
    }

    for (let i = 1; i <= quantity; i++){
        rooms.push({
            floor,
            code: `${letterFloor}_${initialCode + i}` 
        })
    }   

    return rooms
}

const getLastRoomByFloor = async (floor) => {
    return Room.findOne({
        where: { floor },
        order: [
            ['id', 'DESC']
        ]
    });
}

const getRoomById = async (roomId) => {
    return Room.findOne({
        where: {id: roomId}
    })
}

const createRooms = async (floor, quantity) => {
    const lastRoom = await getLastRoomByFloor(floor);
    
    const maxCode = lastRoom ? lastRoom.code : null;

    const rooms = generateRooms(floor, quantity, maxCode);

    return Room.bulkCreate(rooms)
}

const disableRoom = async (roomId) => {
    const room = await getRoomById(roomId);

    if (!room) {
        throw boom.badRequest('Room not exits');
    }

    return Room.update({ isActive: false }, {
        where: {
            id: roomId
        }
    })
}

const updateRoomPrice = async (roomId, price) => {
    const room = await getRoomById(roomId);

    if (!room) {
        throw boom.badRequest('Room not exits');
    }

    return Room.update({ priceDay: price}, {
        where: {
            id: roomId
        }
    })
}

const getRoomFreeByDate = async (date, days) => {
    const room = await sequelize.query(`
        SELECT
        Ro.*
        FROM "Room" AS Ro
        LEFT JOIN "Reservation" as Re ON Re."roomId" = Ro.id
        WHERE Ro."isActive" = true
            AND ( :date::date NOT BETWEEN Re."initDay" AND ( Re."initDay" + Re.days - 1))
            AND ( :date::date + :days::integer NOT BETWEEN Re."initDay" AND ( Re."initDay" + Re.days - 1))
            OR Re.id IS NULL
        LIMIT 1
    `, {
        replacements: { date, days},
        type: QueryTypes.SELECT
    })
    return room.length ? room[0] : null
}

const disponibilityRoomByDate = async (date, days) => {

    const room = await getRoomFreeByDate(date, days);

    const response = {
        disponibility: room ? true : false,
        date,
        message: `The hotel has room in ${date}: ${room ? 'yes': 'no'}`
    }

    return response
}


module.exports = {
    createRooms,
    disableRoom,
    updateRoomPrice,
    getRoomFreeByDate,
    disponibilityRoomByDate
}