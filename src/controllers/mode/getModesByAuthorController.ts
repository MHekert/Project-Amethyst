import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByAuthor from '@models/mode/helpers/getModesByAuthor';

const router: Router = Router();

router.get(
	'/:author/:quantity/:offset?',
	[
		param('quantity')
			.isInt()
			.toInt(),
		param('author').isHexadecimal(),
		param('offset')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				user,
				params: { author, quantity, offset }
			} = req;
			const modes = await getModesByAuthor(user, author, quantity, offset);
			res.status(200).send(modes);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
