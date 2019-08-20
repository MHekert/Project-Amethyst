import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	req.logout();
	req.session.destroy(() => {});
	res.clearCookie('connect.sid', { path: '/' })
		.status(200)
		.json({ message: 'logged out successfully', status: 200 });
});

export default router;
