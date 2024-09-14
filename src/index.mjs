import "./styles.css";

let todos = [
  { id: 1, label: "Buy groceries 🛒", completed: false },
  { id: 2, label: "Finish project report 📄", completed: true },
  { id: 3, label: "Call the bank 📞", completed: false },
  { id: 4, label: "Go for a walk 🚶", completed: true },
  { id: 5, label: "Water the plants 🌱", completed: false },
];

const createTodoElement = (todo) => {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-item");

  // Set up the inner HTML with the checkbox, label, and delete button
  todoElement.innerHTML = `
    <input type="checkbox" ${
      todo.completed ? "checked" : ""
    } class="todo-checkbox"/>
    <label class="todo-label">${todo.label}</label>
    <button class="delete-btn">Delete</button>
  `;

  todoElement.addEventListener("click", () => {
    todos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );

    renderTodos();
  });

  // Handle deletion (delete button)
  const deleteBtn = todoElement.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    todos = todos.filter((t) => t.id !== todo.id);

    renderTodos();
  });

  return todoElement;
};

const renderTodos = () => {
  const activeTodoListElement = document.getElementById("active-todo-list");
  const completedTodoListElement = document.getElementById(
    "completed-todo-list"
  );

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  activeTodoListElement.innerHTML = "";
  activeTodos.forEach((t) =>
    activeTodoListElement.appendChild(createTodoElement(t))
  );

  completedTodoListElement.innerHTML = "";
  completedTodos.forEach((t) =>
    completedTodoListElement.appendChild(createTodoElement(t))
  );
};

let lastUsedId = 5;

// Add a new todo
document.getElementById("add-todo-btn").addEventListener("click", () => {
  const todoInput = document.getElementById("todo-input");

  todos.push({
    id: ++lastUsedId,
    label: todoInput.value,
    completed: false,
  });

  todoInput.value = "";

  renderTodos();
});

renderTodos();
