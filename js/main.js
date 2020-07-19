// varible input target id #task-input
const input = document.getElementById("task-input");
// varible totalTasks target id #total
const totalTasks = document.getElementById("total");

// varible completedTasks target id #completed
const completedTasks = document.getElementById("completed");

// varible completedTasks target id #completed
const modal = document.getElementById("modal");

// varible maxRecentlyDeleted for the nember of the tasks that you will see in the ul with id #completed-task-list
const maxRecentlyDeleted = 4;

// will test if there is data in the localStorage with  key "TotalTasks" if not will add the key and make the value = 0
loadData("TotalTasks") || saveData("TotalTasks", 0);

// will test if there is data in the localStorage with  key "CompletedTasks" if not will add the key and make the value = 0
loadData("CompletedTasks") || saveData("CompletedTasks", 0);

// will test if there is data in the localStorage with  key "ToDoTheme" if not will add the key and make the value = light
loadData("ToDoTheme") || saveData("ToDoTheme", "light");

// will display the value of the key "TotalTasks" in the h4 with id #total
totalTasks.innerHTML = loadData("TotalTasks");

// will display the value of the key "CompletedTasks" in the h4 with id #completed
completedTasks.innerHTML = loadData("CompletedTasks");

//1 - this event trigger when you you press "enter" in the input with id #task-input
//2 - it will see if ther is value in the input :
//      I there is no value it will do nathing     
//      II there is value will add it to the object store "Tasks" and add 1 to the value of the key "TotalTasks" 
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    let task = new Task(input.value);
    input.value = "";
    if (task.title.length === 0) { return }
    addTask(taskStore, task, function () {
      let amountOfTasks = Number(loadData("TotalTasks")) + 1;
      saveData("TotalTasks", amountOfTasks);
      totalTasks.innerHTML = loadData("TotalTasks");
      updateTasks();
    });
  }
});

function updateTasks() {
  readTasks(taskStore, function (tasks) {
    let list = document.getElementById("task-list");
    let innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      innerHTML += `
        <li data-id='${tasks[i].id}' onclick='deleteTaskOnClick(this)'>
          ${tasks[i].title}
        </li>
      `;
    }
    list.innerHTML = innerHTML;
  });

  // this function work with ul have id #completed-task-list
  // to add li with the last 4 tasks have been deleted 
  readTasks(completedTaskStore, function (tasks) {
    let list = document.getElementById("completed-task-list");
    let innerHTML = "";
    tasks.reverse();
    for (let i = 0; i < Math.min(tasks.length, maxRecentlyDeleted); i++) {
      innerHTML += `<li class='invert'>${tasks[i].title}: <span>${tasks[i].completedDate}</span></li>`;
    }
    list.innerHTML = innerHTML;
  });
}

// when the page load this functin check the local localStorage and the object store then display the body  
function onLoad() {
  updateTasks();
  updateTheme(loadData("ToDoTheme"));
  document.body.style.display = "flex";
  // deleteAllTask(taskStore);
  // deleteAllTask(completedTaskStore);
  // saveData("TotalTasks", 0);
  // saveData("CompletedTasks", 0);
}
// this function delete li in the ul with id #task-list
function deleteTaskOnClick(elem) {
  let id = Number(elem.dataset.id);

  let task = readOneTask(taskStore, id, function (task) {

    let completedTask = new CompletedTask(task.title);
    addTask(completedTaskStore, completedTask, function () {
      elem.classList.add("exit");

      elem.addEventListener("animationend", function () {
        deleteTask(taskStore, id, function () {
          let amountOfTasks = Number(loadData("TotalTasks")) - 1;
          saveData("TotalTasks", amountOfTasks);
          totalTasks.innerHTML = loadData("TotalTasks");

          let amountOfCompleted = Number(loadData("CompletedTasks")) + 1;
          saveData("CompletedTasks", amountOfCompleted);
          completedTasks.innerHTML = loadData("CompletedTasks");
          updateTasks();
        });
      });
    });
  });
}
// this function updata the theme qnd save it in the localStorage
function updateTheme(theme) {
  let bgColor = theme == 'light' ? "255, 255, 255" : "19, 19, 19";
  let textColor = theme == 'light' ? "12, 12, 12" : "255, 255, 255";
  let shadowColor = theme == 'light' ? "0, 0, 0" : "255, 255, 255";
  let grade1 = theme == 'light' ? "108, 29, 103" : "34, 208, 163";
  let grade2 = theme == 'light' ? "100, 25, 148" : "32, 173, 211";
  let sideGrade1 = theme == 'light' ? "255, 255, 255" : "35, 35, 35";
  let sideGrade2 = theme == 'light' ? "251, 247, 247" : "46, 46, 46";

  let root = document.documentElement;

  root.style.setProperty("--bg-color", bgColor);
  root.style.setProperty("--text-color", textColor);
  root.style.setProperty("--shadow-color", shadowColor);
  root.style.setProperty("--gradient-1", grade1);
  root.style.setProperty("--gradient-2", grade2);
  root.style.setProperty("--sidebar-gradient-1", sideGrade1);
  root.style.setProperty("--sidebar-gradient-2", sideGrade2);

  document.getElementsByClassName("current-theme")[0].classList.remove("current-theme");
  let activateClass = theme == "light" ? "light" : "dark";
  document.getElementById(activateClass).classList.add("current-theme");

  saveData("ToDoTheme", theme);

  let invertStrength = theme == "light" ? "0%" : "100%";
  let icons = document.getElementsByClassName("icon");
  for (var i = 0; i < icons.length; i++) {
    icons[i].style.filter = `brightness(100%) invert(${invertStrength})`;
  }
}
// this function display the modal
function attemptReset() {
  modal.showModal();
}
// this function close the modal
function closeModal() {
  modal.close();
}
// this function delete all the tasks in object stors and reset the localStorage
function reset() {
  saveData("TotalTasks", 0);
  totalTasks.innerHTML = "0";
  saveData("CompletedTasks", 0);
  completedTasks.innerHTML = "0";

  deleteAllTask(taskStore);
  deleteAllTask(completedTaskStore);
  updateTasks();
}
