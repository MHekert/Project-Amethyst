import { Router } from 'express';
import validateRequestController from './ModeAction/helpers/validateRequest';
import upvoteController from './ModeAction/upvote';
import downvoteController from './ModeAction/downvote';
import unsetVoteController from './ModeAction/unsetVote';
import setFavoriteController from './ModeAction/setFavorite';
import unsetFavoriteController from './ModeAction/unsetFavorite';

const router: Router = Router();

router.use('/*', validateRequestController);
router.use('/upvote', upvoteController);
router.use('/downvote', downvoteController);
router.use('/unsetvote', unsetVoteController);
router.use('/setfavorite', setFavoriteController);
router.use('/unsetfavorite', unsetFavoriteController);

export default router;
