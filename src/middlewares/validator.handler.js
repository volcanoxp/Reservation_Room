const boom = require('@hapi/boom');
const pick = require('../utils/pick');
const Joi = require('joi');


function validatorHandler (schema) {
    return (req, res, next) => {
        const validSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validSchema));
        
        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' }, abortEarly: false })
            .validate(object);

        if (error) {
            return next(boom.badRequest(error));
        }
        
        Object.assign(req, value);
        return next();
    }
}


module.exports = validatorHandler;