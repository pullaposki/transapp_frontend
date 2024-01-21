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

  const manageClick = async function () {
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

      manageButton.textContent = "Close";
      manageButton.removeEventListener("click", manageClick);

      const manageArea = createManageArea();

      const closeClick = function () {
        console.log("Close button clicked");
        listItem.removeChild(manageArea);
        manageButton.textContent = "Manage";
        manageButton.removeEventListener("click", closeClick);

        manageButton.addEventListener("click", manageClick);
      };

      manageButton.addEventListener("click", closeClick);

      function createManageArea() {
        const manageArea = document.createElement("div");

        const br1 = document.createElement("br");
        manageArea.appendChild(br1);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = data.message.first_name;
        manageArea.appendChild(nameInput);

        const updateButton = document.createElement("button");
        updateButton.textContent = "update";

        updateButton.addEventListener("click", async function () {
          const data = await fetchData(
            `http://localhost/_projects/03_transapp_backend/update_employee.php`,
            {
              method: "PUT", // Changed from "POST" to "PUT"
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                employeeId: employee.id,
                employeeName: nameInput.value,
              }),
            }
          );

          if (data.status === "success") {
            console.log(data.message.value);
            messageArea.textContent = data.message;

            // Update the listItem text content and nameInput value
            listItem.textContent = `${nameInput.value} (ID: ${employee.id})`;
            nameInput.value = nameInput.value;
          } else {
            console.log(
              "Employee update unsuccessful. ",
              data.status,
              " ",
              data.message
            );
          }
        });

        manageArea.appendChild(updateButton);
        const br2 = document.createElement("br");
        manageArea.appendChild(br2);

        const br3 = document.createElement("br");
        manageArea.appendChild(br3);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        manageArea.appendChild(deleteButton);

        const hr = document.createElement("hr");
        manageArea.appendChild(hr);

        listItem.appendChild(manageArea);

        return manageArea;
      }
    } else {
      console.log(
        "Employee id get unsuccessful. ",
        data.status,
        " ",
        data.message
      );
    }
  };

  manageButton.addEventListener("click", manageClick);

  listItem.appendChild(manageButton);

  return listItem;
}

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

function getAndRenderAllEmployees() {
  fetchData(
    "http://localhost/_projects/03_transapp_backend/get_employees.php",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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
}

getAndRenderAllEmployees();
