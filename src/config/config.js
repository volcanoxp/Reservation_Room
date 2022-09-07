const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        port: process.env.DB_PORT || 5432,
        host: process.env.DB_HOST || 'db',
        name: (process.env.NODE_ENV == 'test' ? `${process.env.DB_NAME}_test`: process.env.DB_NAME)|| 'hotel',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    }
}