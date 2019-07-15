import { Router, Request, Response } from 'express';
import { validationResult, param } from 'express-validator/check';
import { getModesByAuthor } from '../../models/mode';
import { getError400 } from '../../util/errorObjects';

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
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const { author, quantity, offset } = req.params;
			const modes = await getModesByAuthor(author, quantity, offset);
			res.status(200).send(modes);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export default router;
