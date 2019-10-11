import { Router } from 'express';

import { isAuthorOfModeInBody } from '@controllers/middleware/isAuthorOfMode';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import { deleteRevisionRoute } from './deleteRevisionController';
import { getRevisionRoute } from './getRevisionController';
import { patchRevisionRoute } from './patchRevisionController';
import { putRevisionRoute } from './putRevisionController';

const revisionController: Router = Router();

revisionController.use(isUserLoggedIn, putRevisionRoute);
revisionController.use(getRevisionRoute);
revisionController.use(isUserLoggedIn, isAuthorOfModeInBody, patchRevisionRoute);
revisionController.use(isUserLoggedIn, isAuthorOfModeInBody, deleteRevisionRoute);

export default revisionController;
