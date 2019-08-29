import { NextFunction, Request, Response, Router } from 'express';
import { param, query } from 'express-validator/check';
import { isNull } from 'lodash';

import validateRequest from '@controllers/middleware/validateRequest';
import getModesByPoints from '@models/mode/helpers/getModesByPoints';

const router: Router = Router();

router.get(
	'/:quantity',
	[
		param('quantity')
			.isInt()
			.toInt(),
		query('ids')
			.optional()
			.isArray()
			.custom((arr) => arr.every((el: string) => !isNull(el.match('^[0-9a-fA-F]+$'))))
	],
	validateRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				user,
				params: { quantity },
				query: { ids }
			} = req;
			if (!req.query.ids) return res.status(200).send(await getModesByPoints(user, quantity));
			return res.status(200).send(await getModesByPoints(user, quantity, ids));
		} catch (err) {
			next(err);
		}
	}
);

export default router;
