import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator/check';
import Mode from '../../models/mode/mode';
import Revision from '../../models/mode/revision';
import modelFromRequest from '../../util/modelFromRequest';
import validateRequest from '../middleware/validateRequest';

const router: Router = Router();

router.put(
	'/',
	[body('author').isHexadecimal(), body('code').exists()],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const mode = modelFromRequest(Mode, req.body, ['createdAt', 'actualCode']);
			const revision = modelFromRequest(Revision, req.body, ['createdAt']);
			mode.revisions.push(revision);
			const savedMode = await mode.save();
			res.status(200).send({ mode: savedMode });
		} catch (err) {
			next(err);
		}
	}
);

export default router;
