import { Router } from 'express';
import getRevisionsController from './revision/getRevisionsController';
import addRevisionController from './revision/addRevisionController';

const router: Router = Router();

router.use('/add', addRevisionController);
router.use('/', getRevisionsController);

export default router;
