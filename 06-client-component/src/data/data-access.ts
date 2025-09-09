import {db} from '@/db/instance';
import {todos} from '@/db/schema';
import {eq} from 'drizzle-orm';
import 'server-only';


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