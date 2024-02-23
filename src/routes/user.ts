import { Router, Request, Response } from 'express';

const router = Router();

router.post('/users', (req: Request, res: Response) => {
    res.sendStatus(201);
});

router.get('/users', (req: Request, res: Response) => {
    res.json([]).status(200);
});

export default router;
