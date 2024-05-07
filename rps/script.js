const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");

const result = document.querySelector(".result");
const win = document.querySelector(".win");

let playerChoice = "";
let cpuChoice = "";
let playerScore = 0;
let cpuScore = 0;

const rockPick = rock.addEventListener("click", () => {
  // Function to be executed when the button is clicked
  playerChoice = "rock";
  cpuChoice = getCompChoice();
  if (cpuChoice === "rock") {
    result.textContent = "it's a tie";
  } else if (cpuChoice === "scissors") {
    playerScore++;
    result.textContent = "you won!";
  } else {
    cpuScore++;
    result.textContent = "you lose!";
  }
  checkScore();
  console.log(playerScore + "" + cpuScore);
});

const paperPick = paper.addEventListener("click", () => {
  playerChoice = "paper";
  cpuChoice = getCompChoice();
  if (cpuChoice === "rock") {
    playerScore++;
    result.textContent = "You win!";
  } else if (cpuChoice === "scissors") {
    cpuScore++;
    result.textContent = "You lose!";
  } else {
    result.textContent = "It's a tie!";
  }
  checkScore();
  console.log(playerScore + " " + cpuScore);
});

const scissorPick = scissor.addEventListener("click", () => {
  playerChoice = "scissors";
  cpuChoice = getCompChoice();
  if (cpuChoice === "rock") {
    cpuScore++;
    result.textContent = "You lose!";
  } else if (cpuChoice === "scissors") {
    result.textContent = "It's a tie!";
  } else {
    playerScore++;
    result.textContent = "You win!";
  }
  checkScore();
  console.log(playerScore + " " + cpuScore);
});

// computer choice

function getCompChoice() {
  let cpuChoice;
  let num = Math.floor(Math.random() * 3);
  if (num === 0) {
    cpuChoice = "rock";
  } else if (num === 1) {
    cpuChoice = "scissors";
  } else {
    cpuChoice = "paper";
  }
  return cpuChoice;
}

function checkScore() {
  if (playerScore === 3) {
    win.textContent = "You win!";
    playerScore = 0;
    cpuScore = 0;
  } else if (cpuScore === 3) {
    win.textContent = "CPU wins, loser!";
    playerScore = 0;
    cpuScore = 0;
  } else {
    win.textContent = `Score: Player ${playerScore} - CPU ${cpuScore}`;
  }
}

// // cpu picks between rock paper or scissors
// // let playerChoice = prompt("Pick a play").toLowerCase().trim();

// function getCompChoice() {
//   let cpuChoice;
//   let num = Math.floor(Math.random() * 3);
//   if (num === 0) {
//     cpuChoice = "rock";
//   } else if (num === 1) {
//     cpuChoice = "scissors";
//   } else {
//     cpuChoice = "paper";
//   }
//   return cpuChoice;
// }

// // sims one round of game taking in player and cpu choice
// // case insensitive to choices
// // returns winner
// // function playRound(playerSelection, computerSelection) {
// //   let result;
// //   let playerChoice = prompt("Pick a play").toLowerCase().trim();
// //   playerSelection = playerChoice;
// //   computerSelection = getCompChoice();
// //   if (playerSelection === computerSelection) {
// //     result = "its a tie";
// //   } else if (
// //     (playerSelection === "rock" && computerSelection === "scissors") ||
// //     (playerSelection === "paper" && computerSelection === "rock") ||
// //     (playerSelection === "scissors" && computerSelection === "paper")
// //   ) {
// //     result = "you win!";
// //   } else {
// //     result = "you lose";
// //   }
// //   return (`"Player picked:" ${playerSelection} "cpu picked:" ${computerSelection} ", so the result is a" ${result}`);
// // }

// //plays 5 round game that keeps score and returns winner
// // display winner after each round
// let score = [0, 0];
// let winner;
// let result;
// let playerScore = 0;
// let cpuScore = 0;

// async function playSeries() {
//   while (playerScore < 3 && cpuScore < 3) {
//     await playRound();
//     if (playerScore === 3) {
//       console.log("a winner is you");
//     } else if (cpuScore === 3) {
//       console.log("cpu wins!");
//     }
//   }
//   function playRound(playerSelection, computerSelection) {
//     let playerChoice = prompt("Pick a play").toLowerCase().trim();
//     playerSelection = playerChoice;
//     computerSelection = getCompChoice();
//     if (playerSelection === computerSelection) {
//       result = "its a tie";
//     } else if (
//       (playerSelection === "rock" && computerSelection === "scissors") ||
//       (playerSelection === "paper" && computerSelection === "rock") ||
//       (playerSelection === "scissors" && computerSelection === "paper")
//     ) {
//       result = "you win!";
//       playerScore++;
//     } else {
//       result = "you lose";
//       cpuScore++;
//     }
//     return console.log(
//       `"Player picked:" ${playerSelection} "cpu picked:" ${computerSelection} ", so the result is a" ${result}`
//     );
//   }
// if ((playerScore = 3)) {
//   return console.log("a winner is you!");
// } else if ((cpuScore = 3)) {
//   return console.log("you lose!!");
// } else {
//   playRound();
// }
// }

// playSeries();
