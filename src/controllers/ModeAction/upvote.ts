import { Router, Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setUpvote } from '../../models/modeAction';
import { incPoints } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction: any = await setUpvote(req.user, req.body.modeId);
		if (modeAction === null || modeAction.upvote === undefined) {
			await incPoints(req.body.modeId);
			return res.sendStatus(200);
		} else {
			if (modeAction.upvote === true) return res.sendStatus(304);
			if (modeAction.upvote === false) await incPoints(req.body.modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
