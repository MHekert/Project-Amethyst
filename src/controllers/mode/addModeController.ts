import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import Mode from '../../models/mode/mode';
import Revision from '../../models/mode/revision';
import modelFromRequest from '../../util/modelFromRequest';
import putErrorHandler from '../helpers/putErrorHandler';
const router: Router = Router();
router.put(
	'/',
	[body('author').isHexadecimal(), body('code').exists()],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			const mode = modelFromRequest(Mode, req.body, ['createdAt', 'actualCode']);
			const revision = modelFromRequest(Revision, req.body, ['createdAt']);
			mode.revisions.push(revision);
			const savedMode = mode.save();
			res.status(200).send({ mode: await savedMode });
		} catch (err) {
			putErrorHandler(err, res);
		}
	}
);

export default router;
