require('dotenv').config();
const _config = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    PORT:process.env.PORT
}
 const config = Object.freeze(_config);
module.exports = config;