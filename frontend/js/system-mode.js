let body = document.getElementById("body");
let isLogged = localStorage.getItem('isLogged');

const isDark = matchMedia("(prefers-color-scheme:dark)").matches;

if (isDark) {
  console.log("Dark Mode");
  body.classList.toggle("dark");
} else {
  console.log("Light Mode");
}

if(isLogged=='true'){
    window.location.replace('./index.html');
    
}