import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.use(userRoutes);

export default app;
