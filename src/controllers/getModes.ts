import { Router, Request, Response } from 'express';
import { validationResult, query, param } from 'express-validator/check';
import { getModesByDate, getModesByPoints } from '../models/mode';
import { getError400 } from '../util/errorObjects';

const router: Router = Router();

router.get(
	'/new/:quantity/:date/',
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
	'/new/:quantity',
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

router.get(
	'/top/:quantity',
	[
		param('quantity').isInt(),
		query('ids')
			.optional()
			.isArray()
			.custom((arr) => arr.every((el: string) => el.match('^[0-9a-fA-F]+$') !== null))
	],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const quantity = +req.params.quantity;
			if (!req.query.ids) return res.status(200).send(await getModesByPoints(quantity));
			return res.status(200).send(await getModesByPoints(quantity, req.query.ids));
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export const GetModesController: Router = router;
