import morgan from 'morgan';
import { httpLoggerConsole, httpLoggerFile } from './logger';

const getStream = (logger: any) => {
	class Stream {
		write(text: string) {
			logger.info(text);
		}
	}
	return new Stream();
};

export const morganConsole = morgan('dev', { stream: getStream(httpLoggerConsole) });
export const morganFile = morgan('tiny', { stream: getStream(httpLoggerFile) });
