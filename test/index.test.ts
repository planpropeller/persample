import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

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
        const res = await request(app).post('/users').send({ email: 'info@dom.ain' });
        expect(res.statusCode).toBe(201);
    });
});
