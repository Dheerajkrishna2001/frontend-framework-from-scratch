const todos = ["coding", "reading newspaper"];

let addTodoInput = document.getElementById("add-todo");
let addTodoButton = document.getElementById("add-todo-btn");
let todoList = document.getElementById("todo-list");

function renderTodos() {
  for (const todo of todos) {
    console.log(todo);
    todoList.innerHTML += renderTodoInReadMode(todo).outerHTML;
  }
}

addTodoInput.addEventListener("input", () => {
  console.log("input entered");
  addTodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length > 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", () => {
  addTodo();
});

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todo;
  span.addEventListener("dblclick", () => {
    const idx = todos.indexOf(todo);
    todoList.replaceChild(renderTodoInEditMode(todo), todoList.childNodes[idx]);
  });
  li.append(span);
  const button = document.createElement("button");
  button.textContent = "Done";
  button.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    removeTodo(idx);
  });
  li.append(button);
  return li;
}
function removeTodo(index) {
  // TODO: implement me!
}
function addTodo() {
  ///
}

function renderTodoInEditMode() {}

window.onload = renderTodos;
