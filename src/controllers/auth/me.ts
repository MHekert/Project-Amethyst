import { NextFunction, Response, Router } from 'express';

const meRoute: Router = Router();

export const meMiddleware = async (
	req: Request & { user: {_id: any, visibleName: string}},
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			_id: id,
			visibleName: name,
		} = req.user;
		res.status(200).send({ id, name });
	} catch (err) {
		next(err);
	}
};

meRoute.get('/', <any>meMiddleware);

export default meRoute;
