const preTasks = document.querySelector("#pre-tasks");
const controlBox = document.querySelector("#control-box");

const progressCount = document.querySelector("#progress-count");

// Adder open and close

const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", takeAdder);

const closeAdder = document.querySelector("#close-adder");
closeAdder.addEventListener("click", takeAdder);

const adderForm = document.querySelector("#adder-form");
adderForm.addEventListener("submit", addTask);

function takeAdder() {
  adderForm.classList.toggle("removed");
  /*  preTasks.classList.toggle('hidden');*/
}

// Filter open and close

const filterBtn = document.querySelector("#filter-btn");
filterBtn.addEventListener("click", takeFilter);

const closeFilter = document.querySelector("#close-filter");
closeFilter.addEventListener("click", takeFilter);

const filterForm = document.querySelector("#filter-form");

function takeFilter() {
  filterForm.classList.toggle("removed");
}

const btnAll = document.querySelector("#btn-all");
const btnActive = document.querySelector("#btn-active");
const btnDone = document.querySelector("#btn-done");
// const submitFilter = document.querySelector('#submit-filter');
btnAll.addEventListener("click", filterTasks);
btnActive.addEventListener("click", filterTasks);
btnDone.addEventListener("click", filterTasks);

let chosen = "all";

function filterTasks(event) {
  event.preventDefault();
  const chosenBtn = event.currentTarget;
  const rawChoice = chosenBtn.value;
  chosen = rawChoice.toLowerCase();
  renderTasks();
  filterForm.classList.toggle("removed");
}
/*
// Grouper open and close

const groupBtn = document.querySelector('#group-btn');
groupBtn.addEventListener('click', takeGrouper);

const closeGrouper = document.querySelector('#close-grouper');
closeGrouper.addEventListener('click', takeGrouper);

const grouperForm = document.querySelector('#grouper-form');

function takeGrouper() {
  grouperForm.classList.toggle('removed');
}
*/

// Data handling and rendering

const noTask = document.querySelector("#no-task");
const taskList = document.querySelector("#task-list");

let doneCounts = 0;

let tasks = JSON.parse(localStorage.getItem("tasksData")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  doneCounts = 0;

  if (tasks.length > 0) {
    if (!noTask.classList.contains("removed")) {
      noTask.classList.add("removed");
    }
    if (taskList.classList.contains("hidden")) {
      taskList.classList.remove("hidden");
    }
  } else {
    if (noTask.classList.contains("removed")) {
      noTask.classList.remove("removed");
    }
    if (!taskList.classList.contains("hidden")) {
      taskList.classList.add("hidden");
    }
  }

  const tasksLen = tasks.length;

  for (let i = 0; i < tasksLen; i++) {
    if (tasks[i].state === "done") {
      doneCounts++;
    }
  }

  progressCount.textContent = doneCounts + " Done / " + tasksLen + " Total";

  let choice;

  if (chosen === "all") {
    choice = tasks;
  } else if (chosen === "active") {
    choice = tasks.filter((taskItem) => taskItem.state === "active");
  } else {
    choice = tasks.filter((taskItem) => taskItem.state === "done");
  }

  const stateDisplayer = document.createElement("li");
  stateDisplayer.classList.add("state-displayer");
  const stateBox = document.createElement("div");
  let chosenCap = chosen[0].toUpperCase();
  let chosenPart = chosen.slice(1);
  let stateText = chosenCap + chosenPart;
  if (chosen === "all") {
    stateBox.className = "state-all";
  } else if (chosen === "active") {
    stateBox.className = "state-active";
  } else {
    stateBox.className = "state-done";
  }
  stateBox.textContent = stateText;

  stateDisplayer.appendChild(stateBox);
  taskList.prepend(stateDisplayer);

  const noTodo = document.querySelector("#no-todo");

  if (tasks.length > 0 && choice.length === 0) {
    if (noTodo.classList.contains("removed")) {
      noTodo.classList.remove("removed");
    }
    if (chosen === "active") {
      noTodo.textContent = "There are no active tasks.";
    } else if (chosen === "done") {
      noTodo.textContent = "There are no completed tasks.";
    }
  } else if (tasks.length > 0 && choice.length > 0) {
    if (!noTodo.classList.contains("removed")) {
      noTodo.classList.add("removed");
    }
  }

  choice.forEach((task) => {
    const li = document.createElement("li");
    const topDiv = document.createElement("div");
    const bottomDiv = document.createElement("div");
    const mainDiv = document.createElement("div");
    const subDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const noteDiv = document.createElement("div");
    const dueDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");

    li.classList.add("task-block");
    topDiv.classList.add("top-div");
    bottomDiv.classList.add("bottom-div");
    mainDiv.classList.add("main-div");
    subDiv.classList.add("sub-div");
    nameDiv.classList.add("name-div");
    noteDiv.classList.add("note-div");
    dueDiv.classList.add("due-div");
    deleteBtn.classList.add("delete-btn");

    nameDiv.textContent = task.taskName;
    noteDiv.textContent = task.taskNote;
    dueDiv.textContent = task.dueDate;
    deleteBtn.textContent = "Delete";

    nameDiv.addEventListener("click", () => {
      if (task.state === "active") {
        task.state = "done";
      } else {
        task.state = "active";
      }

      localStorage.setItem("tasksData", JSON.stringify(tasks));

      let doneCounts = 0;
      let activeCounts = 0;
      const tasksLen = tasks.length;

      for (let i = 0; i < tasksLen; i++) {
        if (tasks[i].state === "done") {
          doneCounts++;
        }
        /*else{
          activeCounts++;
        }*/
      }

      progressCount.textContent = doneCounts + " Done / " + tasksLen + " Total";

      nameDiv.classList.toggle("done");
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      let toDelete = confirm(
        "Do you want to delete the task " + task.taskName + " ?",
      );
      if (toDelete === true) {
        tasks = tasks.filter((todo) => todo.taskName !== task.taskName);
        localStorage.setItem("tasksData", JSON.stringify(tasks));
        renderTasks();
      }
    });

    subDiv.appendChild(deleteBtn);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(noteDiv);
    topDiv.appendChild(mainDiv);
    topDiv.appendChild(subDiv);
    bottomDiv.appendChild(dueDiv);
    li.appendChild(topDiv);
    li.appendChild(bottomDiv);
    taskList.appendChild(li);

    if (task.state === "done") {
      if (!nameDiv.classList.contains("done")) {
        nameDiv.classList.add("done");
      }
    } else {
      if (nameDiv.classList.contains("done")) {
        nameDiv.classList.remove("done");
      }
    }
  });
}

function addTask(event) {
  event.preventDefault();

  const taskName = document.querySelector("#task-name").value;
  const dueDate = document.querySelector("#due-date").value;
  const taskNote = document.querySelector("#task-note").value;

  const newTask = {
    taskName: taskName,
    dueDate: dueDate,
    taskNote: taskNote,
    state: "active",
  };

  tasks = JSON.parse(localStorage.getItem("tasksData")) || [];
  tasks.push(newTask);
  localStorage.setItem("tasksData", JSON.stringify(tasks));

  adderForm.reset();
  renderTasks();
  adderForm.classList.toggle("removed");
}

const removeDone = document.querySelector("#remove-done");
removeDone.addEventListener("click", removeCompleted);

function removeCompleted() {
  if (doneCounts !== 0) {
    let toClear = confirm(
      "Do you want to clear all completed tasks? (This action cannot be undone.)",
    );
    if (toClear === true) {
      tasks = tasks.filter((task) => task.state === "active");
      localStorage.setItem("tasksData", JSON.stringify(tasks));
      renderTasks();
    }
  } else {
    window.alert("You don't have any completed tasks.");
  }
}

renderTasks();
