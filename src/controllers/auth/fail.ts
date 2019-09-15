import { Response, Router } from 'express';

import { FRONTEND_URL } from '@util/secrets';

const failRoute: Router = Router();

failRoute.get('/', (_req, res: Response) => res.redirect(401, FRONTEND_URL));

export default failRoute;
