import { Router, Request, Response } from 'express';
import { validationResult, param } from 'express-validator/check';
import getRevision from '../../models/mode/helpers/getRevision';
import { getError400 } from '../../util/errorObjects';

const router: Router = Router();

router.get(
	'/:modeId/:quantity?/:offset?',
	[
		param('modeId').isHexadecimal(),
		param('quantity')
			.optional()
			.isInt()
			.toInt(),
		param('offset')
			.optional()
			.isInt()
			.toInt()
	],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const offset = req.params.offset || 0;
			const quantity = req.params.quantity || 10;
			const modeId = req.params.modeId;
			const revisions = await getRevision(modeId, quantity, offset);
			res.status(200).send(revisions);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export default router;
