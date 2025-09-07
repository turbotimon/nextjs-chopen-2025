import {todos} from '@/db/schema';
import type {InferSelectModel} from 'drizzle-orm';
import Link from 'next/link';

interface TodoListProps {
  items: InferSelectModel<typeof todos>[];
}

export function TodoList({items}: TodoListProps) {
  return (
    <div className="space-y-4">
      {items.map((todo) => (
        <Link href={`/todos/${todo.id}`} key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <span className="text-lg">{todo.title}</span>
          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
        </Link>
      ))}
    </div>
  );
}