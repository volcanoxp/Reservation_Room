const Joi = require('joi');

const createReservation = {
    body: Joi.object().keys({
        fullName: Joi.string().min(1).max(255).required(),
        identification: Joi.string().regex(/^\d+$/).min(8).max(255).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d+$/).min(9).max(255).required(),
        days: Joi.number().strict().positive().required(),
        initDay: Joi.string().isoDate().required()
    })
}

const canceledReservation = {
    params: Joi.object().keys({
        reservationId: Joi.number().positive().required()
    })
}

const paidReservation = {
    params: Joi.object().keys({
        reservationId: Joi.number().positive().required()
    }),
    body: Joi.object().keys({
        paymentMethod: Joi.string().valid('CASH','CARD').required(),
        mount: Joi.number().strict().positive().required()
    })
}

const reservationByIdentifcation = {
    params: Joi.object().keys({
        identification: Joi.string().regex(/^\d+$/).min(8).max(255).required()
    }),
}

module.exports = {
    createReservation,
    canceledReservation,
    paidReservation,
    reservationByIdentifcation
}