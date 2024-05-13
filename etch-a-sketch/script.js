let gridSize;
const button = document.querySelector(".button");
const container = document.querySelector(".container");

button.addEventListener("click", onPress);

function onPress() {
 

  gridSize = prompt("How many squares per side? (Maximum: 100)");
  gridSize = parseInt(gridSize);

   if (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
     alert("Please enter a valid number between 1 and 100.");
     return;
   }
  
  createGrid(gridSize);

  // Select squares after grid creation
  const squares = document.querySelectorAll(".square");

  // Add event listeners to grid squares
  squares.forEach((square) => {
    square.addEventListener("mouseenter", handleMouseEnter);
    square.addEventListener("mouseleave", handleMouseLeave);
  });
}

// creating grid function
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

// creating hover effects
function handleMouseEnter() {
  this.classList.add("hovered");
  console.log("enter");
}

function handleMouseLeave() {
  this.classList.remove("hovered");
  console.log("exit");
}
