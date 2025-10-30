let errorEl = document.createElement("div");
let userDetailsSection = document.getElementById("user-details");
errorEl.setAttribute("id", "errorEl");
errorEl.innerText = "Invalid Credential provided.";

let form = document.getElementById("login-form");

form.addEventListener("submit", () => {
  event.preventDefault();

  let form_data = new FormData(form);

  let email = form_data.get("email");
  let password = form_data.get("password");

  console.log(email, password);

  let user = localStorage.getItem("user");

  if (user != null) {
    user = JSON.parse(user);
    console.log(user);
    let userEmail = user.email;
    let userPassword = user.password;

    if (userEmail == email && password == userPassword) {
      location = "./index.html";
      localStorage.setItem("isLogged", true);
    } else {
      userDetailsSection.append(errorEl);
    }
  } else {
    errorEl.innerText = "No user found. Make sure you have created an account.";
    userDetailsSection.append(errorEl);
  }
});

form.addEventListener("reset", () => {
  errorEl.remove();
});
