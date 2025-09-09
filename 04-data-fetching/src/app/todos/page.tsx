import {TodoList} from '@/shared/TodoList';
import {NewTodo} from '@/app/todos/NewTodo';
import {fetchPendingTodos} from '@/data/data-access';

export const dynamic = 'force-dynamic';

export default async function TodoScreen() {
  // const todoItems = ['Buy groceries', 'Call dentist', 'Fix the bike'];
  
  const todoItems = await fetchPendingTodos();

  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">To-Do List</h2>
      <NewTodo/>
      <TodoList items={todoItems}/>
    </div>
  );
}


