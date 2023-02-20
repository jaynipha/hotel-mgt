import  Router from 'express';

import authRouter from './auth_route.js';
import  roomRouter  from './room_route.js';

const router = Router();

router.use('/', roomRouter);
router.use('/auth', authRouter);

export default router;