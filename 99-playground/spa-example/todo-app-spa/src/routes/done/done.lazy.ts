import {createLazyRoute} from '@tanstack/react-router';
import {DoneScreen} from './DoneScreen.tsx';

export const Route = createLazyRoute('/done')({
  component: DoneScreen,
})