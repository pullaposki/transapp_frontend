fetch("http://localhost/03_trans_app_backend/get_employees.php", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
    return JSON.parse(text);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Get the element in your HTML where you want to display the list of employees
// const employeeListElement = document.getElementById("employeeList");

// // Create a list item for each employee and add it to the employee list element
// employees.forEach((employee) => {
//   const listItem = document.createElement("li");
//   listItem.textContent = `${employee.name} (ID: ${employee.id})`;

//   // Create a "Manage" button for each employee
//   const manageButton = document.createElement("button");
//   manageButton.textContent = "Manage";
//   manageButton.addEventListener("click", function () {
//     console.log(`Manage button clicked for employee ${employee.id}`);
//     // Here you can add the code to manage the employee
//   });

//   // Add the manage button to the list item
//   listItem.appendChild(manageButton);

//   // Add the list item to the employee list element
//   employeeListElement.appendChild(listItem);
// });

// document
//   .getElementById("addEmployeeForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const employeeName = document.getElementById("employeeName").value;
//     console.log("Add Employee:", employeeName);

//     fetch("http://localhost/03_trans_app_backend/login.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "success") {
//           // Login was successful
//           console.log("Logged in!");
//           window.location.href = "./employee.html";
//         } else {
//           // Login failed
//           console.log("Login failed. ", data.status, " ", data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// document
//   .getElementById("removeEmployeeForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const employeeId = document.getElementById("employeeId").value;
//     console.log("Remove Employee:", employeeId);
//     // Here you would send a request to your PHP backend to remove the employee
//   });