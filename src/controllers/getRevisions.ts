import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator/check';
import { getRevisions } from '../models/revision';
import { getError400 } from '../util/errorObjects';

const router: Router = Router();

router.get(
	'/:modeId/:offset?',
	[ check('modeId').isHexadecimal(), check('offset').optional().isInt() ],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const offset = req.params.offset ? +req.params.offset : 0;
			const modeId = req.params.modeId;
			const quantity = 10;
			const revisions = await getRevisions(modeId, offset, quantity);
			res.status(200).send(revisions);
		} catch (err) {
			res.status(400).send(getError400);
		}
	}
);

export const GetRevisionsController: Router = router;