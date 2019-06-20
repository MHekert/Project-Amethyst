import { Router, Request, Response } from 'express';
import { logoutError } from '../../util/errorObjects';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	if (!req.user) return res.status(400).json(logoutError);
	req.logout();
	req.session.destroy(() => {});
	res.clearCookie('connect.sid', { path: '/' })
		.status(200)
		.json({ message: 'logged out successfully', status: 200 });
});

export const AuthLogoutController: Router = router;
