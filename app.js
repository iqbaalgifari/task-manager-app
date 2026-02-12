const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");
const darkToggle = document.getElementById("darkToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(task.id);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  addTask(taskInput.value.trim());
  taskInput.value = "";
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderTasks();
