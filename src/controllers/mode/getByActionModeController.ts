import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import EAction from '@interfaces/modeAction/EAction';
import getModesByAction from '@models/mode/helpers/getModesByAction';
import cleanId from '@util/cleanId';

export const getByActionModeMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			user: { _id },
			params: { action, quantity, offset }
		} = req;
		const modes = await getModesByAction(_id, action, quantity, offset);
		res.status(200).send(cleanId(modes));
	} catch (err) {
		next(err);
	}
};

const getByActionModeRoute: Router = Router();
getByActionModeRoute.get(
	'/action/:action/:quantity/:offset?',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('action').custom((action: string) => (<any>Object.values(EAction)).includes(action)),
		param('offset')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	getByActionModeMiddleware
);
export { getByActionModeRoute };
