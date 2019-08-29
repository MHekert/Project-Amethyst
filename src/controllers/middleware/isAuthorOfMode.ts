import { NextFunction, Request, Response } from 'express';
import { isEqual } from 'lodash';

import { getAuthor } from '@models/mode/mode';
import { unauthorizedError } from '@util/errorObjects';

const isAuthorOfMode = async (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'test' || isEqual(req.user._id, await getAuthor(req.body.modeId))) return next();
	return res.status(401).json(unauthorizedError);
};

export default isAuthorOfMode;
