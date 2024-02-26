import { expect, test, describe } from '@jest/globals';

import { paginate } from '../src/pagination';

describe('pagination for query parameters', () => {
    test('parses', () => {
        const q = { page: '5', per_page: '6' };
        const { page: p, per_page: pp } = paginate(q);
        expect(p).toBe(5);
        expect(pp).toBe(6);
    });

    test('defaults', () => {
        const q = {};
        const { page: p, per_page: pp } = paginate(q);
        expect(p).toBe(0);
        expect(pp).toBe(10);
    });
});
