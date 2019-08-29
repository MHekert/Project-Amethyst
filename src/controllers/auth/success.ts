import { Response, Router } from 'express';

import { FRONTEND_URL } from '@util/secrets';

const router: Router = Router();

router.get('/', (_req, res: Response) => res.redirect(FRONTEND_URL));

export default router;
