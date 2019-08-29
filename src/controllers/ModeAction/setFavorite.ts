import { NextFunction, Request, Response, Router } from 'express';
import { isNull, isUndefined } from 'lodash';

import { incFavorite } from '@models/mode/mode';
import { setFavorite } from '@models/modeAction';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			user,
			body: { modeId }
		} = req;
		const modeAction = await setFavorite(user, modeId);
		if (isNull(modeAction) || isUndefined(modeAction.favorite)) {
			await incFavorite(modeId);
			return res.sendStatus(200);
		}
		return res.sendStatus(304);
	} catch (err) {
		next(err);
	}
});

export default router;
