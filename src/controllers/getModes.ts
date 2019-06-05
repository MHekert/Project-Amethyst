import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator/check';
import { getModesByDate, getModesByPoints } from '../models/mode';
import { getError400 } from '../util/errorObjects';

const router: Router = Router();

router.get(
	'/new/:quantity/:date/:points',
	[ check('quantity').isInt(), check('points').isInt(), check('date').isISO8601() ],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const date: string = req.params.date;
			const points = +req.params.points;
			const quantity: number = +req.params.quantity;
			const modes = await getModesByDate(quantity, date, points);
			res.status(200).send(modes);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

router.get('/new/:quantity', [ check('quantity').isInt() ], async (req: Request, res: Response) => {
	try {
		validationResult(req).throw();
		const quantity: number = +req.params.quantity;
		const modes = await getModesByDate(quantity);
		res.status(200).send(modes);
	} catch (err) {
		res.status(400).send(getError400);
	}
});

router.get(
	'/top/:quantity/:date/:points',
	[ check('quantity').isInt(), check('points').isInt(), check('date').isISO8601() ],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const date = req.params.date;
			const points: number = +req.params.points;
			const quantity = +req.params.quantity;
			const modes = await getModesByPoints(quantity, date, points);
			res.status(200).send(modes);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

router.get('/top/:quantity', [ check('quantity').isInt() ], async (req: Request, res: Response) => {
	try {
		validationResult(req).throw();
		const quantity = +req.params.quantity;
		const modes = await getModesByPoints(quantity);
		res.status(200).send(modes);
	} catch (err) {
		res.status(400).send(getError400);
	}
});

export const GetModesController: Router = router;
