import { Router, Request, Response, NextFunction } from 'express';
import { unsetFavorite } from '../../models/modeAction';
import { decFavorite } from '../../models/mode/mode';
import { isNull, isUndefined } from 'lodash';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const modeAction = await unsetFavorite(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.favorite)) return res.sendStatus(304);
		await decFavorite(req.body.modeId);
		return res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

export default router;
