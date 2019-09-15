import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';
import { isNull, isUndefined } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import { incPoints } from '@models/mode/mode';
import { setUpvote } from '@models/modeAction';

export const upvoteActionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			user,
			body: { modeId }
		} = req;
		const modeAction = await setUpvote(user, modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) {
			await incPoints(modeId);
		} else {
			if (modeAction.upvote) return res.sendStatus(304);
			await incPoints(modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

const upvoteActionRoute: Router = Router();
upvoteActionRoute.post(
	'/upvote',
	[body('modeId').isMongoId()],
	validateRequest,
	upvoteActionMiddleware
);
export { upvoteActionRoute };
