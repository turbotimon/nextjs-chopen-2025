import express from "express";
import morgan from "morgan";
import util from "util";
import setupProxy from "./proxy.js";

var todos = [
  { id: 1, title: "Learn Angular", completed: true },
  { id: 2, title: "Learn React", completed: false }
];

var nextId = 3;

var app = express();

//app.use(express.static(__dirname));
app.listen(3456);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined')); // configure default log output
setupProxy(app);
console.log('Server running at http://localhost:3456');
console.log('API endpoint running at http://localhost:3456/todos');

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Max-Age', 60);

  next();
});

app.get('/', function (req, res) {
  res.status(200).send("API endpoint running at http://localhost:3456/todos");
});

app.get('/todos', function (req, res) {
  const completed = req.param("completed");
  console.log('Completed:' + completed);
  let result;
  if (completed === '0' || completed === 'false') {
    result = todos.filter(t => t.completed === false);
  }
  else if (completed === '1' || completed === 'true') {
    result = todos.filter(t => t.completed === true);
  }
  else {
    result = todos;
  }
  console.log(result);
  // Wrap array in a 'result' property for security: See: http://stackoverflow.com/questions/3503102/what-are-top-level-json-arrays-and-why-are-they-a-security-risk
  res.status(200).json({ result: result });
  // setTimeout(() => res.status(201).json({result: result}), 2000);
});

app.get('/todos/:id', function (req, res) {
  var id = req.params["id"];

  var index = _.findIndex(todos, function (e) {
    return e.id == id
  }); // id is a string!

  if (index !== -1) {
    res.status(200).json({ result: todos[index] });
  }
  else {
    res.status(500).send('No todo with id: ' + id);
  }

});

app.post('/todos', function (req, res) {
  if (!req.is('json') && !req.is('application/x-www-form-urlencoded')) {
    res.status(415).send('Payload must be JSON or Form Data');
    return;
  }
  console.log(util.inspect(req.body));

  var newTodo = {
    title: req.body.title,
    completed:  req.body.completed === true || req.body.completed === "true" || req.body.completed === "on" ||req.body.completed === 1
  };
  newTodo.id = nextId;
  todos.push(newTodo);

  nextId++;

  console.log(util.inspect(todos));


  res.status(201).json({ result: newTodo });
  // setTimeout(() => res.status(201).json({result: newTodo}), 2000); // delayed response
  // res.status(500).send(); // return an error to see how the client behaves...
  // res.redirect(303, req.headers.origin); // demo for form post (stay on page)
  // res.redirect(303, '/todos'); // demo for form post (post redirect get pattern)
});

app.put('/todos/:id', function (req, res) {
  var id = req.params["id"];
  var updatedTodo = req.body;

  // var index = _.findIndex(todos, function (e) {
  //   return e.id == id
  // }); // id is a string!
  const index = todos.findIndex(t => t.id == id); // id is a string!

  if (index !== -1) {
    todos[index].title = updatedTodo.title;
    todos[index].completed = updatedTodo.completed;
    res.status(204).send();
    // setTimeout(() => res.status(204).send(), 2000);
  }
  else {
    res.status(500).send('No todo with id: ' + id);
  }

});

app.delete('/todos/:id', function (req, res) {

  var id = req.params["id"];

  // var index = _.findIndex(todos, function (e) {
  //   return e.id == id
  // }); // id is a string!
  const index = todos.findIndex(t => t.id == id); // id is a string!

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  }
  else {
    res.status(500).send('No todo with id: ' + id);
  }
});
