const form = document.getElementById("todo-form");
const taskTitleInput = document.getElementById("add-title-task");
// const buttonAddTask = document.getElementById("add-task");
const todoListUl = document.getElementById("todo-list-ul");

let tasks = [];

function renderTaskOnHtml(taskTitle, done = false) {
  // Criando nossa li
  const liCreated = document.createElement("li");

  // Criando nosso input checkbox
  const inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  inputCheckbox.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;

    const done = event.target.checked;

    const spanToToggle = liToToggle.querySelector("span");

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((task) => {
      if (task.title === spanToToggle.textContent) {
        return {
          title: task.title,
          done: !task.done,
        };
      }

      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  inputCheckbox.checked = done;

  // Criando nosso span
  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  // Criando botão lixeira
  const buttonApagar = document.createElement("button");
  buttonApagar.textContent = "Remover";
  buttonApagar.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;
    const titleLiToRemove = liToRemove.querySelector("span").textContent;
    newTasks = tasks.filter((task) => task.title !== titleLiToRemove);
    tasks = newTasks;
    todoListUl.removeChild(liToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  liCreated.appendChild(inputCheckbox);
  liCreated.appendChild(span);
  liCreated.appendChild(buttonApagar);

  todoListUl.appendChild(liCreated);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  console.log(tasksOnLocalStorage);

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHtml(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa deve contêr pelo menos 3 caracteres!");
    return;
  }

  tasks.push({ title: taskTitle, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHtml(taskTitle);

  taskTitleInput.value = "";
});
