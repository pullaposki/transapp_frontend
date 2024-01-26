document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //TODO: validate input

    fetch("http://localhost/_projects/transapp_backend/login/register.php", {
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
    })
      .then((response) => response.json())
      .then((data) => {
        debugger;
        if (data.status === "success") {
          console.log("Registered!");
          window.location.href = "./login.html";
        } else {
          // Registration failed
          console.log("Registration failed. ", data.status, " ", data.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
