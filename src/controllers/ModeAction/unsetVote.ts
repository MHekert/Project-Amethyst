import { Router, Request, Response, NextFunction } from 'express';
import { unsetVote } from '../../models/modeAction';
import { incPoints, decPoints } from '../../models/mode/mode';
import { isNull, isUndefined } from 'lodash';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction = await unsetVote(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) return res.sendStatus(304);
		modeAction.upvote ? await decPoints(req.body.modeId) : await incPoints(req.body.modeId);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

export default router;
