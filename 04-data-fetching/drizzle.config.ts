import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export const DB_FILE = '../workshop.db'; // should typically be passed via `process.env.DB_XXX` variables
export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: DB_FILE,
  },
  schema: './src/db/schema.ts',
  out: './src/db/', // output for `npm run pull` - attention: the default is not to overwrite the files ...
});