import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const dummyLoggedUserMiddleware = (
	req: Request & { user: { _id: ObjectId } },
	_res: Response,
	next: NextFunction
) => {
	req.user = { _id: new ObjectId() };
	next();
};

export default dummyLoggedUserMiddleware;
