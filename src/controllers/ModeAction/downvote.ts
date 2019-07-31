import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import errorHandler from '../helpers/errorHandler';
import { setDownvote } from '../../models/modeAction';
import isUserLoggedIn from '../middleware/isUserLoggedIn';
const router: Router = Router();

router.post(
	'/',
	isUserLoggedIn,
	[body('modeId').isHexadecimal()],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			const modeId = req.body.modeId;
			const { n, ok } = await setDownvote(req.user, modeId);
			if (n !== 1 || ok !== 1) throw new Error('database update failed');
			res.sendStatus(200);
		} catch (err) {
			errorHandler(err, res);
		}
	}
);

export default router;
