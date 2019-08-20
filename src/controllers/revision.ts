import { Router } from 'express';
import getRevisionsController from './revision/getRevisionsController';
import addRevisionController from './revision/addRevisionController';
import isUserLoggedIn from './middleware/isUserLoggedIn';
import isAuthorOfMode from './middleware/isAuthorOfMode';

const router: Router = Router();

router.use('/add', isUserLoggedIn, isAuthorOfMode, addRevisionController);
router.use('/', getRevisionsController);

export default router;
