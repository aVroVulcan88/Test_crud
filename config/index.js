const getenv = require('getenv');
require('dotenv').config();

module.exports = {
  MONGO_URL: getenv('SC_MONGO_URL', 'mongodb://localhost:27017/sc'),
  PORT: getenv.int('SC_SERVER_PORT', 3000),
  LOG_LEVEL: getenv('SC_LOG_LEVEL', 'silly'),
};
