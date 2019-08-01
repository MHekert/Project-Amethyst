import { Router, Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorHandler';
import { unsetVote } from '../../models/modeAction';
import { incPoints, decPoints } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction: any = await unsetVote(req.user, req.body.modeId);
		if (modeAction === null || modeAction.upvote === undefined) {
			return res.sendStatus(304);
		} else {
			if (modeAction.upvote === false) await incPoints(req.body.modeId);
			if (modeAction.upvote === true) await decPoints(req.body.modeId);
		}
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
