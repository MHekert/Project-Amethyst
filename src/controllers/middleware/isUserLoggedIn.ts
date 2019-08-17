import { Request, Response, NextFunction } from 'express';

// PLACEHOLDER
const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	req.user = '5cf2a6fded450065969652b3';
	next();
};

export default isUserLoggedIn;
