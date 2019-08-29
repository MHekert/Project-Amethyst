import { Router } from 'express';

import isAuthorOfMode from '@controllers/middleware/isAuthorOfMode';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import addModeController from '@controllers/mode/addModeController';
import getGalleryController from '@controllers/mode/gallery/getGalleryController';
import uploadGalleryController from '@controllers/mode/gallery/uploadGalleryController';
import getModesByAuthorController from '@controllers/mode/getModesByAuthorController';
import getNewModesController from '@controllers/mode/getNewModesController';
import getTopModesController from '@controllers/mode/getTopModesController';

const router: Router = Router();

router.use('/add', isUserLoggedIn, addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);
router.use('/author', getModesByAuthorController);

router.use('/gallery/upload', isUserLoggedIn, isAuthorOfMode, uploadGalleryController);
router.use('/gallery/image', getGalleryController);

export default router;
