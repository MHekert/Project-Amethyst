import winston from 'winston';

import { NODE_ENV } from '@util/secrets';

const isDev = NODE_ENV === 'development';

const debug = winston.format.printf(({ level, message, label, timestamp }) => {
	const newMessage = JSON.stringify(message).replace(/\r?\n|\r/, '');
	return label
		? `[${timestamp}] [${label}] ${level}: ${newMessage}`
		: `[${timestamp}] ${level}: ${newMessage}`;
});

const httpFormat = winston.format.printf(({ level, message, label, timestamp }) => {
	const newMessage = message.replace(/\r?\n|\r/, '');
	return label ? `[${timestamp}] [${label}] ${newMessage}` : `[${timestamp}] ${newMessage}`;
});

const logger = winston.loggers.add('logger', {
	transports: [
		new winston.transports.Console({
			level: isDev ? 'debug' : 'error',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				debug
			)
		}),
		new winston.transports.File({
			filename: 'debug.log',
			level: 'debug',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.label({ label: 'logger' }),
				debug
			)
		})
	]
});

export const httpLoggerConsole = winston.loggers.add('httpLoggerConsole', {
	transports: [
		new winston.transports.Console({
			level: isDev ? 'debug' : 'error',

			format: winston.format.combine(winston.format.timestamp(), httpFormat)
		})
	]
});

export const httpLoggerFile = winston.loggers.add('httpLoggerFile', {
	transports: [
		new winston.transports.File({
			filename: 'http.log',
			level: 'debug',
			format: winston.format.combine(winston.format.timestamp(), httpFormat)
		}),
		new winston.transports.File({
			filename: 'debug.log',
			level: 'debug',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.label({ label: 'HTTP' }),
				httpFormat
			)
		})
	]
});

if (isDev) {
	logger.debug('Logging initialized at debug level');
	httpLoggerConsole.debug('HTTP logging initialized at debug level');
	logger.debug('HTTP Logging initialized at debug level');
}

export default logger;
