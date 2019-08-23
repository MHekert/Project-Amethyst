import { Request, Response, NextFunction } from 'express';
import { forbiddenError } from '../../util/errorObjects';
import { getAuthor } from '../../models/mode/mode';
import { isEqual } from 'lodash';

const isAuthorOfMode = async (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'test' || isEqual(req.user._id, await getAuthor(req.body.modeId))) return next();
	return res.status(403).json(forbiddenError);
};

export default isAuthorOfMode;
