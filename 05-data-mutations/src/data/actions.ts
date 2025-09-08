'use server';

import {db} from '@/db/instance';
import {todos} from '@/db/schema';
import {eq} from 'drizzle-orm';

import {revalidatePath, revalidateTag} from 'next/cache';
import type {TodoInsert} from '@/data/types';




export async function insertToDoItem(formData: FormData) {
  // We should validate the data. i.e. with Zod ...
  const newToDoItem: TodoInsert = {
    title: formData.get('title') as string,
    completed: false,
  }
  console.log('newToDoItem', newToDoItem);
  await db.insert(todos).values(newToDoItem);
  revalidatePath('/done');
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
