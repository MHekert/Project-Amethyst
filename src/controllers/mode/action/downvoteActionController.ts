import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';
import { isNull, isUndefined } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import { decPoints } from '@models/mode/mode';
import { setDownvote } from '@models/modeAction';

export const downvoteActionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			user,
			body: { modeId }
		} = req;
		const modeAction = await setDownvote(user, modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) {
			await decPoints(modeId);
		} else {
			if (!modeAction.upvote) return res.sendStatus(304);
			await decPoints(modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

const downvoteActionRoute: Router = Router();
downvoteActionRoute.post(
	'/downvote',
	[body('modeId').isMongoId()],
	validateRequest,
	downvoteActionMiddleware
);
export { downvoteActionRoute };
