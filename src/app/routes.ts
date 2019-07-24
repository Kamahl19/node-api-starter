import { Router } from 'express';

const router = Router();

router.use('/', require('../features/user/userRoutes'));

export default router;
