document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const taskId = document.getElementById("taskId").value;
    const taskDescription = document.getElementById("taskDescription").value;
    console.log("Add Task:", taskId, taskDescription);
    // Here you would send a request to your PHP backend to add the task
  });

document
  .getElementById("removeTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const taskIdToRemove = document.getElementById("taskIdToRemove").value;
    console.log("Remove Task:", taskIdToRemove);
    // Here you would send a request to your PHP backend to remove the task
  });
