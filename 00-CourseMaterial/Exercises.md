# Next.js Workshop Exercises



## 1. Create your first Next.js App

Generate the project:

```
npm create next-app@latest
```



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



Add some routes:



Also have a look at layouts:





Add a `console.log` statement to the `src/app/page.tsx` ... where does the log output appear?



**Finally:** install the latest canary version of Next.js with `npm i next@canary` ... we will need it for some experimentation ...



## 2. Routes, Layouts and Styling





## 3. Introduce Components







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
npm i drizzle-orm @libsql/client
npm i -D drizzle-kit
```

Copy the `drizzle.config.ts`from the playground proyect into the root of the project.

Create a directory `src/db`.

Copy `schema.ts` from the playground project.

Create a file `src/db/data-access.ts`and implement functions to load the pending and completed todos from the db.

Then use these data access functions in the page components itself.



When everything is working in the development build, run a production build and start the production build:

```
npm run build
npm run start
```

 Is the applicatoin working as expected? Delete and add some rows in the database ...

Caching is the biggest foot-gun in Next.js. The production build did read the entries from the db at build time and then generated a static page ...

Next.js tries to magically find out if a page could be static or must be dynamic. In our simple application, it thinks that everything is static ...

Optional: To prove the point, create a route `src/app/todos/[id]/page.tsx` which fetches a single todo and displays it. This route will be dynamic, because it accesses the path paramter `[id]`.

Ro force a page into dynamic rendering include the following snippet at the beginning:

```typescript
export const dynamic = 'force-dynamic';
```





## 6. Mutations with Server Functions

Mark the file `data-access.ts` with the directive `'use server';` on the first line. Then implement another function that inserts aToDo-Item:

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

Then call the method directly from the `NewToDo.tsx` Component:
```jsx
<form action={insertToDoItem} >
	....
</form>
```

New rows should now be created inside the database, but the UI does not refresh yet. To achieve that, add the following line at the end of the insert function.
```typescript
revalidatePath('/todos');
```

See: https://nextjs.org/docs/app/api-reference/functions/revalidatePath



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

