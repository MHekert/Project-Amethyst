import { NextFunction, Request, Response, Router } from 'express';
import { isNull, isUndefined } from 'lodash';

import { decPoints } from '@models/mode/mode';
import { setDownvote } from '@models/modeAction';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction = await setDownvote(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) {
			await decPoints(req.body.modeId);
		} else {
			if (!modeAction.upvote) return res.sendStatus(304);
			await decPoints(req.body.modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

export default router;
