import { Router, Request, Response, NextFunction } from 'express';
import { param } from 'express-validator/check';
import getModesByAuthor from '../../models/mode/helpers/getModesByAuthor';
import validateRequest from '../middleware/validateRequest';

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
			const { author, quantity, offset } = req.params;
			const modes = await getModesByAuthor(author, quantity, offset);
			res.status(200).send(modes);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
