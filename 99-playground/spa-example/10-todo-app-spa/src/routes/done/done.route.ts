import {createRoute} from '@tanstack/react-router';
import {rootRoute} from '../root.route.ts';

export const doneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/done',
}).lazy(() => import('./done.lazy.ts').then(m => m.Route));