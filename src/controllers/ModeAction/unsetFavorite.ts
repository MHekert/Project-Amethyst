import { Router, Request, Response } from 'express';
import errorHandler from '../helpers/errorHandler';
import { unsetFavorite } from '../../models/modeAction';
import { decFavorite } from '../../models/mode/mode';
import { isNull, isUndefined } from 'lodash';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const modeAction = await unsetFavorite(req.user, req.body.modeId);
		if (isNull(modeAction) || isUndefined(modeAction.favorite)) return res.sendStatus(304);
		await decFavorite(req.body.modeId);
		return res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
