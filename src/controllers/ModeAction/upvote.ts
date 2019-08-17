import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setUpvote } from '../../models/modeAction';
import { incPoints } from '../../models/mode/mode';
import { isNull, isUndefined } from 'lodash';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const modeAction = await setUpvote(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.upvote)) {
			await incPoints(req.body.modeId);
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
