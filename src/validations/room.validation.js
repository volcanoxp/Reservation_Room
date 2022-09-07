const Joi = require('joi');

const createRooms = {
    body: Joi.object().keys({
        floor: Joi.number().strict().positive().required(),
        quantity: Joi.number().strict().positive().required()
    })
};

const disableRoom = {
    params: Joi.object().keys({
        roomId: Joi.number().positive().required()
    })
}

const updateRoomPrice = {
    params: Joi.object().keys({
        roomId: Joi.number().positive().required()
    }),
    body: Joi.object().keys({
        price: Joi.number().strict().positive().required()
    })
}

module.exports = {
    createRooms,
    disableRoom,
    updateRoomPrice
}