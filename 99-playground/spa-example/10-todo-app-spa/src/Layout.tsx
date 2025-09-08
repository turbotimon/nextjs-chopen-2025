import {Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {todoRoute} from './routes/todo/todo.route.ts';
import {doneRoute} from './routes/done/done.route.ts';

export function Layout() {
  return (
    <div className="App">
      <div className="todoapp-header">
        <h1 id="title">Simplistic ToDo</h1>
        <h4>A most simplistic ToDo List in React.</h4>
      </div>

      <div className="nav">
        {/*Note: we are introducing a cyclic dependency by using the `route` instance. 
        But using a strinf would also be type-safe ...*/}
        <Link to={todoRoute.to} activeProps={{className: `active`}}>Pending</Link>
        <Link to={doneRoute.to} activeProps={{className: `active`}}>Done</Link>
      </div>
      <section className="todoapp">
        <Outlet/>
      </section>

      <footer className="info">
        <p>
          JavaScript Example / Initial template from{" "}
          <a href="https://github.com/tastejs/todomvc-app-template">
            todomvc-app-template
          </a>
        </p>
      </footer>
      <TanStackRouterDevtools/>
    </div>
  );
}