import { Request, Response } from 'express';
import { z } from 'zod';
import { asc, desc } from 'drizzle-orm';
import { paginate, orderByCreated } from '../pagination';
import db from '../db';
import { users } from '../../data/schema';
import { UserSchema } from '../models/user';
import { ensureError } from './util';

export async function getUsers(req: Request, res: Response) {
    try {
        const { page, per_page } = paginate(req.query);
        const order = orderByCreated(req.query);
        const found = await db.query.users.findMany({
            limit: per_page,
            offset: page * per_page,
            orderBy: order === 'asc' ? [asc(users.createdAt)] : [desc(users.createdAt)],
        });
        res.json(found).status(200);
    } catch (error) {
        res.sendStatus(400);
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const userData = UserSchema.parse(req.body);
        await db.insert(users).values(userData);
        res.sendStatus(201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(422).json({
                message: 'Invalid user data',
                errors: error.issues.map((issue) => issue.message),
            });
        } else {
            res.status(500).json({
                message: 'Failed to create user',
                error: ensureError(error).message,
            });
        }
    }
}
