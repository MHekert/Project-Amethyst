import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

import { error400 } from '@util/errorObjects';

const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		validationResult(req).throw();
		next();
	} catch (err) {
		res.status(400).send(error400);
	}
};

export default validateRequest;
