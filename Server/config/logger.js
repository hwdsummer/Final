var winston = require('winston');
require('winston-daily-rotate-file');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new (winston.transports.DailyRotateFile)({
            level: 'error',
            filename: 'log/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new (winston.transports.DailyRotateFile)({
            filename: 'log/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.simple()
        )
    }));
}
module.exports = logger;
