const httpStatus = require('http-status');
const reservationService = require('../services/reservation.service');

const createReservation = async (req, res, next) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
    
        res.status(httpStatus.CREATED).json(reservation);
    } catch (error) {
        next(error)
    }
}

const canceledReservation = async (req, res, next) => {
    try {
        await reservationService.canceledReservation(req.params.reservationId);
    
        res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        next(error)
    }
}

const paidReservation = async (req, res, next) => {
    try {
        await reservationService.paidReservation(
            req.params.reservationId, 
            req.body.paymentMethod, 
            req.body.mount
        );
    
        res.status(httpStatus.NO_CONTENT).json();
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createReservation,
    canceledReservation,
    paidReservation
}