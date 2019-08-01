import { Router, Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setFavorite } from '../../models/modeAction';
import { incFavorite } from '../../models/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction = await setFavorite(req.user, req.body.modeId);
		if (!modeAction || !modeAction.favorite) {
			await incFavorite(req.body.modeId);
			return res.sendStatus(200);
		}
		return res.sendStatus(304);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
