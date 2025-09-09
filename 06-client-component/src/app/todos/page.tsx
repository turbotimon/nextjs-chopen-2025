import { TodoList } from "@/shared/TodoList";
import { NewTodo } from "@/app/todos/NewTodo";
import { Suspense } from "react";
import { fetchPendingTodos } from "@/data/data-access";
import { updateToDoItemAsCompleted } from "@/data/actions";

import { Time } from "@/app/todos/Time";

export const dynamic = "force-dynamic";

export default async function TodoScreen() {
  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">To-Do List</h2>
      <Time />
      <NewTodo />
      <Suspense fallback={<TodoListSkeleton />}>
        <ToDoScreenData />
      </Suspense>
    </div>
  );
}

export async function ToDoScreenData() {
  const todoItems = await fetchPendingTodos();

  return (
    <TodoList items={todoItems} removeAction={updateToDoItemAsCompleted} />
  );
}

function TodoListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
