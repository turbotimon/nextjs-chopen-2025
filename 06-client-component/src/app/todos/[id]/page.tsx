import {fetchTodoById} from '@/data/data-access';

export default async function ToDoItemScreen({params}: { params: Promise<{ id: string }> }) {

  const {id} = await params;

  const todoItem = await fetchTodoById(parseInt(id)); // there should be error handling for parseInt
  
  return (
    <div className="w-3/4 max-w-xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Todo Item #{id}
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Title: {todoItem.title}</h4>
        <p className="text-gray-600">
          Status: {todoItem.completed ?
          <span className="text-green-600 font-medium">Completed</span> :
          <span className="text-yellow-600 font-medium">Pending</span>
        }
        </p>
      </div>
    </div>
  );
}
