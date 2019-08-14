import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setDownvote } from '../../models/modeAction';
import { decPoints } from '../../models/mode/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const modeAction = await setDownvote(req.user, req.body.modeId);
		if (!modeAction || modeAction.upvote === undefined) {
			await decPoints(req.body.modeId);
			return res.sendStatus(200);
		} else {
			if (!modeAction.upvote) return res.sendStatus(304);
			await decPoints(req.body.modeId, 2);
		}
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
