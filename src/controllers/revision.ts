import { Router } from 'express';

import isAuthorOfMode from '@controllers/middleware/isAuthorOfMode';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import addRevisionController from '@controllers/revision/addRevisionController';
import getRevisionsController from '@controllers/revision/getRevisionsController';
import patchRevisionController from '@controllers/revision/patchRevisionController';

const router: Router = Router();

router.use('/add', isUserLoggedIn, isAuthorOfMode, addRevisionController);
router.use('/', getRevisionsController);
router.use('/', patchRevisionController);

export default router;
