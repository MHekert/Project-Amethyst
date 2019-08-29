import { Router } from 'express';

import downvoteController from '@controllers/ModeAction/downvote';
import setFavoriteController from '@controllers/ModeAction/setFavorite';
import unsetFavoriteController from '@controllers/ModeAction/unsetFavorite';
import unsetVoteController from '@controllers/ModeAction/unsetVote';
import upvoteController from '@controllers/ModeAction/upvote';

const router: Router = Router();

router.use('/upvote', upvoteController);
router.use('/downvote', downvoteController);
router.use('/unsetvote', unsetVoteController);
router.use('/setfavorite', setFavoriteController);
router.use('/unsetfavorite', unsetFavoriteController);

export default router;
