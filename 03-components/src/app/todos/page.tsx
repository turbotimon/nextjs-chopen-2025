import {TodoList} from '@/shared/TodoList';
import {NewTodo} from '@/app/todos/NewTodo';

export default async function TodoScreen() {
  const todoItems = ['Buy groceries', 'Call dentist', 'Fix the bike'];

  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">To-Do List</h2>
      <NewTodo/>
      <TodoList items={todoItems}/>
    </div>
  );
}


