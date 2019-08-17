import { Router, Request, Response, NextFunction } from 'express';
import { setFavorite } from '../../models/modeAction';
import { incFavorite } from '../../models/mode/mode';
import { isNull, isUndefined } from 'lodash';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction = await setFavorite(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.favorite)) {
			await incFavorite(req.body.modeId);
			return res.sendStatus(200);
		}
		return res.sendStatus(304);
	} catch (err) {
		next(err);
	}
});

export default router;
