import {ToDoList} from '../../components/ToDoList.tsx';
import {useEffect, useState} from 'react';
import type {ToDo} from '../../api/types.ts';
import {deleteToDo, loadToDos} from '../../api/persistence.ts';
import {Spinner} from '../../components/spinner/Spinner.tsx';

export function DoneScreen() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // using an IIFE since the effect function is not allowed to return a value (except the cleanup function)
    // and async functions implicitly return a promise
    (async () => {
      setLoading(true);
      const todos = await loadToDos(1);
      setTodos(todos);
      setLoading(false);
    })();
  }, []);

  async function removeToDo(toDo: ToDo) {
    // "OPTIMISTIC UI"
    // const newToDos = todos.filter(t => t.id !== toDo.id);
    // setTodos(newToDos);
    // await deleteToDo(toDo);

    // "PESSIMISTIC UI"
    await deleteToDo(toDo);
    setTodos(todos => todos.filter(t => t.id !== toDo.id));
  }

  return (
    <>
      {loading && <div style={{margin:20}}> <Spinner/> </div>}
      <div className="main">
        <ToDoList todos={todos} onRemoveToDo={removeToDo}/>
      </div>
    </>
  );
}
