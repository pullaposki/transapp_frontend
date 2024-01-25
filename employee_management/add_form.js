// import { post } from "./api.js";

// export function addEmployeeForm() {
//   // Create form
//   const form = document.createElement("form");
//   form.id = "addEmployeeForm";

//   // Create input for employee name
//   const employeeNameInput = document.createElement("input");
//   employeeNameInput.id = "employeeName";
//   form.appendChild(employeeNameInput);

//   // Create submit button
//   const submitButton = document.createElement("button");
//   submitButton.type = "submit";
//   submitButton.textContent = "Add Employee";
//   form.appendChild(submitButton);

//   // Create message area
//   const messageArea = document.createElement("div");
//   messageArea.id = "messageArea";

//   // Append form and message area to body (or another container element)
//   document.body.appendChild(form);
//   document.body.appendChild(messageArea);

//   // Attach event listener
//   form.addEventListener("submit", handleSubmit());

//   function handleSubmit() {
//     return async function (event) {
//       event.preventDefault();

//       const employeeName = employeeNameInput.value;
//       console.log("Add Employee:", employeeName);

//       messageArea.textContent = "Adding employee...";

//       const data = await post(`${BASE_URL}/add_employee.php`, {
//         employeeName: employeeName,
//       });

//       if (data.status === "success") {
//         console.log(data.message.value);
//         messageArea.textContent = data.message;

//         // Clear the input area
//         employeeNameInput.value = "";
//       } else {
//         console.log(
//           "Employee add unsuccessful. ",
//           data.status,
//           " ",
//           data.message
//         );
//       }
//     };
//   }
// }
