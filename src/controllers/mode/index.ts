import { Router } from 'express';

import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import { getByActionModeRoute } from '@controllers/mode/getByActionModeController';
import { getByAuthorModeRoute } from '@src/controllers/mode/getByAuthorModeController';
import {
	getNewModeInitialRoute,
	getNewModeWithOffsetRoute
} from '@src/controllers/mode/getNewModeController';
import { getTopModeRoute } from '@src/controllers/mode/getTopModeController';
import { putModeRoute } from '@src/controllers/mode/putModeController';
import actionRoutes from './action';
import galleryRoutes from './gallery';
import revisionRoutes from './revision';

const modeRoutes: Router = Router();

modeRoutes.use('/action', actionRoutes);
modeRoutes.use('/revision', revisionRoutes);
modeRoutes.use('/gallery', galleryRoutes);

modeRoutes.use(getNewModeInitialRoute);
modeRoutes.use(getNewModeWithOffsetRoute);
modeRoutes.use(getTopModeRoute);
modeRoutes.use(getByAuthorModeRoute);
modeRoutes.use(isUserLoggedIn, putModeRoute);
modeRoutes.use(isUserLoggedIn, getByActionModeRoute);

export default modeRoutes;
