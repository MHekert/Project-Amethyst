import { Request, Response } from 'express';

import { notFoundError } from '@util/errorObjects';

const resourceNotFound = async (_req: Request, res: Response) =>
	res.status(404).send(notFoundError);

export default resourceNotFound;
