      num++;

      AddNote(el.id, el.title, el.desc, el.dueAt, el.createdAt);
       //newNote.innerHTML = getNote(e);

      nothingImg.style.display = "none";

      let options = newNote.querySelector("ul");
      // console.log(options);
      //Edit

      let editBtn = options.firstElementChild;
      editBtn.addEventListener("click", () => {
        editor_container.style.display = "block";
        touchedId = el.id;
      });
      let closeEdit = editor_container.firstElementChild;
      closeEdit.addEventListener("click", () => {
        editor_container.style.display = "none";
      });

      //Delete
      let deleteBtn = options.lastElementChild;
      deleteBtn.addEventListener("click", () => {
        axios
          .delete("http://localhost:8081/del/" + el.id)
          .then((res) => {
            newNote.remove();
            console.log(res);
            num--;
            console.log(num);
            if (num == 0) {
              nothingImg.style.display = "block";
            }
          })
          .catch((e) => {
            {
              console.log(e);
            }
          });
      });