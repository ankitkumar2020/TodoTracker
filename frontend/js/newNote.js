
export default  function getNote(el){
    let innerHTML = `
    <div class="dropdown-btn">
     <ul class="dropdown" >
       <li id="option-edit-${el.id}" ><span><img src="../src/assets/edit.svg"/></span>Edit</li>
       <li id="option-delete-${el.id}"><span><img src="../src/assets/delete.svg"/></span>Delete</li>  
     </ul>
    </div>
    <div class="note-wrapper"  id=${el.id}>
            <a >
              <div class="note">
                <p class="note-title">${el.title}</p>
                <p class="created-date">Created At: <span title="date of creation">${el.createdAt}</span></p>
                <p class="note-desc">${el.desc}</p>
                <p class="due-date">Due At: <span title="deadline">${el.dueAt}</span></p>
                <div class="checkbox-container">
                  <input type="checkbox"> Mark Done ?
                </div>
              </div>
            </a>
    </div>`;

    return innerHTML;
}
