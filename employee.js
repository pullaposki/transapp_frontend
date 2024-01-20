document.getElementById("messageArea");

//import fetch from 'node-fetch';
// fetch("http://localhost/03_trans_app_backend/get_employees.php", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.text())
//   .then((text) => {
//     console.log(text);
//     return JSON.parse(text);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// // Get the element in your HTML where you want to display the list of employees
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

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const employeeName = document.getElementById("employeeName").value;
    console.log("Add Employee:", employeeName);
    messageArea.textContent = "Adding employee...";

    fetch("http://localhost/03_trans_app_backend/add_employee.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeName: employeeName,
      }),
    })
      .then((response) => response.text()) // Log the response as text
      .then((text) => {
        console.log(text);

        try {
          return JSON.parse(text);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          throw error;
        }
      })
      .then((data) => {
        if (data.status === "success") {
          console.log(data.message.value);
          messageArea.textContent = data.message;
        } else {
          console.log(
            "Employee add unsuccesful. ",
            data.status,
            " ",
            data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// document
//   .getElementById("removeEmployeeForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const employeeName = document.getElementById("employeeName").value;
//     console.log("Remove Employee:", employeeName);
//     // Here you would send a request to your PHP backend to remove the employee
//   });
