'use client';

import {useActionState, useState} from 'react';
import {addRandomToDoItems, insertToDoItem} from '@/db/data-access';
import clsx from 'clsx';

export function NewTodo() {

  const [newTodoTitle, setNewTodoTitle] = useState('');

  function addNewTodo(formData: FormData) {
    insertToDoItem(formData);
    // setNewTodoTitle('');
  }

  async function myInsertToDoItem(prevState: any, formData: FormData) {
    const result = await insertToDoItem(formData);
    setNewTodoTitle('')
    return result
  }

  const [formState, saveNewToDo, pending] = useActionState(myInsertToDoItem, {success: false, error: null});


  const enableAddButton = !pending && newTodoTitle.trim().length > 2;

  return (
    <div className="mb-4">
      <div className="flex gap-4 mb-1">
        <form action={saveNewToDo} className="flex flex-1 gap-4">
          <input
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            disabled={pending}
            type="text"
            name="title"
            placeholder="Enter a new todo"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!enableAddButton}
            className={clsx(
              "px-6 py-2 rounded-lg transition",
              !enableAddButton
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            Add
          </button>
        </form>
        <button
          onClick={() => addRandomToDoItems(5)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Random
        </button>
      </div>
      <div className="min-h-7">
        {formState.success ? <span className="text-sm text-green-600 bg-green-100 bg-opacity-75 px-3 py-1 rounded-md inline-block" >Todo Item hinzugefügt ...</span> : ''}
        </div>
    </div>
  );
}