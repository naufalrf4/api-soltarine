const { createLogger, transports, format } = require('winston');
const path = require('path');

const logsDirectory = path.join(__dirname, '..', 'logs');

const logger = createLogger({
    transports: [
        new transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' }),
        new transports.Console({ format: format.combine(format.simple(), format.timestamp()), level: 'info' })
    ],
    exitOnError: false 
});

module.exports = logger;
