import {createRoute} from '@tanstack/react-router';
import {rootRoute} from '../root.route.ts';

export const todoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
}).lazy(() => import('./todo.lazy.ts').then(m => m.Route));
