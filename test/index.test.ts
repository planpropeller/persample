import { describe, expect, test, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import db from '../src/db';
import { users } from '../data/schema';

describe('GET /users', () => {
    beforeEach(async () => {
        await db.delete(users);
        await db.insert(users).values([
            { email: 'tom@mail.com', name: 'Tom' },
            { email: 'kk@helpdesk.io', name: 'Kathy' },
        ]);
    });

    test('returns status 200 OK', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });

    test('returns json array', async () => {
        const res = await request(app).get('/users');
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('returns both users', async () => {
        const res = await request(app).get('/users');
        expect(res.body.length).toEqual(2);
    });

    test('returns user Tom', async () => {
        const res = await request(app).get('/users');
        const user = res.body[0];
        expect(user.email).toEqual('tom@mail.com');
        expect(user.name).toEqual('Tom');
    });

    test('pagination', async () => {
        const res = await request(app).get('/users?page=1&per_page=1');
        const user = res.body[0];
        expect(user.name).toEqual('Kathy');
        expect(user.email).toEqual('kk@helpdesk.io');
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
