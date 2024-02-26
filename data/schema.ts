import { sql } from 'drizzle-orm';
import { index, integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
    'users',
    {
        id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
        name: text('name', { length: 256 }).notNull(),
        email: text('email', { length: 256 }).unique().notNull(),
        bio: text('bio', { length: 1024 }),
        picture: text('picture', { length: 512 }),
        createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    },
    (users) => ({
        nameIdx: index('name_idx').on(users.name),
        emailIdx: index('email_idx').on(users.email),
    }),
);
