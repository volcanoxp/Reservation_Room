const Room = require('../models/room');


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

const createRooms = async (floor, quantity) => {
    const lastRoom = await getLastRoomByFloor(floor);
    
    const maxCode = lastRoom ? lastRoom.code : null;

    const rooms = generateRooms(floor, quantity, maxCode);

    return Room.bulkCreate(rooms)
}

const disableRoom = async (roomId) => {
    return Room.update({ isActive: false }, {
        where: {
            id: roomId
        }
    })
}

const updateRoomPrice = async (roomId, price) => {
    return Room.update({ priceDay: price}, {
        where: {
            id: roomId
        }
    })
}


module.exports = {
    createRooms,
    disableRoom,
    updateRoomPrice
}