import { NextFunction, Request, Response } from 'express';

import { unauthorizedError } from '@util/errorObjects';

const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'test' || req.isAuthenticated()) return next();
	return res.status(401).json(unauthorizedError);
};

export default isUserLoggedIn;
