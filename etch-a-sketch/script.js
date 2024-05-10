const container = document.querySelector(".container");

for (i = 0; i < 16 * 16; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}

const square = document.querySelector(".square");

function handleMouseEnter() {
  square.classList.add("hovered"); // Add a class to change the style on hover
  console.log("enter");
}

// Function to handle mouseleave event
function handleMouseLeave() {
  square.classList.remove("hovered"); // Remove the class when the mouse leaves
  console.log("exit");
}

square.addEventListener("mouseover", handleMouseEnter);
square.addEventListener("mouseout", handleMouseLeave);
