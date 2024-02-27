import { z } from 'zod';
import { Query } from 'express-serve-static-core';

const paginationSchema = z.object({
    page: z.coerce.number().default(0),
    per_page: z.coerce.number().default(10),
});

const orderByCreatedSchema = z.object({
    created: z.enum(['asc', 'desc']).default('asc').optional(),
});

const orderByCreated = (query: Query) => {
    const { created } = orderByCreatedSchema.parse(query);
    return created;
};

const paginate = (query: Query) => {
    return paginationSchema.parse(query);
};

export { paginate, orderByCreated };
