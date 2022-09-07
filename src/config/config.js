const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        port: process.env.DB_PORT || 5434,
        host: process.env.DB_HOST || 'localhost',
        name: process.env.DB_NAME || 'seque',
        username: process.env.DB_USERNAME || 'seque',
        password: process.env.DB_PASSWORD || 'y2K.bet1pAg3',
    }
}