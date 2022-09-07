const express = require('express');
const reservationController = require('../controllers/reservation.controller');
const validatorHandler = require('../middlewares/validator.handler');
const reservationValidation = require('../validations/reservation.validation');

const router = express.Router();


router.post('/', 
    validatorHandler(reservationValidation.createReservation),
    reservationController.createReservation
)

router.patch('/:reservationId/canceled', 
validatorHandler(reservationValidation.canceledReservation),
    reservationController.canceledReservation
)

router.patch('/:reservationId/paid', 
    validatorHandler(reservationValidation.paidReservation),
    reservationController.paidReservation
)

module.exports = router;

