'use server';
import {drizzle} from 'drizzle-orm/better-sqlite3';
import {todos} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {DB_FILE} from '../../drizzle.config';
import {revalidatePath, revalidateTag} from 'next/cache';
import type {TodoInsert} from '@/db/types';


const db = drizzle(DB_FILE);


export async function fetchPendingTodos() {
  // await new Promise(resolve => setTimeout(resolve, 3000)); // simulate slow response to demonstarte streaming in the todos route
  const todoItems = await db.select().from(todos).where(eq(todos.completed, false));
  return todoItems;
}

export async function fetchCompletedTodos() {
  const todoItems = await db.select().from(todos).where(eq(todos.completed, true));
  return todoItems;
}

export async function fetchTodoById(todoId: number) {
  const todoItems = await db.select().from(todos).where(eq(todos.id, todoId));
  return todoItems[0];
}


export async function insertToDoItem(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 3000)); // simulate slow response to demonstrate the pending state
  // We should validate the data. i.e. with Zod ...
  const newToDoItem: TodoInsert = {
    title: formData.get('title') as string,
    completed: false,
  }
  console.log('newToDoItem', newToDoItem);
  await db.insert(todos).values(newToDoItem);
  revalidatePath('/todos');
  return {
    success: true,
    error: null,
  };
}

export async function deleteToDoItem(formData: FormData) {
  // We should validate the data. i.e. with Zod ...
  const todoId = formData.get('todoId') as string;
  await db.delete(todos).where(eq(todos.id, parseInt(todoId)));
  revalidatePath('/done');
}

export async function addRandomToDoItems(count: number) {
  const newToDoItems: TodoInsert[] = [];
  for (let i = 0; i < count; i++) {
    newToDoItems.push({
      title: Math.random().toString(36).substring(2, 15),
      completed: false,
    })
  }
  await db.insert(todos).values(newToDoItems);
  revalidatePath('/todos');
}