import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setFavorite } from '../../models/modeAction';
import { incFavorite } from '../../models/mode/mode';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
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
