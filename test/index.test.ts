import { describe, expect, test, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import db from '../src/db';
import { users } from '../data/schema';

describe('GET /users', () => {
    test('returns status 200 OK', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });

    test('returns json', async () => {
        const res = await request(app).get('/users');
        expect(res.headers['content-type']).toMatch(/json/);
    });
});

describe('POST /users', () => {
    test('returns status 201 Created', async () => {
        const res = await request(app)
            .post('/users')
            .send({ email: 'info@mail.gg', name: 'Florian' });
        expect(res.statusCode).toBe(201);
    });

    test('writes to db', async () => {
        await request(app).post('/users').send({ email: 'info@example.io', name: 'Thomas' });
        expect((await db.select().from(users)).length).toBe(1);
    });

    beforeEach(async () => {
        await db.delete(users);
    });
});
