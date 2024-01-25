import { getAll, getOne, post, put, deleteOne, BASE_URL } from "./api.js";

function createManageArea(data, employee, listItem, employeeInfo) {
  const manageArea = document.createElement("div");

  const br1 = document.createElement("br");
  manageArea.appendChild(br1);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = data.message.first_name;
  manageArea.appendChild(nameInput);

  const updateButton = document.createElement("button");
  updateButton.addEventListener(
    "click",
    handleUpdateClick(employee, nameInput, listItem, employeeInfo)
  );
  updateButton.textContent = "update";
  manageArea.appendChild(updateButton);

  const br2 = document.createElement("br");
  manageArea.appendChild(br2);

  const br3 = document.createElement("br");
  manageArea.appendChild(br3);

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", handleDeleteClick(employee, listItem));
  deleteButton.textContent = "Delete";
  manageArea.appendChild(deleteButton);

  const hr = document.createElement("hr");
  manageArea.appendChild(hr);

  listItem.appendChild(manageArea);

  return manageArea;
}

function createEmployeeListItem(employee) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item mb-3"; // Use Bootstrap's list group item style and add some margin-bottom
  const employeeInfo = document.createElement("span"); // Create a new span to hold the employee info
  employeeInfo.textContent = `${employee.first_name} (ID: ${employee.id})`;
  listItem.appendChild(employeeInfo); // Append the span to the listItem

  const manageButton = document.createElement("button");
  manageButton.textContent = "Manage";
  manageButton.className = "btn btn-primary mr-2"; // Use Bootstrap's blue button style and add some margin to the right

  const handleManageClick = async function () {
    debugger;
    const data = await getOne(
      `${BASE_URL}/get_employee_by_id.php`,
      employee.id
    );

    if (data.status === "success") {
      manageButton.textContent = "Close";
      manageButton.removeEventListener("click", handleManageClick);

      const manageArea = createManageArea(
        data,
        employee,
        listItem,
        employeeInfo
      );

      const handleCloseClick = function () {
        console.log("Close button clicked");
        listItem.removeChild(manageArea);
        manageButton.textContent = "Manage";
        manageButton.removeEventListener("click", handleCloseClick);
        manageButton.addEventListener("click", handleManageClick);
      };

      manageButton.addEventListener("click", handleCloseClick);
    } else {
      console.log(
        "Employee id get unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  };

  manageButton.addEventListener("click", handleManageClick);
  listItem.appendChild(manageButton);

  listItem.insertBefore(manageButton, listItem.firstChild); // Insert the manage button before the first child of the list item
  return listItem;
}

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", handleSubmit());

function handleSubmit() {
  return async function (event) {
    event.preventDefault();

    const employeeNameInput = document.getElementById("employeeName");
    const employeeName = employeeNameInput.value;
    console.log("Add Employee:", employeeName);

    const messageArea = document.getElementById("messageArea");
    messageArea.textContent = "Adding employee...";

    const data = await post(`${BASE_URL}/add_employee.php`, {
      employeeName: employeeName,
    });

    if (data.status === "success") {
      console.log(data.message.value);
      messageArea.textContent = data.message;

      // Clear the input area
      employeeNameInput.value = "";

      getAndRenderAllEmployees();
    } else {
      console.log(
        "Employee add unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  };
}

function handleDeleteClick(employee, listItem) {
  return async function () {
    const data = await deleteOne(`${BASE_URL}/delete_employee.php`, {
      employeeId: employee.id,
    });

    if (data.status === "success") {
      console.log(data.message.value);
      messageArea.textContent = data.message;

      // Remove the listItem
      listItem.parentElement.removeChild(listItem);
    } else {
      console.log(
        "Employee delete unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  };
}

function handleUpdateClick(employee, nameInput, listItem, employeeInfo) {
  return async function () {
    const data = await put(`${BASE_URL}/update_employee.php`, {
      employeeId: employee.id,
      employeeName: nameInput.value,
    });

    if (data.status === "success") {
      console.log(data.message);
      messageArea.textContent = data.message;

      // Update the employeeInfo text content and nameInput value
      employeeInfo.textContent = `${nameInput.value} (ID: ${employee.id})`;
      nameInput.value = "";
    } else {
      console.log(
        "Employee update unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  };
}

async function getAndRenderAllEmployees() {
  const employees = await getAll(`${BASE_URL}/get_employees.php`);
  const employeeListElement = document.getElementById("employeeList");

  // Clear the list
  while (employeeListElement.firstChild) {
    employeeListElement.removeChild(employeeListElement.firstChild);
  }

  employees.forEach((employee) => {
    const listItem = createEmployeeListItem(employee);
    employeeListElement.appendChild(listItem);
  });
}

getAndRenderAllEmployees();
