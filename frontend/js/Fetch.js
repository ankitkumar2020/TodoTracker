async function getData() {
  try {
    let res = await fetch("http://localhost:8081/notes");
    let jsonData = await res.json();
    return jsonData;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
}

async function deleteNote(url) {
  try {
    let res = await fetch(url, { method: "DELETE" });
  } catch (e) {
    console.log(e);
  }
}

async function updateNote(url, data) {

  try {
    console.log(JSON.stringify(data));
    let res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
}

export { deleteNote, updateNote };
export { getData };
