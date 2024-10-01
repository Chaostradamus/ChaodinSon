const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

let addModal = document.getElementById("addModal");
let closeButton = document.getElementById("close");
let addButton = document.getElementById("add");

// document.getElementById("addModal").addEventListener("click", function () {
//   document.getElementById("modal").style.display = "flex";
// });

// document.getElementById("close").addEventListener("click", function () {
//   document.getElementById("modal").style.display = "none";
// });

addModal.addEventListener("click", function () {
  document.querySelector(".modal").style.display = 'flex'
});
