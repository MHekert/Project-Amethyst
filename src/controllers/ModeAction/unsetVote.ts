import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { unsetVote } from '../../models/modeAction';
import { incPoints, decPoints } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const modeAction = await unsetVote(req.user, req.body.modeId);
		if (!modeAction || modeAction.upvote === undefined) return res.sendStatus(304);
		modeAction.upvote ? await decPoints(req.body.modeId) : await incPoints(req.body.modeId);
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
