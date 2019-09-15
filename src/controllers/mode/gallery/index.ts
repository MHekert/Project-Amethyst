import { Router } from 'express';

import isAuthorOfMode from '@controllers/middleware/isAuthorOfMode';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import { getGalleryImageRoute } from './getGalleryImageController';
import { postGalleryImageRoute } from './postGalleryImageController';

const galleryRoutes: Router = Router();

galleryRoutes.use(getGalleryImageRoute);
galleryRoutes.use(isUserLoggedIn, isAuthorOfMode, postGalleryImageRoute);

export default galleryRoutes;
