import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import Revision from '../models/revision';
import modelFromRequest from '../util/modelFromRequest';
import putErrorHandler from './helpers/putErrorHandler';
const router: Router = Router();
router.put(
	'/revision/add',
	[ body('code').exists(), body('modeId').exists() ],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			const revision = modelFromRequest(Revision, req.body, [ 'createdAt', 'version' ]);
			const savedRevision = revision.save();
			res.status(200).send(await savedRevision);
		} catch (err) {
			putErrorHandler(err, res);
		}
	}
);
export const AddRevisionController: Router = router;
