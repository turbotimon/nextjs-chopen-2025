import {ToDoScreen} from './ToDoScreen.tsx';
import {createLazyRoute} from '@tanstack/react-router';

export const Route = createLazyRoute('/')({
  component: ToDoScreen,
})