import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import Revision from '../../models/mode/revision';
import modelFromRequest from '../../util/modelFromRequest';
import putErrorHandler from '../helpers/putErrorHandler';

import IRevisionModel from '../../../src/interfaces/mode/IRevisionModel';

const router: Router = Router();

router.put(
	'/',
	[body('code').exists(), body('modeId').exists()],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			const revision: IRevisionModel = modelFromRequest(Revision, req.body, ['createdAt']);
			await revision.insertToMode(req.body.modeId);
			res.status(200).send(revision);
		} catch (err) {
			putErrorHandler(err, res);
		}
	}
);

export default router;
