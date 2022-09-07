const sequelize = require('../../src/database/database');

const setupTestDB = () => {
    beforeAll(async () => {
        Object.values(sequelize.models).map( (model) => {
            model.destroy({ truncate: true, cascade: true, restartIdentity: true });
        }); 
        
    });
  
};

module.exports = setupTestDB;

