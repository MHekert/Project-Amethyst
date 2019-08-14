import { Router, Response } from 'express';
import { FRONTEND_URL } from '../../util/secrets';

const router: Router = Router();

router.get('/', (_req, res: Response) => res.redirect(401, FRONTEND_URL));

export default router;