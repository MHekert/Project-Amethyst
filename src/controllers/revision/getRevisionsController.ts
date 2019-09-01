import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';

import getRevision from '@models/mode/helpers/getRevision';
import validateRequest from '../middleware/validateRequest';

const router: Router = Router();

router.get(
	'/:modeId/:quantity?/:offset?',
	[
		param('modeId').isMongoId(),
		param('quantity')
			.optional()
			.isInt()
			.toInt(),
		param('offset')
			.optional()
			.isInt()
			.toInt()
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const offset = req.params.offset || 0;
			const quantity = req.params.quantity || 10;
			const modeId = req.params.modeId;
			const revisions = await getRevision(modeId, quantity, offset);
			res.status(200).send(revisions);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
