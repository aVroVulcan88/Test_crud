const winston = require('winston');
const config = require('../config');

const level = config.LOG_LEVEL;
const format = winston.format.combine(winston.format.colorize(), winston.format.simple());
const transports = [new winston.transports.Console({ format })];

module.exports = winston.createLogger({ level, transports });
