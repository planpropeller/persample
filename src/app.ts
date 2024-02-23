import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', (req: Request, res: Response) => {
    console.log('POST /users');
    res.sendStatus(201);
});
app.get('/users', (req: Request, res: Response) => {
    console.log('GET /users');
    res.json([]).status(200);
});

export default app;
