let tasks = [];

loadTasks();

document.querySelector('.js-add-button').addEventListener('click', () => {
  addTask();
})

function addTask() {
  const todoNameObject = document.querySelector('.js-todo-name-input');
  const todoDateObject = document.querySelector('.js-todo-date-input');

  if (todoNameObject.value && todoDateObject.value) {
    tasks.push({
      name: todoNameObject.value,
      date: todoDateObject.value
    });

    showTasks();
    saveTasks();

    todoNameObject.value = '';
    todoDateObject.value = '';
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  showTasks();
}

function showTasks() {
  document.querySelector('.js-todo-list').innerHTML = '';

  tasks.forEach((task) => {
    document.querySelector('.js-todo-list').innerHTML += `
      <div class="row">
        <p>${task.name}</p>
        <p>${task.date}</p>
        <button class="delete-button js-delete-button">Delete</button>
      </div>
    `;
  });

  const deleteButtonsList = document.querySelectorAll('.js-delete-button');

  deleteButtonsList.forEach((button, index) => {
    button.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();      
    });
  });
}