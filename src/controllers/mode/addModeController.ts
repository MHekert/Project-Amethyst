import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator/check';
import Mode from '../../models/mode';
import Revision from '../../models/revision';
import modelFromRequest from '../../util/modelFromRequest';
import putErrorHandler from '../helpers/putErrorHandler';
const router: Router = Router();
router.put(
	'/',
	[body('author').isHexadecimal(), body('code').exists()],
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			validationResult(req).throw();
			const mode = modelFromRequest(Mode, req.body, ['createdAt']);
			const savedMode = mode.save();
			const revision = modelFromRequest(Revision, req.body, ['createdAt', 'version', 'modeId']);
			revision.modeId = mode._id;
			const savedRevision = revision.save();
			res.status(200).send({ mode: await savedMode, revision: await savedRevision });
		} catch (err) {
			putErrorHandler(err, res);
		}
	}
);
export default router;
