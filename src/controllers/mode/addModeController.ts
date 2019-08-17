import { Router, Request, Response } from 'express';
import { validationResult, body } from 'express-validator/check';
import Mode from '../../models/mode/mode';
import Revision from '../../models/mode/revision';
import modelFromRequest from '../../util/modelFromRequest';
import errorHandler from '../helpers/errorHandler';

const router: Router = Router();

router.put(
	'/',
	[body('author').isHexadecimal(), body('code').exists()],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
			const mode = modelFromRequest(Mode, req.body, ['createdAt', 'actualCode']);
			const revision = modelFromRequest(Revision, req.body, ['createdAt']);
			mode.revisions.push(revision);
			const savedMode = mode.save();
			res.status(200).send({ mode: await savedMode });
		} catch (err) {
			errorHandler(err, res);
		}
	}
);

export default router;
