document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "http://localhost/_projects/transapp_backend/login/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // Login was successful
        console.log("Logged in!");
        window.location.href = "../employee_management/employee.html";
      } else {
        // Login failed
        console.log("Login failed. ", data.status, " ", data.message);
        let messageDiv = document.getElementById("message");
        messageDiv.innerText = "Login failed: " + data.message;
        messageDiv.style.color = "red";
        messageDiv.style.fontWeight = "bold";
      }
    } catch (error) {
      console.error("Error:", error);
      let messageDiv = document.getElementById("message");
      messageDiv.innerText = "An error occurred: " + error;
      messageDiv.style.color = "red";
      messageDiv.style.fontWeight = "bold";
    }
  });
