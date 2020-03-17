import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByDate from '@models/mode/helpers/getModesByDate';
import cleanId from '@util/cleanId';

const router: Router = Router();

export const getNewModeWithOffsetMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			user,
			params: { quantity, date }
		} = req;
		const modes = await getModesByDate(user, quantity, date);
		res.status(200).send(cleanId(modes));
	} catch (err) {
		next(err);
	}
};

export const getNewModeInitialMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			user,
			params: { quantity }
		} = req;
		const modes = await getModesByDate(user, quantity);
		res.status(200).send(cleanId(modes));
	} catch (err) {
		next(err);
	}
};

export default router;

const getNewModeWithOffsetRoute: Router = Router();
getNewModeWithOffsetRoute.get(
	'/new/:quantity/:date/',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('date').isISO8601()
	],
	validateRequest,
	getNewModeWithOffsetMiddleware
);
export { getNewModeWithOffsetRoute };

const getNewModeInitialRoute: Router = Router();
getNewModeInitialRoute.get(
	'/new/:quantity',
	[
		param('quantity')
			.isInt()
			.toInt()
	],
	validateRequest,
	getNewModeInitialMiddleware
);
export { getNewModeInitialRoute };
