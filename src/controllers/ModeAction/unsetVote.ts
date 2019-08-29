import { NextFunction, Request, Response, Router } from 'express';
import { isNull, isUndefined } from 'lodash';

import { decPoints, incPoints } from '@models/mode/mode';
import { unsetVote } from '@models/modeAction';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
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
});

export default router;
