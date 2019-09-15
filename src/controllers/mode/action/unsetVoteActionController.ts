import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';
import { isNull, isUndefined } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import { decPoints, incPoints } from '@models/mode/mode';
import { unsetVote } from '@models/modeAction';

export const unsetVoteActionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			user,
			body: { modeId }
		} = req;
		const modeAction = await unsetVote(user, modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) return res.sendStatus(304);
		modeAction.upvote ? await decPoints(modeId) : await incPoints(modeId);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

const unsetVoteActionRoute: Router = Router();
unsetVoteActionRoute.post(
	'/unsetvote',
	[body('modeId').isMongoId()],
	validateRequest,
	unsetVoteActionMiddleware
);
export { unsetVoteActionRoute };
