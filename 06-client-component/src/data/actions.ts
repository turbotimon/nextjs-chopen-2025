'use server';

import {db} from '@/db/instance';
import {todos} from '@/db/schema';
import {eq} from 'drizzle-orm';

import {revalidatePath, revalidateTag} from 'next/cache';
import type {TodoInsert} from '@/data/types';

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

export async function updateToDoItemAsCompleted(formData: FormData) {
  // We should validate the data. i.e. with Zod ...
  const todoId = formData.get('todoId') as string;
  await db.update(todos).set({completed: true}).where(eq(todos.id, parseInt(todoId)));
  revalidatePath('/todos');
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
