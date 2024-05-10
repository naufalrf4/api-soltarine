const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.Console({ format: format.combine(format.simple(), format.timestamp()), level: 'info' })
    ],
    exitOnError: false 
});

module.exports = logger;
