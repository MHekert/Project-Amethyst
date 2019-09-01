import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import IRevisionModel from '@interfaces/mode/IRevisionModel';
import Revision from '@models/mode/revision';
import modelFromRequest from '@util/modelFromRequest';

export const putRevisionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body,
			body: { modeId }
		} = req;
		const revision: IRevisionModel = modelFromRequest(Revision, body, ['createdAt']);
		await revision.insertToMode(modeId);
		res.status(200).send(revision);
	} catch (err) {
		next(err);
	}
};

const putRevisionRoute: Router = Router();
putRevisionRoute.put(
	'/',
	[(body('code').isString(), body('modeId').isMongoId())],
	validateRequest,
	putRevisionMiddleware
);
export { putRevisionRoute };
