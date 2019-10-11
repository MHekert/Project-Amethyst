import { Router } from 'express';

import { isAuthorOfModeInParams } from '@controllers/middleware/isAuthorOfMode';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import { getGalleryImageRoute } from './getGalleryImageController';
import { postGalleryImageRoute } from './postGalleryImageController';

const galleryRoutes: Router = Router();

galleryRoutes.use(getGalleryImageRoute);
galleryRoutes.use(isUserLoggedIn, isAuthorOfModeInParams, postGalleryImageRoute);

export default galleryRoutes;
