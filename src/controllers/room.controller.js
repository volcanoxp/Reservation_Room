const httpStatus = require('http-status');
const roomService = require('../services/room.service');


const createRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.createRooms(req.body.floor, req.body.quantity);
    
        res.status(httpStatus.CREATED).json(rooms);
    } catch(error) {
        next(error)
    }
}

const disableRoom = async (req, res, next)  => {
    try {
        await roomService.disableRoom(req.params.roomId);
    
        res.status(httpStatus.NO_CONTENT).json();
    } catch(error) {
        next(error)
    }
}

const updateRoomPrice = async (req, res, next) => {
    try {
        await roomService.updateRoomPrice(req.params.roomId, req.body.price);

        res.status(httpStatus.NO_CONTENT).json();
    } catch(error) {
        next(error)
    }
}  

module.exports = {
    createRooms,
    disableRoom,
    updateRoomPrice
}