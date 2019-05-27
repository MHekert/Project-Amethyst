import { Router, Request, Response } from 'express';
import { getModesByDate, getModesByPoints } from '../models/mode';

const router: Router = Router();

router.get('/new/:quantity/:date/:points', async (req: Request, res: Response) => {
	const date: string = req.params.date;
	const points = +req.params.points;
	const quantity: number = req.params.quantity;
	const modes = await getModesByDate(date, points, quantity);
	res.status(200).send(modes);
});

router.get('/new/:quantity', async (req: Request, res: Response) => {
	const quantity: number = req.params.quantity;
	const modes = await getModesByDate(undefined, undefined, quantity);
	res.status(200).send(modes);
});

router.get('/top/:quantity/:date/:points', async (req: Request, res: Response) => {
	const date = req.params.date;
	const points = !req.params.points ? undefined : +req.params.points;
	const quantity = +req.params.quantity;
	const modes = await getModesByPoints(date, points, quantity);
	res.status(200).send(modes);
});

router.get('/top/:quantity', async (req: Request, res: Response) => {
	const quantity = +req.params.quantity;
	const modes = await getModesByPoints(undefined, undefined, quantity);
	res.status(200).send(modes);
});

export const GetModesController: Router = router;
