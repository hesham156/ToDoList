const root = document.getElementById("root");
const listInput = document.getElementById("listInput");
const addToList = document.getElementById("addToList");
let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
const getFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    showInPage(tasks);
  }
};
getFromLocalStorage();
addToList.onclick = () => {
  if (listInput.value) {
    addToTasks(listInput.value);
    listInput.value = "";
  }
};

const addToTasks = (taske) => {
  const task = {
    id: Date.now(),
    title: taske,
    state: false,
  };
  tasks.push(task);
  showInPage(tasks);
  addToLocalStorage(tasks);
};
function showInPage(arr) {
  root.innerHTML = "";

  arr.forEach((task) => {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Delet"));
    button.onclick = (e) => {
      delTask(e, task.id);
    };
    button.className = "btn-del m-0 ";
    div.className = "w-100 task";
    div.appendChild(document.createTextNode(task.title));
    div.appendChild(button);

    root.appendChild(div);
  });
}
const addToLocalStorage = (data) => {
  localStorage.setItem("tasks", JSON.stringify(data));
};
function delTask(e, id) {
  e.target.parentElement.remove();

  tasks = tasks.filter((task) => task.id !== id);
  addToLocalStorage(tasks);
}
