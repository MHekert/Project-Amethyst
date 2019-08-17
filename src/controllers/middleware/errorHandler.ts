import { Request, Response, NextFunction } from 'express';
import serializeError from 'serialize-error';
import logger from '../../util/logger';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(JSON.stringify(serializeError(err)));
	next(err);
};
