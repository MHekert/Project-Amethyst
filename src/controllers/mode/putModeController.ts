import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import Mode from '@models/mode/mode';
import Revision from '@models/mode/revision';
import cleanId from '@util/cleanId';
import modelFromRequest from '@util/modelFromRequest';

export const putModeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body, user } = req;
		const requestBody = { ...body, author: user._id };
		const mode = modelFromRequest(Mode, requestBody, [
			'createdAt',
			'actualCode',
			'author',
			'points',
			'favorites'
		]);
		const revision = modelFromRequest(Revision, requestBody, ['createdAt']);
		mode.revisions.push(revision);
		const savedMode = await mode.save();
		res.status(200).send({ mode: cleanId(savedMode) });
	} catch (err) {
		next(err);
	}
};

const putModeRoute: Router = Router();
putModeRoute.put('/', [body('code').isString()], validateRequest, putModeMiddleware);
export { putModeRoute };
