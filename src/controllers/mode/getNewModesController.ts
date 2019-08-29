import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByDate from '@models/mode/helpers/getModesByDate';

const router: Router = Router();

router.get(
	'/:quantity/:date/',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('date').isISO8601()
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				user,
				params: { quantity, date }
			} = req;
			const modes = await getModesByDate(user, quantity, date);
			res.status(200).send(modes);
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	'/:quantity',
	[
		param('quantity')
			.isInt()
			.toInt()
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				user,
				params: { quantity }
			} = req;
			const modes = await getModesByDate(user, quantity);
			res.status(200).send(modes);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
