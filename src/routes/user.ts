import { Router, Request, Response } from 'express';
import { getUsers, createUser } from '../controllers/users';

const router = Router();

router.post('/users', createUser);

router.get('/users', getUsers);

export default router;
