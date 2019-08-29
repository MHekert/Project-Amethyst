import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import IRevisionModel from '@interfaces/mode/IRevisionModel';
import Revision from '@models/mode/revision';
import modelFromRequest from '@util/modelFromRequest';

const router: Router = Router();

router.put(
	'/',
	[body('code').exists(), body('modeId').exists()],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const revision: IRevisionModel = modelFromRequest(Revision, req.body, ['createdAt']);
			await revision.insertToMode(req.body.modeId);
			res.status(200).send(revision);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
