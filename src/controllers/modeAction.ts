import { Router } from 'express';
import upvote from './ModeAction/upvote';
import downvote from './ModeAction/downvote';
import unsetVote from './ModeAction/unsetVote';
import setFavorite from './ModeAction/setFavorite';
import unsetFavorite from './ModeAction/unsetFavorite';

const router: Router = Router();

router.use('/upvote', upvote);
router.use('/downvote', downvote);
router.use('/unsetvote', unsetVote);
router.use('/setfavorite', setFavorite);
router.use('/unsetfavorite', unsetFavorite);

export default router;
