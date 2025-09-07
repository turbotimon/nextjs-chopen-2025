import {TodoList} from '@/shared/TodoList';
import {fetchCompletedTodos} from '@/db/data-access';

export const dynamic = 'force-dynamic';

export default async function DoneScreen() {
  const doneItems = await fetchCompletedTodos();
  
  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">Finished Items</h2>
      <TodoList items={doneItems}/>
    </div>
  );
}
