import { NewToDoForm } from '../../components/NewToDoForm.tsx';
import { ToDoList } from '../../components/ToDoList.tsx';
import { useEffect, useState } from 'react';
import type {ToDo} from '../../api/types.ts';
import {loadToDos, saveToDo, updateToDo} from '../../api/persistence.ts';
import {Spinner} from '../../components/spinner/Spinner.tsx';

export function ToDoScreen() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // using a nested async function since the effect function is not allowed to return a value (except the cleanup function)
    // and async functions implicitly return a promise
    async function loadData() {
      setLoading(true);
      const todos = await loadToDos();
      setTodos(todos);
      setLoading(false);
    }
    loadData();
  }, []);

  async function addToDo(newToDo: ToDo) {
    // "OPTIMISTIC UI"
    const newToDos = [...todos, newToDo];
    setTodos(newToDos);
    const persistedToDo = await saveToDo(newToDo);
    if (persistedToDo) {
      setTodos((todos) => {
        console.log('updating todos start', JSON.stringify(todos));
        const updatedToDos = todos.map((t) =>
          t !== newToDo ? t : persistedToDo
        );
        console.log('updating todos end', JSON.stringify(updatedToDos));
        return updatedToDos;
      });
    }

    // "PESSIMISTIC UI"
    // setSaving(true);
    // const persistedToDo = await saveToDo(newToDo);
    // if (persistedToDo) {
    //   setTodos(todos => [...todos, persistedToDo]);
    // }
    // setSaving(false);
  }

  async function completeToDo(toDo: ToDo) {
    toDo.completed = true;
    
    // "OPTIMISTIC UI"
    const updatedToDos = todos.filter((t) => t.id !== toDo.id);
    setTodos(updatedToDos);
    await updateToDo(toDo);

    // "PESSIMISTIC UI"
    // await updateToDo(toDo);
    // setTodos(todos => todos.filter(t => t.id !== toDo.id));
  }

  return (
    <>
      <NewToDoForm onAddToDo={addToDo} isSaving={saving}/>
      {loading && <div style={{margin:20}}><Spinner /></div>}

      <div className="main">
        <ToDoList todos={todos} onRemoveToDo={completeToDo} />
      </div>
    </>
  );
}
