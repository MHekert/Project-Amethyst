import { Request, Response, Router } from 'express';

import { FIREBASE_IMGS_URL } from '@util/secrets';

const router: Router = Router();

router.get('/:imageName', (req: Request, res: Response) => {
	const {
		params: { imageName }
	} = req;
	const redirectURL = `${FIREBASE_IMGS_URL}${imageName}?alt=media`;
	res.redirect(301, redirectURL);
});

export default router;
