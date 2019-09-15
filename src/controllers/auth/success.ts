import { Response, Router } from 'express';

import { FRONTEND_URL } from '@util/secrets';

const successRoute: Router = Router();

successRoute.get('/', (_req, res: Response) => res.redirect(FRONTEND_URL));

export default successRoute;
