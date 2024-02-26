import { Router, Request, Response } from 'express';
import db from '../db';
import { users } from '../../data/schema';

const router = Router();

router.post('/users', async (req: Request, res: Response) => {
    const newUser = req.body;
    console.log(newUser);
    await db.insert(users).values(newUser);
    res.sendStatus(201);
});

router.get('/users', (req: Request, res: Response) => {
    res.json([]).status(200);
});

export default router;
