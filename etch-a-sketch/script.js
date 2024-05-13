let gridSize;
const button = document.querySelector(".button");
const container = document.querySelector(".container");
let squares;

button.addEventListener("click", onPress);

function onPress() {
  gridSize = prompt("How many squares per side? (Maximum: 100)");
  gridSize = parseInt(gridSize);

  if (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  createGrid(gridSize);

  squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("mouseenter", handleMouseEnter);
    square.addEventListener("mouseleave", handleMouseLeave);
  });
}

function createGrid(gridSize) {
  container.innerHTML = "";
  const squareSize = 960 / gridSize;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    container.appendChild(square);
  }
}

function handleMouseEnter() {
  if (!this.classList.contains("permanent-hovered")) {
    this.classList.add("permanent-hovered");
  } else {
    this.classList.remove("permanent-hovered");
  }
}

function handleMouseLeave() {
  // No action needed on mouse leave
}
