import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator/check';
import Revision from '../../models/mode/revision';
import modelFromRequest from '../../util/modelFromRequest';
import IRevisionModel from '../../../src/interfaces/mode/IRevisionModel';
import validateRequest from '../middleware/validateRequest';

const router: Router = Router();

router.put(
	'/',
	[body('code').isString(), body('modeId').isMongoId()],
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
