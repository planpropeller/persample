import { z } from 'zod';
import { Query } from 'express-serve-static-core';

const paginationSchema = z.object({
    page: z.coerce.number().default(0),
    per_page: z.coerce.number().default(10),
});

const paginate = (query: Query) => {
    return paginationSchema.parse(query);
};

export { paginate };
