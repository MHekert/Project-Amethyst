import { Request, Response, NextFunction } from 'express';
import serializeError from 'serialize-error';
import logger from '../../util/logger';

const errorHandler = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
	logger.error(JSON.stringify(serializeError(err)));
	next(err);
};

export default errorHandler;
