import { NextFunction, Request, Response, Router } from 'express';
import { param, query } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByPoints from '@models/mode/helpers/getModesByPoints';

export const getTopModeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			user,
			params: { quantity },
			query: { ids }
		} = req;
		if (!ids) return res.status(200).send(await getModesByPoints(user, quantity));
		return res.status(200).send(await getModesByPoints(user, quantity, ids));
	} catch (err) {
		next(err);
	}
};

const getTopModeRoute: Router = Router();
getTopModeRoute.get(
	'/top/:quantity',
	[
		param('quantity')
			.isInt()
			.toInt(),
		query('ids')
			.optional()
			.isArray(),
		query('ids.*').isMongoId()
	],
	validateRequest,
	getTopModeMiddleware
);
export { getTopModeRoute };
