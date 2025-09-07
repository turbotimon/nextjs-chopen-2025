import {defineConfig} from 'drizzle-kit';

export const DB_FILE = '../workshop.db';

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:../../workshop.db',
  },
  schema: './src/db/schema.ts',
  out: './src/db/', // output for `npm run pull` - attention: the default is not to overwrite the files ...
});