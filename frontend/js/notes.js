

let url = location.search //gives url

console.log(url);

let urlString = new URLSearchParams(url);
let title = urlString.get('title');
let desc = urlString.get('desc');
let dueAt = urlString.get('dueAt');
let creAt = urlString.get('creDate');

let titleText = document.getElementById("title-text");
let descText = document.getElementById("desc-text");
let creDate = document.getElementById("date-cre");
let dueDate = document.getElementById("date-due");




titleText.innerText = title;
descText.innerText = desc;
dueDate.innerText = dueAt;
creDate.innerText = creAt;

//Change Page Title
document.title = `${title}`;
//Change Favicon
let Favicon = document.getElementById("favicon");
Favicon.setAttribute("href","https://www.svgrepo.com/show/498249/note.svg");


//night mode

let body = document.getElementById("body");
//Toggle Theme

let currentTheme = localStorage.getItem('theme');
console.log(currentTheme);

if(currentTheme=='dark'){
  body.classList.toggle("dark");
}

//nav animation 


