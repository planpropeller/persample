import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import config from '../config';
import * as schema from '../data/schema';

const client = createClient({ url: config.databasePath });

const db = drizzle(client, { schema });

export default db;
