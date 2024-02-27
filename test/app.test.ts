import { describe, expect, test, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import db from '../src/db';
import { users } from '../data/schema';

const { objectContaining } = expect;

describe('GET /users', () => {
    beforeEach(async () => {
        await db.delete(users);
        await db.insert(users).values([
            { email: 'tom@mail.com', name: 'Tom', createdAt: '0' },
            { email: 'kk@helpdesk.io', name: 'Kathy', createdAt: '1709049030' },
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

    test('pagination', async () => {
        const res = await request(app).get('/users?page=1&per_page=1');
        const [user] = res.body;
        expect(res.body.length).toBe(1);
        expect(user.name).toEqual('Tom');
    });

    test('sort by `created` in ascending order', async () => {
        const res = await request(app).get('/users?created=asc');
        const [a, b] = res.body;
        expect(a).toEqual(objectContaining({ name: 'Tom', createdAt: '0' }));
        expect(b).toEqual(objectContaining({ name: 'Kathy', createdAt: '1709049030' }));
    });

    test('sort by `created` in desc order', async () => {
        const res = await request(app).get('/users?created=desc');
        const [a, b] = res.body;
        expect(a).toEqual(objectContaining({ name: 'Kathy', createdAt: '1709049030' }));
        expect(b).toEqual(objectContaining({ name: 'Tom', createdAt: '0' }));
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
        expect((await db.select().from(users)).length).toBe(0);
        await request(app).post('/users').send({ email: 'info@example.io', name: 'Thomas' });
        expect((await db.select().from(users)).length).toBe(1);
    });

    test('validates required name', async () => {
        const res = await request(app).post('/users').send({ email: 'hi@co.de' });
        expect(res.statusCode).toBe(422);
    });

    test('error messages from validation', async () => {
        const res = await request(app)
            .post('/users')
            .send({ email: 'hi_', bio: 'x'.repeat(1025), picture: 'mypic.tiff' });

        expect(res.body.errors).toEqual([
            'Invalid email',
            'Name is required',
            'Bio cannot be more than 1024 characters',
            'Invalid picture URL',
        ]);
    });

    test('broken payload', async () => {
        const res = await request(app)
            .post('/users')
            .set('Content-type', 'application/json')
            .send('{{{');
        expect(res.statusCode).toBe(400);
    });

    beforeEach(async () => {
        await db.delete(users);
    });
});
