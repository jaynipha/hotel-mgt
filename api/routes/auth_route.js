import express from 'express';

import { signUp, signIn, deleteUser, getAllUser } from '../controllers/auth.js';
import { validationMiddleware } from '../middlewares/validation.js';
import { signinSchema, signupSchema } from '../validation/auth.js'
const router = express.Router();

router.post('/sign-up', validationMiddleware(signupSchema), signUp);
router.post('/sign-in', validationMiddleware(signinSchema), signIn);
router.get('/get-users', getAllUser);
router.delete('/delete-user', deleteUser);

export default router;
