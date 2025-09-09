# Next.js Workshop Exercises



## 1. Create your first Next.js App

Generate the project:

```
npm create next-app@latest
```

...



Start the project in development mode:

```
npm run dev
```

Create a production build.

```
npm run build
```

... and serve the production build:

```
npm run start
```

Stop the production build and go back to development mode ...
Explore the sources ...

Add a `console.log` statement to the `src/app/page.tsx` ... where does the log output appear?



Add some routes:

- Add the file `src/app/about/page.tsx` and add a simple React component to the file:

```
export default async function AboutPage() {
  return (
    <div> Display of AboutPage. </div>
  );
}

```

Now navigate to: http://localhost:3000/about



- Add the routes
  -  `src/app/users/page.tsx`
  - `src/app/users/[id]/page.tsx`

... and default export a React component from each file.
Then navigate to  http://localhost:3000/users and http://localhost:3000/users/42

- Try to render the `id` from the url-path in the tempplate of the component.
  Have a look at: https://nextjs.org/docs/app/api-reference/functions/use-params



- Also have a look at layouts: https://nextjs.org/docs/app/getting-started/layouts-and-pages#nesting-layouts
  Try to add a layout to the `/users` route.



- Add an API-route: `src/app/api/users/[id]/route.ts` with the following content:
  ```
  export async function GET() {
    return Response.json({ message: 'Hello World' })
  }
  ```

  Then navigate to `http://localhost:3000/api/users/42`.
  Try to add the `id` from the url-path to the JSON-Response.

  You can find out more about API routes here: https://nextjs.org/docs/app/api-reference/file-conventions/route



**Finally:** install the latest canary version of Next.js with `npm i next@canary` ... maybe we will need it for some experimentation ...



## 2. Routes, Layouts and Styling

We want to implement an online ToDo App.

It should support the following routes:

- `/` -> show an attractive Home-Screen
- `/about` -> show some information about this fantastic ToDo-App
- `/todos` -> manage the pending ToDo Items: a list of todo items and a form to add a new todo item
- `/done` -> show the completed ToDo Items: a list of todo items

Your task is to implement all these routes as static pages. Each page should contain some sensible content but the content is static and cannot be changed at this point in time.

For styling I suggest using [Tailwind CSS](https://tailwindcss.com/) during this workshop, it is very widely used in the Next.js ecosystem ... but TailwindCSS ia also very controversial in the wieder web-development ecosystem.

Build your own opinion: love it or hate it ...

Next.js offers alternatives for styling: https://nextjs.org/docs/app/getting-started/css



## 3. Introduce Components

The most important aspect of React is its component model. In this exercise we are extracting some components from the static pages of the previous exercise:

- A `ToDoList` component which will be used on the `/todos` and the `/done` routes.
- A `NewToDo` component which will be used on the `/todos` route. 

Do not yet implement any dynamic state management:

-  The todo items which should be displayed in the todo list should be just hard-coded arrays of todo items and 
- The form component should not yet add any new todo item. It should just encapsulate the form, the input and the button.



## 4. DB-Access with Drizzle ORM

Habe a look at the project `99-playground/drizzle-setup`

Create the local sqlite database:

```
npm run push
```

This should create the database file in the repository root: `workshop.db`



Open a user interface to manage the database:

```
npm run studio
```



Study the script `src/index.ts` and execute it with : `npm run start`



**Task:** Add some moer todo items into the database.

**Optional:** Change the database (i.e. rename a column) then run `npm run pull`





## 5. Data Fetching with Server Components

Install drizle into the project:

```
npm i drizzle-orm better-sqlite3 dotenv 
npm i -D drizzle-kit 
```

Copy the `drizzle.config.ts`from the playground proyect into the root of the project.

Create a directory `src/db` and copy `schema.ts` from the playground project.

Create a file `src/data/data-access.ts`and implement functions to load the pending and completed todos from the db.

Then use these data-access functions in the page components to fetch the todo-items and pass them to the list components for rendering.



When everything is working in the development build then run a production build and start the production build:

```
npm run build
npm run start
```

 Is the application working as expected? Delete and add some rows in the database ...

Caching is the biggest foot-gun in Next.js. The production build did read the entries from the db *at build time* and then generated a *static page* ...

Next.js tries to magically find out if a page could be static or must be dynamic. In our simple application, it thinks that everything is static ...

*Optional:* To prove the point, create a route `src/app/todos/[id]/page.tsx` which fetches a single todo and displays it. This route will be dynamic, because it accesses the path paramter `[id]`.

To force a page into dynamic rendering, include the following snippet at the beginning of the page component:

```typescript
export const dynamic = 'force-dynamic';
```

Find out more here: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config



## 6. Mutations with Server Functions

Create a new file, `data/actions.ts` and add the directive `'use server';` as the first line.

Find out more here: https://nextjs.org/docs/app/api-reference/directives/use-server



Then implement a function that inserts a ToDo-Item:

```typescript
export async function insertToDoItem(formData: FormData){
  const newToDoItem: TodoInsert = {
    title: formData.get('title') as string,
    completed: false,
  }
  console.log('newToDoItem', newToDoItem);
  await db.insert(todos).values(newToDoItem);
}
```

Then call the method directly from the `NewToDo.tsx` component:
```jsx
<form action={insertToDoItem} >
	....
</form>
```

New rows should now be created inside the database, but the UI does not refresh yet. To achieve that, add the following line at the end of the insert function.
```typescript
revalidatePath('/todos');
```

Find out more here: : https://nextjs.org/docs/app/api-reference/functions/revalidatePath

*Attention:* The function you created above is effectively transformed in a public HTTP endpoint!
You should always validate client input and check authentication and authorization in these functions.

Find out more here: https://nextjs.org/docs/app/guides/data-security#built-in-server-actions-security-features



Now also write a function to delete a to-do item from the database. Then call this function directly from the to-do list component. In order to call it you have to wrap a form around a to-do item and the corresponding remove button.

```jsx
<form action={deleteToDoItem}>
    <input type="hidden" name="todoId" value={todo.id}/>
    <button className="...">Remove</button>
</form>
```





**Now pause and reflect which parts of the code you have written so far is executed on the server and which part is executed on the client ...?**







## 7. Introducing a Client Component

We want to introduce clientside functionality: The "Add" button should only become active when at least three characters are entered for the title.

In the `NewTodo.tsx` component add the directive `'use client';` on the first line.

Find out more here: https://nextjs.org/docs/app/api-reference/directives/use-client



Add a `console.log('Rendering NewToDo Component')` to the body of the `NewTodo.tsx` component.
Where do you see the output of that? Why?

Now you can start using client-side functionality fromtraditional React programming.
Example:

```typescript
const [newTodoTitle, setNewTodoTitle] = useState('');

function addNewTodo(formData: FormData) {
  insertToDoItem(formData);
  setNewTodoTitle('');
}

<input
      value={newTodoTitle}
      onChange={(e) => setNewTodoTitle(e.target.value)} 
      type="text"
      name="title"
      placeholder="Enter a new todo"
      className="..."
    />
```





If you want to call a React Server Function from a React Client Component, you are not restricted to forms.
Example:

```jsx
<button onClick={() => addRandomItems(5)}>
```

```typescript
'use server'

export async function addRandomItems(count: number){
  const newToDoItems: TodoInsert[] = [];
  for (let i = 0; i < count; i++) {
    newToDoItems.push({
      title: Math.random().toString(36).substring(2, 15),
      completed: false,
    })
  }
  await db.insert(todos).values(newToDoItems);
  revalidatePath('/todos');
}
```

