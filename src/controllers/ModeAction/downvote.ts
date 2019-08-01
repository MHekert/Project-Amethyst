import { Router, Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setDownvote } from '../../models/modeAction';
import { decPoints } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction: any = await setDownvote(req.user, req.body.modeId);
		if (modeAction === null || modeAction.upvote === undefined) {
			await decPoints(req.body.modeId);
			return res.sendStatus(200);
		} else {
			if (modeAction.upvote === false) return res.sendStatus(304);
			if (modeAction.upvote === true) await decPoints(req.body.modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
