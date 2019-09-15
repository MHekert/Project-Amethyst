import { Router } from 'express';

import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import facebookRoute from './facebook';
import failRoute from './fail';
import logoutRoute from './logout';
import successRoute from './success';

const authRoutes: Router = Router();

authRoutes.use('/facebook', facebookRoute);
authRoutes.use('/fail', failRoute);
authRoutes.use('/success', successRoute);
authRoutes.use('/logout', isUserLoggedIn, logoutRoute);

export default authRoutes;
