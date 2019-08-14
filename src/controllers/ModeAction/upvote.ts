import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setUpvote } from '../../models/modeAction';
import { incPoints } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const modeAction = await setUpvote(req.user, req.body.modeId);
		if (!modeAction || modeAction.upvote === undefined) {
			await incPoints(req.body.modeId);
			return res.sendStatus(200);
		} else {
			if (modeAction.upvote) return res.sendStatus(304);
			await incPoints(req.body.modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
