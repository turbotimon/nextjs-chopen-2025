import {ChangeEvent, useState} from 'react';
import type {ToDo} from '../api/types.ts';
import {Spinner} from './spinner/Spinner.tsx';

interface NewToDoFormProps {
  onAddToDo: (todo: ToDo) => Promise<void>;
  isSaving: boolean;
}

export function NewToDoForm({onAddToDo, isSaving}: NewToDoFormProps) {
  const [toDoTitle, setToDoTitle] = useState('');

  function formChange(e: ChangeEvent<HTMLInputElement>) {
    setToDoTitle(e.target.value);
  }

  function addToDo() {
    if (toDoTitle.length > 0) {
      const newToDo: ToDo = {
        id: null,
        title: toDoTitle,
        completed: false,
      };
      onAddToDo(newToDo);
      setToDoTitle('');
    }
  }

  return (
    <form action={addToDo} className="new-todo">
      <input
        id="todo-text"
        name="toDoTitle"
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        autoComplete="off"
        value={toDoTitle}
        onChange={formChange}
      />
      {isSaving ? <Spinner/> :
        <button id="add-button" className="add-button">
          +
        </button>
      }
    </form>
  );
}
