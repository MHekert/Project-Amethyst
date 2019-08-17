import { Router, Request, Response, NextFunction } from 'express';
import { query, param } from 'express-validator/check';
import getModesByPoints from '../../models/mode/helpers/getModesByPoints';
import validateRequest from '../middleware/validateRequest';

const router: Router = Router();

router.get(
	'/:quantity',
	[
		param('quantity')
			.isInt()
			.toInt(),
		query('ids')
			.optional()
			.isArray()
			.custom((arr) => arr.every((el: string) => el.match('^[0-9a-fA-F]+$') !== null))
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.query.ids) return res.status(200).send(await getModesByPoints(req.params.quantity));
			return res.status(200).send(await getModesByPoints(req.params.quantity, req.query.ids));
		} catch (err) {
			next(err);
		}
	}
);

export default router;
