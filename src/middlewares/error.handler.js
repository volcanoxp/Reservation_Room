const httpStatus = require('http-status');

function errorHandler(err, req, res, next) {
    
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHandler(err, req, res, next) {
    
    if (err.isBoom) {
        const { output } = err;
        return res.status(output.statusCode).json(output.payload);
    }

    next(err);
}

module.exports = {
    errorHandler, 
    boomErrorHandler
};