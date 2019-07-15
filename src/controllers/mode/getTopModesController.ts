import { Router, Request, Response } from 'express';
import { validationResult, query, param } from 'express-validator/check';
import { getModesByPoints } from '../../models/mode';
import { getError400 } from '../../util/errorObjects';

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
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			if (!req.query.ids) return res.status(200).send(await getModesByPoints(req.params.quantity));
			return res.status(200).send(await getModesByPoints(req.params.quantity, req.query.ids));
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export default router;
