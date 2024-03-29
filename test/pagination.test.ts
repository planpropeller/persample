import { expect, test, describe } from '@jest/globals';

import { paginate } from '../src/pagination';

describe('query parameters for pagination', () => {
    test('parses', () => {
        const q = { page: '5', per_page: '6' };
        const { page: p, per_page: pp } = paginate(q);
        expect(p).toBe(5);
        expect(pp).toBe(6);
    });

    test('defaults if query params are absent', () => {
        const q = {};
        const { page: p, per_page: pp } = paginate(q);
        expect(p).toBe(0);
        expect(pp).toBe(10);
    });
});
