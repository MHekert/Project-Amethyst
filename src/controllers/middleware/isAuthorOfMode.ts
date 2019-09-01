import { NextFunction, Request, Response } from 'express';
import { isEqual } from 'lodash';

import { getAuthor } from '@models/mode/mode';
import { forbiddenError } from '@util/errorObjects';

const isAuthorOfMode = async (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'test' || isEqual(req.user._id, await getAuthor(req.body.modeId))) return next();
	return res.status(403).json(forbiddenError);
};

export default isAuthorOfMode;
