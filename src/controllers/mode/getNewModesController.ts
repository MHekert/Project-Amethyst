import { Router, Request, Response, NextFunction } from 'express';
import { param } from 'express-validator/check';
import getModesByDate from '../../models/mode/helpers/getModesByDate';
import validateRequest from '../middleware/validateRequest';

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
			const modes = await getModesByDate(req.user, req.params.quantity, req.params.date);
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
			const modes = await getModesByDate(req.user, req.params.quantity);
			res.status(200).send(modes);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
