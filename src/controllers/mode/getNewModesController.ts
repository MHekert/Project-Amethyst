import { Router, Request, Response } from 'express';
import { validationResult, param } from 'express-validator/check';
import getModesByDate from '../../models/mode/helpers/getModesByDate';
import { getError400 } from '../../util/errorObjects';

const router: Router = Router();

router.get(
	'/:quantity/:date/',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('date').isISO8601()
	],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const modes = await getModesByDate(req.params.quantity, req.params.date);
			res.status(200).send(modes);
		} catch (err) {
			res.status(400).send(getError400);
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
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const modes = await getModesByDate(req.params.quantity);
			res.status(200).send(modes);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export default router;
