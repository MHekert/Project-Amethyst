import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import errorHandler from '../../helpers/errorHandler';
import isUserLoggedIn from '../../middleware/isUserLoggedIn';
const router: Router = Router();

router.post(
	'/',
	isUserLoggedIn,
	[body('modeId').isHexadecimal()],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			next();
		} catch (err) {
			errorHandler(err, res);
		}
	}
);

export default router;
