import { describe, expect, test, beforeEach } from '@jest/globals';
import db from '../src/db';
import { users } from '../data/schema';

type User = typeof users.$inferInsert;

describe('db', () => {
    test('create user', async () => {
        const newUser: User = { email: 'info@email.com', name: 'Florian' };
        await db.insert(users).values(newUser);
    });

    beforeEach(async () => {
        await db.delete(users);
    });
});
