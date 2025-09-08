import { drizzle } from 'drizzle-orm/better-sqlite3';
import {todos} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {DB_FILE} from '../../drizzle.config';
import 'server-only';


const db = drizzle(DB_FILE);


export async function fetchPendingTodos(){
   const todoItems = await db.select().from(todos).where(eq(todos.completed, false));
   return todoItems;
}

export async function fetchCompletedTodos(){
  const todoItems = await db.select().from(todos).where(eq(todos.completed, true));
  return todoItems;
}

export async function fetchTodoById(dodoId: number){
  const todoItems = await db.select().from(todos).where(eq(todos.id, dodoId));
  return todoItems[0];
}