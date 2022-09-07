const boom = require('@hapi/boom');
const Reservation = require('../models/reservation');

const getReservationById = async (reservationId) => {
    return Reservation.findOne({
        where: { id: reservationId }
    })
}

const createReservation = async (data) => {
    
    const room = {
        id: 5,
        priceDay: 40
    }
    
    const roomId = room.id;
    const price = room.priceDay * data.days;

    return Reservation.create({
        roomId,
        fullName: data.fullName,
        indentification: data.indentification,
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

module.exports = {
    createReservation,
    canceledReservation,
    paidReservation
}