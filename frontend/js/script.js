import { data } from "./Data.js";
import { currentDate } from "./DateClass.js";
import getNote from "./newNote.js";

let isLogged = localStorage.getItem("isLogged");

if (isLogged != "true") {
  location = "./login.html";
}

let num = 0;
let touchedId;
let body = document.getElementById("body");
let isdark = false;
let modeBtn = document.getElementById("mode-img");
let editor_container = document.getElementById("editor");
let notesContainer = document.getElementById("notes-wrapper");
let notes = document.querySelectorAll(".note-wrapper");
let feedBack = document.getElementById("feedback-res");
let addBtn = document.getElementById("add-note");
let closeBtn = document.getElementById("close-btn");
let navbar = document.getElementById("navbar");
let form_container = document.getElementById("form-container");
let closeEditorBtn = document.getElementById("close-btn-editor");
let cancelEditorBtn = document.getElementById("cancel-editor");
let name = document.getElementById("user-title");

//Change Favicon
let Favicon = document.getElementById("favicon");

let username = JSON.parse(localStorage.getItem("user"))["name"] || "Geek";
let email = JSON.parse(localStorage.getItem("user"))["email"] || "xyz-1234-*&";
name.innerText = `Hey 👋, ${username}`;

let btnNothing = document.getElementById("btn-add-nothing");
btnNothing.addEventListener("click", () => {
  addBtn.click();
});

console.log(history);
// Favicon.setAttribute(
//   "href",
//   "https://www.svgrepo.com/show/529022/home-smile-angle.svg"
// );
//load auth details

// Event listeners and API calls go here

Array.from(data).forEach((el) => {
  let newNote = document.createElement("div");
  newNote.innerHTML = getNote(el);
  notesContainer.appendChild(newNote);
  toggleNothing(++num);

  let deleteBtn = document.getElementById(`option-delete-${el.id}`);
  let editBtn = document.getElementById(`option-edit-${el.id}`);
  deleteBtn.addEventListener("click", () => {
    let consent = confirm(`⚠️ Do you want to delete this note ? 
    ${el.title}`);

    if (consent) {
      axios.delete(`http://localhost:8081/del/${el.id}`);
      newNote.remove();
      feedBack.style.visibility = "visible";

      setTimeout(() => {
        feedBack.style.visibility = "collapse";
      }, 1000);
    }
  });

  editBtn.addEventListener("click", () => {
    editor_container.style.display = "block";

    setTimeout(() => {
      editNote(el);
    }, 1000);
  });

  //Handle onclick on note card
  let noteCard = document.getElementById(`${el.id}`);

  noteCard.addEventListener("click", () => {
    noteCard.style.scale = "1.05";
    let data = {
      title: el.title || "",
      dueAt: el.dueAt || "",
      desc: el.desc || "",
      creDate: el.createdAt || "",
    };

    let url = window.location.hostname;

    let query = new URLSearchParams(data).toString();

    setTimeout(() => {
      // window.location = `${url}/note.html?${query}`;
      location = `./note.html?${query}`;
    }, 1000);
  });
});
cancelEditorBtn.addEventListener("click", closeEdiorForm);

addBtn.addEventListener("click", () => {
  form_container.style.display = "block";
  console.log("showed");
  createNewNote();
});

closeBtn.addEventListener("click", closeForm);
closeEditorBtn.addEventListener("click", closeEdiorForm);

//Edit note 📝

function editNote(el) {
  let save_edit = document.getElementById("save-edit");
  let editName = document.getElementById("title-ed");
  let editDate = document.getElementById("dueAt-ed");
  let editDesc = document.getElementById("desc-ed");

  editName.value = el.title || "";
  editDate.value = el.dueAt || "";
  editDesc.value = el.desc || "";
  console.log(editName);

  save_edit.addEventListener("click", (e) => {
    console.log(editDate);
    e.preventDefault();

    e.preventDefault();
    if (editDate.value >= currentDate) {
      if (editName.value || editDate.value || editDesc.value) {
        touchedId = el.id;
        let reqNote = {
          title: editName.value,
          dueAt: editDate.value,
          desc: editDesc.value,
        };
        axios
          .patch(`http://localhost:8081/update?id=${touchedId}`, reqNote)
          .then((res) => {
            console.log(res.data);

            feedBack.style.visibility = "visible";

            setTimeout(() => {
              location.reload();
            }, 2000);
            form_container.style.display = "none";
            editor_container.style.display = "none";
            console.log(reqNote);
          });
        closeForm();
      }
    } else {
      alert("📅 Date should be of present of future.");
    }
  });
}

//Create a new note 📝
function createNewNote() {
  let saveNewNote = document.getElementById("note-form-btn");
  saveNewNote.addEventListener("click", () => {
    event.preventDefault();
    let registerForm = document.getElementById("form1");
    let formData = new FormData(registerForm);

    let title, desc, dueAt;
    title = formData.get("title");
    desc = formData.get("desc");
    dueAt = formData.get("dueAt");
    console.log(title, desc, dueAt);

    if (title.length != 0 && desc.length != 0 && dueAt.length != 0) {
      if (currentDate <= dueAt) {
        let data = {
          title: title,
          desc: desc,
          dueAt: dueAt,
        };

        let newNote = document.createElement("div");
        newNote.innerHTML = getNote({ title: title, desc: desc, dueAt: dueAt });
        notesContainer.appendChild(newNote);
        toggleNothing(++num);

        form_container.style.display = "none";
        axios
          .post(`http://localhost:8081/register`, data)
          .then((res) => {
            console.log(res.data);

            num++;
            if (num > 0) {
              nothingImg.style.display = "none";
            }
            setTimeout(() => {
              location.reload();
            }, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("You worngly chose a past date for your future plan.🧐");
      }
      closeForm();
    } else {
      alert("Make sure you fill all the fields.📄✅");
    }
  });
}
//🔒 Close the form
function closeForm() {
  form_container.style.display = "none";
}

function closeEdiorForm() {
  editor_container.style.display = "none";
}

//🗑️ Toggle nothing
function toggleNothing(num) {
  let nothingImg = document.getElementById("nothing_img");

  if (num > 0) {
    nothingImg.style.display = "none";
  } else {
    nothingImg.style.display = "block";
  }
}

//nav - scroll aniamtion

let note_Add_text = document.getElementById("add-note-span");
window.addEventListener("scroll", () => {
  let scrolly = window.scrollY;
  if (scrolly > 44) {
    note_Add_text.style.display = "none";
    addBtn.style.paddingLeft = "30px";

    navbar.style.textAlign = "start";
    navbar.style.backgroundColor = "var(--main-color)";
    navbar.style.boxShadow = "0px 0px 2px var(--main-color)";
  } else {
    navbar.style.textAlign = "center";
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "unset";
    note_Add_text.style.display = "block";
    addBtn.style.paddingLeft = "20px";
  }
});

//Load Theme from Local Storage

const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
  body.classList.toggle("dark");
}

let resource =
  currentTheme == "dark" ? "../src/assets/sun2.svg" : "../src/assets/dark.svg";

modeBtn.setAttribute("src", resource);

//🌓 Toggle Theme
modeBtn.addEventListener("click", (e) => {
  resource =
    localStorage.getItem("theme") == "dark"
      ? "../src/assets/dark.svg"
      : "../src/assets/sun2.svg";
  modeBtn.setAttribute("src", resource);
  body.classList.toggle("dark");
  const theme2 = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme2);
});

//log-out
let logOut = document.getElementById("log-out");

logOut.addEventListener("click", () => {
  let check = confirm("Are you sure ? You'll log out.");

  if (check) {
    alert("You Logged Out SuccesFully✅");
    localStorage.setItem("isLogged", "false");
    setTimeout(() => {
      window.location.replace("./login.html");
    }, 2000);
  }
});

//delete account

const alertTrigger = document.getElementById("delete-acc");

alertTrigger.addEventListener("click", () => {
  let del = confirm(
    "🔴 Do you want to delete your account? This can not be recovered."
  );
  if (del) {
    let string = `${email}`;
    let string2 = prompt(`Enter ${string} below to delete your account.`);
    if (string === string2) {
      localStorage.removeItem("user");
      localStorage.removeItem("isLogged");
      location = "./";
    }
  }
});
