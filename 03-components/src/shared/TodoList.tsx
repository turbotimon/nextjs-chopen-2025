interface TodoListProps {
  items: string[];
}

export function TodoList({items}: TodoListProps) {
  return (
    <div className="space-y-4">
      {items.map((todo) => (
        <div key={todo} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <span className="text-lg">{todo}</span>
          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition">Remove</button>
        </div>
      ))}
    </div>
  );
}