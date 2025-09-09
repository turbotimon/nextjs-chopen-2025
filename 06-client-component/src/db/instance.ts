import {drizzle} from 'drizzle-orm/better-sqlite3';
import {DB_FILE} from '../../drizzle.config';

export const db = drizzle(DB_FILE);