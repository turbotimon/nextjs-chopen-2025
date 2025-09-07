import Link from 'next/link';
import type {Todo} from '@/db/types';
import {deleteToDoItem} from '@/db/data-access';

interface TodoListProps {
  items: Todo[];
}

export function TodoList({items}: TodoListProps) {
  return (
    <div className="space-y-4">
      {items.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <Link href={`/todos/${todo.id}`} className="flex-grow">
            <span className="text-lg flex h-full items-center">{todo.title}</span>
          </Link>
          <form action={deleteToDoItem}>
            <input type="hidden" name="todoId" value={todo.id}/>
            <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
          </form>
        </div>
      ))}
    </div>
  );
}