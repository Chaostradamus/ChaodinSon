export default class DOMController {
    constructor(humanPlayer, computerPlayer) {
        // Initialize game references
        this.human = humanPlayer;
        this.computer = computerPlayer;
        this.currentPlayer = 'human'; // human | computer
    
        // Bind methods to maintain 'this' context
        this.handleAttack = this.handleAttack.bind(this);
        this.computerTurn = this.computerTurn.bind(this);
      }
      init() {
        this.renderBoards(); // Draw both boards
        this.updateMessage("Your turn - Attack enemy waters!");
      }
      
      renderBoard(gameboard, elementId, isClickable) {
        const boardElement = document.getElementById(elementId);
        boardElement.innerHTML = ''; // Clear old cells
      
        // Build 10x10 grid
        for (let y = 0; y < 10; y++) {
          for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;  // Store coordinates
            cell.dataset.y = y;
      
            // Only make computer's board clickable during human turn
            if (isClickable && this.currentPlayer === 'human') {
              cell.addEventListener('click', this.handleAttack);
            }
      
            // Style based on game state (hit/miss/ship)
            this.styleCell(cell, gameboard, x, y);
            boardElement.appendChild(cell);
          }
        }
      }
}