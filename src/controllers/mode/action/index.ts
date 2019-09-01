import { Router } from 'express';

import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import { downvoteActionRoute } from './downvoteActionController';
import { setFavoriteActionRoute } from './setFavoriteActionController';
import { unsetFavoriteActionRoute } from './unsetFavoriteActionController';
import { unsetVoteActionRoute } from './unsetVoteActionController';
import { upvoteActionRoute } from './upvoteActionController';

const actionRoutes: Router = Router();

actionRoutes.use(isUserLoggedIn, downvoteActionRoute);
actionRoutes.use(isUserLoggedIn, setFavoriteActionRoute);
actionRoutes.use(isUserLoggedIn, unsetFavoriteActionRoute);
actionRoutes.use(isUserLoggedIn, unsetVoteActionRoute);
actionRoutes.use(isUserLoggedIn, upvoteActionRoute);

export default actionRoutes;
