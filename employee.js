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
  manageButton.addEventListener("click", function () {
    console.log(`Manage button clicked for employee ${employee.id}`);
  });

  listItem.appendChild(manageButton);

  return listItem;
}

// Fetch employees and update the UI
fetchData("http://localhost/03_trans_app_backend/get_employees.php", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((employees) => {
    console.log(employees);

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
      "http://localhost/03_trans_app_backend/add_employee.php",
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
