import { NextFunction, Request, Response, Router } from 'express';
import { param } from 'express-validator/check';
import { isEqual } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import removeRevision from '@models/mode/helpers/removeRevision';
import { notFoundError } from '@util/errorObjects';

const router: Router = Router();

router.delete(
	'/:modeId/:revisionId',
	[param('modeId').isMongoId(), param('revisionId').isMongoId()],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { modeId, revisionId } = req.params;
			const updateStatus = await removeRevision(modeId, revisionId);
			if (isEqual(updateStatus, { n: 1, nModified: 1, ok: 1 })) return res.sendStatus(200);
			return res.status(404).send(notFoundError);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
