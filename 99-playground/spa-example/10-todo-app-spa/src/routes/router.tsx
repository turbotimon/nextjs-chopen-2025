import { createRouter} from '@tanstack/react-router';
import {rootRoute} from './root.route.ts';
import {todoRoute} from './todo/todo.route.ts';
import {doneRoute} from './done/done.route.ts';

const routeTree = rootRoute.addChildren([todoRoute, doneRoute]);
export const router = createRouter({ routeTree });


// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}