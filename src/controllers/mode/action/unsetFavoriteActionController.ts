import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';
import { isNull, isUndefined } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import { decFavorite } from '@models/mode/mode';
import { unsetFavorite } from '@models/modeAction';

export const unsetFavoriteActionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
};

const unsetFavoriteActionRoute: Router = Router();
unsetFavoriteActionRoute.post(
	'/unsetfavorite',
	[body('modeId').isMongoId()],
	validateRequest,
	unsetFavoriteActionMiddleware
);
export { unsetFavoriteActionRoute };
