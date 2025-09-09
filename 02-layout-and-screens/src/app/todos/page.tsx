import { Todo } from '../../data/Todo';

const todos: Todo[] = [
  { id: '1', title: 'Buy groceries1', completed: false },
  { id: '2', title: 'Call dentist1', completed: true },
  { id: '3', title: 'Fix the bike1', completed: false },
];

export default async function TodoScreen() {
  return (
    <div className="w-full max-w-2xl px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6">To-Do List</h2>
        <NewTodoForm />
        <TodoList />
    </div>
  );
}

export async function NewTodoForm() {
    return (
    <form className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter a new todo"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
    )
}

export async function TodoList(todos: Todo[]) {
  // return (
  //         <div className="space-y-4">
  //       <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  //         <span className="text-lg">Buy groceries</span>
  //         <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
  //       </div>
  //       <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  //         <span className="text-lg">Call dentist</span>
  //         <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
  //       </div>
  //       <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  //         <span className="text-lg">Fix the bike</span>
  //         <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
  //       </div>
  //     </div>
  // )
  
}
