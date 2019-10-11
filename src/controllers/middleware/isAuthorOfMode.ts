import { NextFunction, Request, Response } from 'express';
import { isEqual } from 'lodash';

import { getAuthor } from '@models/mode/mode';
import { forbiddenError } from '@util/errorObjects';

export const isAuthorOfModeInBody = async (req: Request, res: Response, next: NextFunction) => {
	if (isEqual(req.user._id, await getAuthor(req.body.modeId))) return next();
	return res.status(403).json(forbiddenError);
};

export const isAuthorOfModeInParams = async (req: Request, res: Response, next: NextFunction) => {
	if (isEqual(req.user._id, await getAuthor(req.params.modeId))) return next();
	return res.status(403).json(forbiddenError);
};
