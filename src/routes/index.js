const express = require('express');
const reservationRoute = require('./reservation.route');
const roomRoute = require('./room.route');

const router = express.Router();


router.use('/reservation', reservationRoute);
router.use('/room', roomRoute);


module.exports = router;


