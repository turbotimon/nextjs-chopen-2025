import {NewTodo} from '@/app/todos/NewTodo';
import {TodoList} from '@/shared/TodoList';

export default async function DoneScreen() {
  const doneItems = ['Learn Next.js', 'Learn Tailwind CSS', 'Build something awesome'];
  
  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">Finished Items</h2>
      <TodoList items={doneItems}/>
    </div>
  );
}
