import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByAuthor from '@models/mode/helpers/getModesByAuthor';

export const getByAuthorModeMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			user,
			params: { author, quantity, offset }
		} = req;
		const modes = await getModesByAuthor(user, author, quantity, offset);
		res.status(200).send(modes);
	} catch (err) {
		next(err);
	}
};

const getByAuthorModeRoute: Router = Router();
getByAuthorModeRoute.get(
	'/author/:author/:quantity/:offset?',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('author').isMongoId(),
		param('offset')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	getByAuthorModeMiddleware
);
export { getByAuthorModeRoute };
