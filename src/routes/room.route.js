const express = require('express');
const roomController = require('../controllers/room.controller');
const validatorHandler = require('../middlewares/validator.handler');
const roomValidator = require('../validations/room.validation');

const router = express.Router();

router.post('/',
    validatorHandler(roomValidator.createRooms), 
    roomController.createRooms
);
    
router.patch('/:roomId/disable', 
    validatorHandler(roomValidator.disableRoom), 
    roomController.disableRoom
);

router.patch('/:roomId/price', 
    validatorHandler(roomValidator.updateRoomPrice), 
    roomController.updateRoomPrice
);
    

module.exports = router;

