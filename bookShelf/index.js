const myLibrary = [];

let addModal = document.getElementById("addModal");
let closeButton = document.getElementById("close");
let addButton = document.getElementById("add");

let cardContainer = document.querySelector(".card-container");

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  let cardContainer = document.querySelector(".card-container");

  cardContainer.innerHTML = "";
  // loop through and display items

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    // toggle buttton
    const toggle = document.createElement("button");
    toggle.textContent = "Did you read this";
    toggle.classList.add("toggle");

    toggle.addEventListener('click', function() {
      book.read = !book.read
      displayBooks()
    })

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    card.appendChild(deleteButton);
    card.appendChild(toggle);
    cardContainer.appendChild(card);
  });
}

const newBook = new Book("constantine", "j constantine", 666, true);
addBookToLibrary("constantine", "j constantine", 666, true);

displayBooks();

addModal.addEventListener("click", function () {
  document.querySelector(".modal").style.display = "flex";
});

closeButton.addEventListener("click", function () {
  document.querySelector(".modal").style.display = "none";
});

addButton.addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("myCheckbox").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  document.querySelector("modal").style.display = "none";
});
