const rls = require("readline-sync");
const fs = require("fs");

const gridText = fs.readFileSync("map.txt", "utf-8");
const gridRows = gridText.split("\r\n");
const validRowEntries = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const validColEntries = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const battleGrid = [];

for (const row of gridRows) {
  battleGrid.push(row.split(","));
}

console.log("LET'S PLAY BATTLESHIP!!");
console.log("You have 30 missiles to fire to sink all five ships", "\n");

const shipGrid = [
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const arrHitOrMiss = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

displayArray(arrHitOrMiss);
function displayArray(arrToDisplay) {
  console.log("   A B C D E F G H I J");
  for (let row = 0; row < arrToDisplay.length; row++) {
    for (let col = 0; col < arrToDisplay.length; col++) {
      if (col === 0) {
        const disNum = row + 1;
        process.stdout.write(disNum.toString());
        process.stdout.write("  ");
      } else {
        process.stdout.write(" ");
      }
      process.stdout.write(arrToDisplay[row][col].toString());
    }
    process.stdout.write("\n");
  }
}

function getUserInput() {
  let target = rls.question("Choose your target (Ex: A1): ");
  let inputarray = target.split("");
  let columnInput;
  let rowInput;

  if (inputarray.length === 3) {
    columnInput = inputarray[0];
    rowInput = 10;
  } else {
    columnInput = inputarray[0];
    rowInput = inputarray[1];
  }

  while (
    !validColEntries.includes(columnInput) ||
    !validRowEntries.includes(rowInput)
  ) {
    console.log(
      "Sorry, we only accept the following choices: ",
      validColEntries + validRowEntries
    );
    target = rls.question("Choose your target (Ex: A1): ");
    inputarray = target.split("");

    if (inputarray.length === 3) {
      columnInput = inputarray[0];
      rowInput = 10;
    } else {
      columnInput = inputarray[0];
      rowInput = inputarray[1];
    }
  }

  console.log("Number input:", rowInput, "Letter Input:", columnInput);
  return [rowInput, columnInput];
}

const MAX_TURNS = 30;
const TOTAL_SHIP_SEGMENTS = 17;
let currentTurn = 1;
let turnCountdown = MAX_TURNS;
let numHits = 0;

while (currentTurn <= MAX_TURNS) {
  arrRowCol = getUserInput();
  let col = arrRowCol[1];
  let row = arrRowCol[0];

  turnCountdown--;
  currentTurn++;

  if (shipGrid[parseInt(row - 1)][validColEntries.indexOf(col)] == 1) {
    const numCol = validColEntries.indexOf(col);
    arrHitOrMiss[row - 1][numCol] = 1;
    console.log("HIT!!!!");
    numHits++;
    arrHitOrMiss[row - 1][numCol] = "X";
    displayArray(arrHitOrMiss);
    if (numHits === TOTAL_SHIP_SEGMENTS) {
      console.log("YOU SUNK ALL MY BATTLESHIPS!");
      break;
    }
  } else {
    const numCol = validColEntries.indexOf(col);
    console.log("Miss");
    arrHitOrMiss[row - 1][numCol] = "O";
    displayArray(arrHitOrMiss);
  }
  console.log("You have " + turnCountdown + " missiles remaining.");

  if (turnCountdown == 0) {
    console.log("YOU RAN OUT OF AMMUNITION! GAME OVER!");
    break;
  }
}
