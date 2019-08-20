import { Router } from 'express';
import addModeController from './mode/addModeController';
import getNewModesController from './mode/getNewModesController';
import getTopModesController from './mode/getTopModesController';
import uploadGalleryController from './mode/gallery/uploadGalleryController';
import getGalleryController from './mode/gallery/getGalleryController';
import getModesByAuthorController from './mode/getModesByAuthorController';
import isUserLoggedIn from './middleware/isUserLoggedIn';
import isAuthorOfMode from './middleware/isAuthorOfMode';

const router: Router = Router();

router.use('/add', isUserLoggedIn, addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);
router.use('/author', getModesByAuthorController);

router.use('/gallery/upload', isUserLoggedIn, isAuthorOfMode, uploadGalleryController);
router.use('/gallery/image', getGalleryController);

export default router;
