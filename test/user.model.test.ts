import { expect, test, describe } from '@jest/globals';
import { UserSchema } from '../src/models/user'; // ?
import { z } from 'zod';

describe('validation on parse', () => {
    function error(attributes: object = {}) {
        try {
            UserSchema.parse({
                email: 'info_server.io',
                ...attributes,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error;
            }
        }
    }

    test('error issues', () => {
        expect(error({ id: 99 }).issues).toEqual([
            {
                code: 'invalid_string',
                message: 'Invalid email',
                path: ['email'],
                validation: 'email',
            },
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Name is required',
                path: ['name'],
                received: 'undefined',
            },
        ]);
    });
});
