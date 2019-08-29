import { NextFunction, Request, Response, Router } from 'express';
import { isNull, isUndefined } from 'lodash';

import { decFavorite } from '@models/mode/mode';
import { unsetFavorite } from '@models/modeAction';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			user,
			body: { modeId }
		} = req;
		const modeAction = await unsetFavorite(user, modeId);
		if (isNull(modeAction) || isUndefined(modeAction.favorite)) return res.sendStatus(304);
		await decFavorite(modeId);
		return res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

export default router;
