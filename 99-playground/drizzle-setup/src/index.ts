import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { todos } from './db/schema';
import {eq} from 'drizzle-orm';
import {DB_FILE} from '../drizzle.config';

const db = drizzle(DB_FILE);

async function main() {
  const newToDos: typeof todos.$inferInsert[] = [{
    title: 'Learn Next.js',
    completed: false,
  }, {
    title: 'Learn React',
    completed: false,
  }, {
    title: 'Learn TypeScript',
    completed: true,
  }];
  
  await db.insert(todos).values(newToDos);
  console.log('New todo created!')
  const todoItems = await db.select().from(todos);
  console.log('Getting all todos from the database: ', todoItems)

  await db
    .update(todos)
    .set({
      completed: true,
    })
    .where(eq(todos.title, newToDos[0].title));
  console.log('todo item updated!')

  await db.delete(todos).where(eq(todos.title, newToDos[0].title));
  console.log('todo item deleted!')
  await db.delete(todos); // delete all
}
main();