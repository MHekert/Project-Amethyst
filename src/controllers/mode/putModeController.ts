import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import Mode from '@models/mode/mode';
import Revision from '@models/mode/revision';
import modelFromRequest from '@util/modelFromRequest';

export const putModeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const mode = modelFromRequest(Mode, body, ['createdAt', 'actualCode']);
		const revision = modelFromRequest(Revision, body, ['createdAt']);
		mode.revisions.push(revision);
		const savedMode = await mode.save();
		res.status(200).send({ mode: savedMode });
	} catch (err) {
		next(err);
	}
};

const putModeRoute: Router = Router();
putModeRoute.put(
	'/',
	[body('author').isMongoId(), body('code').isString()],
	validateRequest,
	putModeMiddleware
);
export { putModeRoute };
