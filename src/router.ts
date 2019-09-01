import { Router } from 'express';

import authRoutes from '@controllers/auth';
import errorHandler from '@controllers/middleware/errorHandler';
import modeRoutes from '@controllers/mode';

const router: Router = Router();

router.use('/mode', modeRoutes);
router.use('/auth', authRoutes);
router.use(errorHandler);

export default router;
