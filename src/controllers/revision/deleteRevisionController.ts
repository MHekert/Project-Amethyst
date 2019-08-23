import { Router, Request, Response, NextFunction } from 'express';
import { param } from 'express-validator/check';
import removeRevision from '../../models/mode/helpers/removeRevision';
import validateRequest from '../middleware/validateRequest';
import { isEqual } from 'lodash';
import { notFoundError } from '../../util/errorObjects';

const router: Router = Router();

router.delete(
	'/:modeId/:revisionId',
	[param('modeId').isHexadecimal(), param('revisionId').isHexadecimal()],
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
