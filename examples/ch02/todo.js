import { createApp, h, hFragment } from "./kf-test.js";

// const todos = ["coding", "reading newspaper"];

// let addTodoInput = document.getElementById("add-todo");
// let addTodoButton = document.getElementById("add-todo-btn");
// let todoList = document.getElementById("todo-list");

// function renderTodos() {
//   for (const todo of todos) {
//     console.log(todo);
//     todoList.innerHTML += renderTodoInReadMode(todo).outerHTML;
//   }
// }

// addTodoInput.addEventListener("input", () => {
//   console.log("input entered");
//   addTodoButton.disabled = addTodoInput.value.length < 3;
// });

// addTodoInput.addEventListener("keydown", ({ key }) => {
//   if (key === "Enter" && addTodoInput.value.length > 3) {
//     addTodo();
//   }
// });

// addTodoButton.addEventListener("click", () => {
//   addTodo();
// });

// function renderTodoInReadMode(todo) {
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.textContent = todo;
//   span.addEventListener("dblclick", () => {
//     const idx = todos.indexOf(todo);
//     todoList.replaceChild(renderTodoInEditMode(todo), todoList.childNodes[idx]);
//   });
//   li.append(span);
//   const button = document.createElement("button");
//   button.textContent = "Done";
//   button.addEventListener("click", () => {
//     const idx = todos.indexOf(todo);
//     removeTodo(idx);
//   });
//   li.append(button);
//   return li;
// }
// function removeTodo(index) {
//   // TODO: implement me!
// }
// function addTodo() {
//   ///
// }

// function renderTodoInEditMode() {}

// window.onload = renderTodos;

const state = {
  currentTodo: "",
  edit: {
    idx: null,
    original: null,
    edited: null,
  },
  todos: ["Walk the dog", "Water the plants", "Sand the chairs"],
};

const reducers = {
  "update-current-todo": (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),

  "add-todo": (state) => ({
    ...state,
    todos: [...state.todos, state.currentTodo],
  }),

  "start-editing-todo": (state, idx) => ({
    ...state,
    edit: {
      idx,
      original: state.todos[idx],
      edited: state.todos[idx],
    },
  }),

  "edit-todo": (state, edited) => ({
    ...state,
    edit: { ...state.edit, edited },
  }),

  "save-edited-todo": (state) => {
    const todos = [...state.todos];
    todos[state.edit.idx] = state.edit.edited;

    return {
      ...state,
      edit: { idx: null, original: null, edited: null },
      todos,
    };
  },

  "cancel-editing-todo": (state) => ({
    ...state,
    edit: { idx: null, original: null, edited: null },
  }),

  "remove-todo": (state, idx) => ({
    ...state,
    todos: state.todos.filter((_, i) => i !== idx),
  }),
};

function App(state, emit) {
  return hFragment([
    h("h1", {}, ["My TODOs"]),
    CreateTodo(state, emit),
    TodoList(state, emit),
  ]);
}

function CreateTodo({ currentTodo }, emit) {
  return h("div", {}, [
    h("label", { for: "todo-input" }, ["New TODO"]),
    h("input", {
      type: "text",
      id: "todo-input",
      value: currentTodo,
      on: {
        input: ({ target }) => emit("update-current-todo", target.value),
      },
    },[]),
    h(
      "button",
      {
        disabled: currentTodo.length < 3,
        on: { click: () => emit("add-todo") },
      },
      ["Add"]
    ),
  ]);
}

function TodoList({ todos, edit }, emit) {
  return h(
    "ul",
    {},
    todos.map((todo, i) => TodoItem({ todo, i, edit }, emit))
  );
}

function TodoItem({ todo, i, edit }, emit) {
  const isEditing = edit.idx === i;

  return isEditing
    ? h("li", {}, [
        h("input", {
          value: edit.edited,
          on: { input: ({ target }) => emit("edit-todo", target.value) },
        }),
        h("button", { on: { click: () => emit("save-edited-todo") } }, [
          "Save",
        ]),
        h("button", { on: { click: () => emit("cancel-editing-todo") } }, [
          "Cancel",
        ]),
      ])
    : h("li", {}, [
        h("span", { on: { dblclick: () => emit("start-editing-todo", i) } }, [
          todo,
        ]),
        h("button", { on: { click: () => emit("remove-todo", i) } }, ["Done"]),
      ]);
}

createApp({ state,  view:App, reducers}).mount(document.body);
