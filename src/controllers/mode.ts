import { Router } from 'express';
import addModeController from './mode/addModeController';
import getNewModesController from './mode/getNewModesController';
import getTopModesController from './mode/getTopModesController';
import uploadGalleryController from './mode/gallery/uploadGalleryController';
import getGalleryController from './mode/gallery/getGalleryController';
import getModesByAuthorController from './mode/getModesByAuthorController';

const router: Router = Router();

router.use('/add', addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);
router.use('/author', getModesByAuthorController);

router.use('/gallery/upload', uploadGalleryController);
router.use('/gallery/image', getGalleryController);

export default router;
