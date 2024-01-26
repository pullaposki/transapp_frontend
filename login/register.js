let messageDiv = document.createElement("div");
document.body.appendChild(messageDiv);

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!validationOK()) return;

    try {
      let response = await fetch(
        "http://localhost/_projects/transapp_backend/login/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
          }),
        }
      );

      let data = await response.json();

      if (data.status === "success") {
        messageUser(
          "Registration successful. Redirecting to login page...",
          "success"
        );

        disableForm();

        setTimeout(function () {
          window.location.href = "../login.html";
        }, 1000);
      } else {
        console.log("Registration failed. ", data.status, " ", data.message);
        console.log(data);

        messageUser("Registration failed. " + data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      messageUser("An error occurred: " + error, "error");
    }

    function disableForm() {
      document.getElementById("firstName").disabled = true;
      document.getElementById("lastName").disabled = true;
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("registerButton").disabled = true;
    }

    function messageUser(message, type) {
      messageDiv.innerText = message;

      // Reset styles
      messageDiv.style.color = "";
      messageDiv.style.fontWeight = "";

      if (type === "error") {
        messageDiv.style.color = "red";
        messageDiv.style.fontWeight = "bold";
      } else if (type === "success") {
        messageDiv.style.color = "green";
      } else {
        messageDiv.style.color = "black";
      }
    }

    function validationOK() {
      if (!firstName || !lastName || !username || !password) {
        messageUser("All fields are required.", "error");
        return;
      }
      if (
        !/^[a-zA-Z-' ]*$/.test(firstName) ||
        !/^[a-zA-Z-' ]*$/.test(lastName)
      ) {
        messageUser(
          "First and last names can only contain letters, hyphens, apostrophes, and spaces.",
          "error"
        );
        return false;
      }
      if (firstName.length < 2) {
        messageUser("First name too short.", "error");
        return false;
      }
      if (lastName.length < 2) {
        messageUser("Last name too short", "error");
        return false;
      }
      if (username.length < 4) {
        messageUser("Username too short", "error");
        return false;
      }
      if (password.length < 4) {
        messageUser("Password too short", "error");
        return false;
      }
      return true;
    }
  });
