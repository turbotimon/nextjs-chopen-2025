import ToDoListItem from './ToDoListItem';
import type {ToDo} from '../api/types.ts';

interface ToDoListProps {
  todos: ToDo[];
  onRemoveToDo: (toDo: ToDo) => Promise<void>;
}

export function ToDoList({ todos, onRemoveToDo }: ToDoListProps) {
  return (
    <ul id="todo-list" className="todo-list">
      {todos.map((t, i) => (
        <ToDoListItem key={i} todo={t} onRemoveToDo={onRemoveToDo} />
      ))}
    </ul>
  );
}
