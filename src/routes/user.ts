import { Router, Request, Response } from 'express';
import db from '../db';
import { users } from '../../data/schema';
import { paginationSchema } from '../pagination';

const router = Router();

router.post('/users', async (req: Request, res: Response) => {
    const newUser = req.body;
    await db.insert(users).values(newUser);
    res.sendStatus(201);
});

router.get('/users', async (req: Request, res: Response) => {
    const { page, per_page } = paginationSchema.parse(req.query);
    const users = await db.query.users.findMany({
        limit: per_page,
        offset: page * per_page,
    });
    res.json(users).status(200);
});

export default router;
