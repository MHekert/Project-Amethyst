import { Request, Response, Router } from 'express';

import { FIREBASE_IMGS_URL } from '@util/secrets';

export const getGalleryImageMiddleware = (req: Request, res: Response) => {
	const {
		params: { imageName }
	} = req;
	const redirectURL = `${FIREBASE_IMGS_URL}${imageName}?alt=media`;
	res.redirect(301, redirectURL);
};

const getGalleryImageRoute: Router = Router();
getGalleryImageRoute.get('image/:imageName', getGalleryImageMiddleware);
export { getGalleryImageRoute };
