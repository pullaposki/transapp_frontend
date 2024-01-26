document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch("http://localhost/03_trans_app_backend/login/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Login was successful
          console.log("Logged in!");
          window.location.href = "./employee.html";
        } else {
          // Login failed
          console.log("Login failed. ", data.status, " ", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
