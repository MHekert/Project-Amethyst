import { Router } from 'express';
import getRevisionsController from './revision/getRevisionsController';
import addRevisionController from './revision/addRevisionController';
import deleteRevisionController from './revision/deleteRevisionController';
import isUserLoggedIn from './middleware/isUserLoggedIn';
import isAuthorOfMode from './middleware/isAuthorOfMode';

const router: Router = Router();

router.use('/add', isUserLoggedIn, isAuthorOfMode, addRevisionController);
router.use('/', getRevisionsController);
router.use('/', isUserLoggedIn, isAuthorOfMode, deleteRevisionController);

export default router;
