import type {ToDo} from '../api/types.ts';
import {Spinner} from './spinner/Spinner.tsx';
import {useState} from 'react';

type ToDoListItemProps = {
  todo: ToDo
  onRemoveToDo: (toDo: ToDo) => Promise<void>
};

function ToDoListItem({todo, onRemoveToDo}: ToDoListItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  function removeToDo(todo: ToDo) {
    setIsCompleting(true);
    onRemoveToDo(todo).then(() => setIsCompleting(false));
  }
  
  return (
    <li style={{display: 'flex', justifyContent: 'space-between'}}>
      {todo.title}
      {todo.id && !isCompleting
        ? <button onClick={() => removeToDo(todo)}>X</button>
        : <Spinner size={15}/>
      }
    </li>
  );
}

export default ToDoListItem;
