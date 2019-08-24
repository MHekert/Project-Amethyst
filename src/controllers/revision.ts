import { Router } from 'express';
import getRevisionsController from './revision/getRevisionsController';
import addRevisionController from './revision/addRevisionController';
import patchRevisionController from './revision/patchRevisionController';
import isUserLoggedIn from './middleware/isUserLoggedIn';
import isAuthorOfMode from './middleware/isAuthorOfMode';

const router: Router = Router();

router.use('/add', isUserLoggedIn, isAuthorOfMode, addRevisionController);
router.use('/', getRevisionsController);
router.use('/', patchRevisionController);

export default router;
