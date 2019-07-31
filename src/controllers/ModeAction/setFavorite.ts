import { Router, Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorHandler';
import { setFavorite } from '../../models/modeAction';
const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { n, ok } = await setFavorite(req.user, req.body.modeId);
		if (n !== 1 || ok !== 1) throw new Error('database update failed');
		res.sendStatus(200);
	} catch (err) {
		errorHandler(err, res);
	}
});

export default router;
