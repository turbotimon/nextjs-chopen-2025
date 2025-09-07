interface NewTodoProps {
}

export function NewTodo({}: NewTodoProps) {
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
  );
}