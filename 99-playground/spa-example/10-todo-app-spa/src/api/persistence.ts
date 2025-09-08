import ky from 'ky';
import { ToDo, ToDoPostResponse, ToDosGetResponse } from './types';
import {ENVIRONMENT} from '../environment.ts';

const API_URL = ENVIRONMENT.BACKEND_URL;

export async function loadToDos(completed = 0) {
  const serverResponse = await ky.get(API_URL, { searchParams: { completed } });
  const data = await serverResponse.json<ToDosGetResponse>();
  return data.result;
}

export async function saveToDo(toDo: ToDo) {
  try {
    const serverResponse = await ky.post(API_URL, {json: toDo});
    const data = await serverResponse.json<ToDoPostResponse>();
    return data.result;
  } catch {
    alert('Something went terribly wrong!');
    window.location.reload();
  }
}

export async function updateToDo(toDo: ToDo) {
  try {
    await ky.put(`${API_URL}/${toDo.id}`, {json: toDo});
  } catch (error) {
    console.log(error);
  }
}

export async function deleteToDo(toDo: ToDo) {
  try {
    await ky.delete(`${API_URL}/${toDo.id}`);
  } catch (error) {
    console.log(error);
  }
}
