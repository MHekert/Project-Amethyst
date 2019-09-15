import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';
import { isNull, isUndefined } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import { incFavorite } from '@models/mode/mode';
import { setFavorite } from '@models/modeAction';

export const setFavoriteActionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
};

const setFavoriteActionRoute: Router = Router();
setFavoriteActionRoute.post(
	'/setfavorite',
	[body('modeId').isMongoId()],
	validateRequest,
	setFavoriteActionMiddleware
);
export { setFavoriteActionRoute };
