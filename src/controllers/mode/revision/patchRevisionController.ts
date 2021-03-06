import { NextFunction, Request, Response, Router } from 'express';
import { body, param } from 'express-validator/check';

import validateRequest from '@controllers/middleware/validateRequest';
import updateRevision from '@models/mode/helpers/updateRevision';
import { error400, error507 } from '@util/errorObjects';

export const patchRevisionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body,
			params: { modeId, revisionId }
		} = req;
		const updatedRevision = await updateRevision(modeId, revisionId, body);
		if (!updatedRevision) return res.status(400).send(error400);
		if (updatedRevision.nModified === 0) return res.status(507).send(error507);
		return res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

const patchRevisionRoute: Router = Router();
patchRevisionRoute.patch(
	'/:modeId/:revisionId',
	[
		param('modeId').isMongoId(),
		param('revisionId').isMongoId(),
		body('changelog')
			.optional()
			.isArray(),
		body('changelog.*').isString(),
		body('code')
			.optional()
			.isString(),
		body('body')
			.optional()
			.isString()
	],
	validateRequest,
	patchRevisionMiddleware
);
export { patchRevisionRoute };
