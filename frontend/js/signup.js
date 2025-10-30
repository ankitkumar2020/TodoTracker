let isLogged = localStorage.getItem("isLogged");

if (isLogged == "true") {
  window.location.replace("./index.html");
}

let form = document.getElementById("signup-form");

form.addEventListener("submit", () => {
  event.preventDefault();
  let formData = new FormData(form);

  localStorage.getItem("user");

  let userDetails = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    about: formData.get("about"),
  };

  console.log(userDetails);
  if (
    userDetails.name.length > 0 &&
    userDetails.email.length > 0 &&
    userDetails.phone.length > 0 &&
    userDetails.about.length > 0
  ) {
    let str = JSON.stringify(userDetails);
    localStorage.setItem("user", str);
    localStorage.setItem("isLogged", true);

    //location = `./index.html?user=${str}`;
    location.replace(`./index.html`);
  }
});
