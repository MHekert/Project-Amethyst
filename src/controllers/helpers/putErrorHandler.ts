import { Response } from 'express';
import serializeError from 'serialize-error';
import { has } from 'lodash';
import logger from '../../util/logger';
import { putError400, allError500 } from '../../util/errorObjects';

export default (err: any, res: Response) => {
	if (has(err, 'message') && err.message.includes('Validation failed')) return res.status(400).send(putError400);
	logger.error(JSON.stringify(serializeError(err)));
	return res.status(500).send(allError500);
};
