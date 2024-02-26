import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import config from './config';

export default {
    schema: './data/schema.ts',
    out: './data/migrations',
    driver: 'turso', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        url: config.databasePath,
    },
    verbose: true,
    strict: true,
} satisfies Config;
