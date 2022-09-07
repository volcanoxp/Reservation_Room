const boom = require('@hapi/boom');
const Reservation = require('../models/reservation');
const roomService = require('./room.service');


const getReservationById = async (reservationId) => {
    return Reservation.findOne({
        where: { id: reservationId }
    })
}

const createReservation = async (data) => {
    
    const room = await roomService.getRoomFreeByDate(data.initDay, data.days);
    
    if (!room) {
        throw boom.badRequest('All rooms are occupied');
    }

    const roomId = room.id;
    const price = room.priceDay * data.days;

    return Reservation.create({
        roomId,
        fullName: data.fullName,
        identification: data.identification,
        email: data.email,
        phone: data.phone,
        price,
        days: data.days,
        initDay: data.initDay,      
    })
}

const canceledReservation = async (reservationId) => {
    const reservation = await getReservationById(reservationId);

    if (!reservation){
        throw boom.badRequest('Reservation not exits');
    }

    if (reservation.status == 'PAID') {
        throw boom.badRequest('Reservation is already paid');
    }

    if (reservation.status == 'CANCELED') {
        throw boom.badRequest('Reservation is already canceled');
    }
    
    return Reservation.update({status: 'CANCELED'}, {
        where: {
            id: reservationId
        }
    })
}

const paidReservation = async (reservationId, paymentMethod, mount) => {
    const reservation = await getReservationById(reservationId);

    if (!reservation){
        throw boom.badRequest('Reservation not exits');
    }

    if (reservation.status == 'PAID') {
        throw boom.badRequest('Reservation is already paid');
    }

    if (reservation.status == 'CANCELED') {
        throw boom.badRequest('Reservation is already canceled');
    }

    if (reservation.price != mount){
        throw boom.badRequest('The amount paid does not match');
    }

    return Reservation.update({ status: 'PAID', paymentMethod }, {
        where: {
            id: reservationId
        }
    })
}

const getReservationsByIdentification = async (identification) => {
    return Reservation.findAll({
        where: { identification }
    })
}


module.exports = {
    createReservation,
    canceledReservation,
    paidReservation,
    getReservationsByIdentification
}