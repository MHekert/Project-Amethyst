import { Response } from 'express';
import serializeError from 'serialize-error';
import logger from '../../util/logger';

export default (err: any, res: Response) => {
	if ('message' in err && err.message.indexOf('Validation failed') !== -1)
		return res.status(400).send({ error: { message: 'Wrong params in body', status: 400 } });
	logger.error(JSON.stringify(serializeError(err)));
	return res.status(500).send({ error: { message: 'Unknown error has occured', status: 500 } });
};
