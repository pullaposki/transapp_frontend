async function fetchData(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error;
  }
}

function createEmployeeListItem(employee) {
  const listItem = document.createElement("li");
  listItem.textContent = `${employee.first_name} (ID: ${employee.id})`;

  const manageButton = document.createElement("button");
  manageButton.textContent = "Manage";

  // Get employee by id
  manageButton.addEventListener("click", async function () {
    console.log(`Manage button clicked for employee ${employee.id}`);
    const data = await fetchData(
      `http://localhost/_projects/03_transapp_backend/get_employee_by_id.php?id=${employee.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.status === "success") {
      console.log(data.message);
      messageArea.textContent = JSON.stringify(data.message);

      // Change manage button to close button
      manageButton.textContent = "Close";

      // Create manage area
      const manageArea = document.createElement("div");

      const br1 = document.createElement("br");
      manageArea.appendChild(br1);

      // Create input field for changing the name
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = data.message.first_name;
      manageArea.appendChild(nameInput);

      // Create update button
      const updateButton = document.createElement("button");
      updateButton.textContent = "update";
      manageArea.appendChild(updateButton);
      const br2 = document.createElement("br");
      manageArea.appendChild(br2);

      const br3 = document.createElement("br");
      manageArea.appendChild(br3);

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      manageArea.appendChild(deleteButton);

      const hr = document.createElement("hr");
      manageArea.appendChild(hr);

      // Append manage area to list item
      listItem.appendChild(manageArea);
    } else {
      console.log(
        "Employee id get unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  });

  listItem.appendChild(manageButton);

  return listItem;
}

// Fetch employees and update the UI
fetchData("http://localhost/_projects/03_transapp_backend/get_employees.php", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((employees) => {
    const employeeListElement = document.getElementById("employeeList");
    employees.forEach((employee) => {
      const listItem = createEmployeeListItem(employee);
      employeeListElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Handle form submission
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const employeeName = document.getElementById("employeeName").value;
    console.log("Add Employee:", employeeName);

    const messageArea = document.getElementById("messageArea");
    messageArea.textContent = "Adding employee...";

    const data = await fetchData(
      "http://localhost/_projects/03_transapp_backend/add_employee.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeName: employeeName,
        }),
      }
    );

    if (data.status === "success") {
      console.log(data.message.value);
      messageArea.textContent = data.message;
    } else {
      console.log(
        "Employee add unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  });
