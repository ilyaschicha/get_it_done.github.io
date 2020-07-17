//
let datebase;
// Object Store for the added tasks
const taskStore = "Tasks";
// Object Store for the completed tasks tasks
const completedTaskStore = "CompletedTasks";

/**
 * @function Task: use to have the value from input tag
 */
function Task(title) {
  this.title = title;

}
/**
 * @function CompletedTask: have tow varible 
 * @name title : use to have the value from task will be deleted
 * @name completedDate : will use the function getCurrentDate  from file data_format.js
 */
function CompletedTask(title) {
  this.title = title;
  this.completedDate = getCurrentDate();
}

// in load the website page will open index data base called "GetItDoneAppDB" 
// if data base opend it will active onload() function in the main.js
window.onload = function () {
  let req = window.indexedDB.open("GetItDoneAppDB");

  req.onsuccess = function () {
    database = req.result;
    onLoad();
  }

  req.onerror = function (event) {
    alert("There was an error", event);
  }
  // will create tow object store Tasks/CompletedTasks when first created index data base 
  req.onupgradeneeded = function (event) {
    let db = req.result;
    let objectStore = db.createObjectStore(taskStore, { keyPath: "id", autoIncrement: true });
    let objectStore2 = db.createObjectStore(completedTaskStore, { keyPath: "id", autoIncrement: true });
  }
}

// will handel the error in the function ('addTask', 'readTasks', 'readOneTask', 'deleteTask', 'deleteAllTask')
let defaultError = function () {
  console.log("Somthing went wrong");
}
/**
 * use to add one task in object store Tasks or CompletedTasks
 * @param {string} store 
 * @param {string} task 
 * @param {CallableFunction} success 
 * @param {defaultError} error 
 * 
 */
function addTask(store, task, success, error = defaultError) {
  let transaction = database.transaction([store], "readwrite");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.add(task);
  request.onerror = error;
  request.onsuccess = success;
}
/**
 * use to read all tasks in object store Tasks or CompletedTasks
 * @param {string} store 
 * @param {string} task 
 * @param {CallableFunction} success 
 * @param {defaultError} error 
 * 
 */
function readTasks(store, success, error = defaultError) {
  let transaction = database.transaction([store], "readonly");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.openCursor();
  request.onerror = error;
  let tasks = [];
  request.onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor) {
      let task = cursor.value;
      tasks.push(task);
      cursor.continue();
    } else {
      success(tasks);
    }
  };
}
/**
 * use to read one task in object store Tasks/CompletedTasks
 * @param {string} store 
 * @param {string} task 
 * @param {CallableFunction} success 
 * @param {defaultError} error 
 * 
 */
function readOneTask(store, id, success, error = defaultError) {
  let transaction = database.transaction([store], "readonly");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.get(id);
  request.onerror = error;
  request.onsuccess = function () {
    success(request.result);
  };
}
/**
 * use to delete one task in object store Tasks or CompletedTasks
 * @param {string} store 
 * @param {string} task 
 * @param {CallableFunction} success 
 * @param {defaultError} error 
 * 
 */
function deleteTask(store, id, success, error = defaultError) {
  let transaction = database.transaction([store], "readwrite");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.delete(id);
  request.onerror = error;
  request.onsuccess = function () {
    success(request.result);
  };
}
/**
 * use to delete all tasks in object store Tasks or CompletedTasks
 * @param {string} store 
 * @param {string} task 
 * @param {CallableFunction} success 
 * @param {defaultError} error 
 * 
 */
function deleteAllTask(store, success, error = defaultError) {
  success = success || function () { }
  let transaction = database.transaction([store], "readwrite");
  let objectStore = transaction.objectStore(store);
  let request = objectStore.clear();
  request.onerror = error;
  request.onsuccess = function () {
    success(request.result);
  };
}
