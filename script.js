document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addTaskBtn");
  const pendingList = document.getElementById("pendingTasks");
  const completedList = document.getElementById("completedTasks");

  function getCurrentDateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();
    return `${date} | ${time}`;
  }

  function createTaskElement(taskText, createdAt) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const dateDiv = document.createElement("div");
    dateDiv.textContent = createdAt || getCurrentDateTime();
    dateDiv.style.fontSize = "0.75em";
    dateDiv.style.opacity = "0.7";
    dateDiv.style.marginTop = "5px";

    const contentDiv = document.createElement("div");
    contentDiv.style.display = "flex";
    contentDiv.style.flexDirection = "column";
    contentDiv.appendChild(span);
    contentDiv.appendChild(dateDiv);

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔";
    completeBtn.title = "Mark as complete";
    completeBtn.addEventListener("click", () => {
      span.classList.add("completed");
      completedList.appendChild(li);
      completeBtn.remove();
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✎";
    editBtn.title = "Edit task";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your task:", span.textContent);
      if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑";
    deleteBtn.title = "Delete task";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(contentDiv);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return li;
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskElement = createTaskElement(taskText);
    pendingList.appendChild(taskElement);
    taskInput.value = "";
  }

  addBtn.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      pendingList.innerHTML = "";
      completedList.innerHTML = "";
    }
  });
});
