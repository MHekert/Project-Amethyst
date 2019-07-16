import { Router, Request, Response } from 'express';
import { FRONTEND_URL } from '../../util/secrets';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	res.redirect(401, FRONTEND_URL);
});

export default router;
