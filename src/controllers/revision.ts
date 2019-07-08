import { Router } from 'express';
import getRevisionsController from './revision/getRevisionsController';
import addRevisionController from './revision/addRevisionController';

const router: Router = Router();

router.put('/add', addRevisionController);
router.get('/', getRevisionsController);

export default router;
