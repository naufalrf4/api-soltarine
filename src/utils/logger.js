const { createLogger, transports, format } = require('winston');
const path = require('path');

const logsDirectory = path.join(__dirname, '..', '..' ,'logs');

const logger = createLogger({
    transports: [
        new transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logsDirectory, 'access.log'), level: 'info' }),
        new transports.Console({ 
            format: format.combine(format.simple(), format.timestamp()), 
            level: 'error',
            stderrLevels: ['error']
        }),
        new transports.Console({
            format: format.combine(format.simple(), format.timestamp()), 
            level: 'info',
            stderrLevels: ['info']
        })
    ],
    exitOnError: false 
});

module.exports = logger;
