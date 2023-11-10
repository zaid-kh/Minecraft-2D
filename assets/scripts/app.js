const grid = document.getElementById("grid");
const tools = document.getElementById("tools");

const shovel = document.getElementById("shovel");
const axe = document.getElementById("axe");
const pickaxe = document.getElementById("pickaxe");

const dirtSquare = document.getElementById("dirt");
const rockSquare = document.getElementById("rock");
const grassSquare = document.getElementById("grass");
const leafSquare = document.getElementById("leaf");
const woodSquare = document.getElementById("wood");
const inventoryElement = document.getElementById("inv");

const dirtCounter = document.getElementById("dirt-counter");
const rockCounter = document.getElementById("rock-counter");
const grassCounter = document.getElementById("grass-counter");
const woodCounter = document.getElementById("wood-counter");
const leafCounter = document.getElementById("leaf-counter");

let currentTile = null;
const inventory = {
  dirt: 0,
  rock: 0,
  grass: 0,
  wood: 0,
  leaf: 0,
};

const numRows = 5; // Number of rows
const numCols = 12; // Number of columns

const gridSize = 100; // New size for each square in pixels

function gridSizeStyle(numCols, numRows, gridSize) {
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${numCols}, ${gridSize}px)`;
  grid.style.gridTemplateRows = `repeat(${numRows}, ${gridSize}px)`;
}
function createDynamicGrid(numRows, numCols, gridSize) {
  const gridData = [];

  gridSizeStyle(numCols, numRows, gridSize);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.id = `${i}-${j}`;
      grid.appendChild(gridItem);

      gridData.push(gridItem);
    }
  }
  return gridData;
}
const gridData = createDynamicGrid(numRows, numCols, gridSize);

function createGridColors() {
  for (let g = 0; g < gridData.length; g++) {
    let [i, j] = gridData[g].getAttribute("id").split("-");
    drawRed(Number(i), Number(j), Number(g));
    drawBlue(Number(i), Number(j), Number(g));
    drawGreen(Number(i), Number(j), Number(g));
  }
}

createGridColors();

function drawRed(i, j, g) {
  if (i === 0 && j >= 0) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "red";
  }
  if (i === 4 && j <= 11) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "red";
  }
  if (i >= 0 && j === 0) {
    gridData[g].style.backgroundColor = "red";
  }
  if (i >= 0 && j === 11) {
    gridData[g].style.backgroundColor = "red";
  }
}
function drawBlue(i, j, g) {
  if (i > 0 && i < 4 && j > 0 && j < 4) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "blue";
  }
  if (i === 2 && j === 2) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "green";
  }

  if (i > 0 && i < 4 && j > 4 && j < 8) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "blue";
  }
  if (i === 2 && j === 6) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "green";
  }
}
function drawGreen(i, j, g) {
  if (i > 0 && i < 4 && j > 7 && j < 11) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "green";
  }
  if (i === 2 && j === 9) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "yellow";
  }
  if (i > 0 && i < 4 && j === 4) {
    // gridData[g].classList.add("red")
    gridData[g].style.backgroundColor = "yellow";
  }
}

dirtSquare.classList.add("dirt");
rockSquare.style.backgroundColor = "blue";
grassSquare.style.backgroundColor = "green";

function updateCounters() {
  dirtCounter.textContent = inventory.dirt;
  rockCounter.textContent = inventory.rock;
  grassCounter.textContent = inventory.grass;
}

function highLightColor(color) {
  color.style.border = "yellow";
  color.style.borderStyle = "solid";
  color.style.borderWidth = "2px";
}
function removeHighLightColor(color) {
  color.style.border = "#ccc";
  color.style.borderStyle = "solid";
  color.style.borderWidth = "1px";
}

tools.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "eraser") {
    currentTile = "eraser";
    selectColor("eraser", shovel);
  }
  if (target === "whiteboard") {
    currentTile = "whiteboard";
    selectColor("whiteboard", axe);
  }
  // e.stopPropagation(); // Prevent the click event from bubbling
});

// ! inv event listner
// highlight color on select
function selectColor(target, colorSquare, inventoryColor) {
  removeHighLightColor(dirtSquare);
  removeHighLightColor(grassSquare);
  removeHighLightColor(rockSquare);
  removeHighLightColor(shovel);
  removeHighLightColor(axe);
  highLightColor(colorSquare);

  if (inventoryColor > 0) {
    currentTile = target;
  }
}
inventoryElement.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "red") {
    selectColor("red", dirtSquare, inventory.dirt);
  } else if (target === "green") {
    selectColor("green", grassSquare, inventory.grass);
  } else if (target === "blue") {
    selectColor("blue", rockSquare, inventory.rock);
  }
});

// placing items
grid.addEventListener("click", (event) => {
  const gridItem = event.target;
  if (currentTile === "eraser") {
    const itemColor = gridItem.style.backgroundColor;
    if (itemColor === "blue" || itemColor === "green") {
      gridItem.style.backgroundColor = "white";
      if (itemColor === "blue") {
        inventory.rock++;
      } else if (itemColor === "green") {
        inventory.grass++;
      }
      updateCounters();
    }
  } else if (currentTile === "whiteboard") {
    const itemColor = gridItem.style.backgroundColor;
    if (itemColor === "red") {
      gridItem.style.backgroundColor = "white";
      inventory.dirt++;
      updateCounters();
    }
  } else if (currentTile) {
    const itemColor = gridItem.style.backgroundColor;
    if (itemColor === "white") {
      if (inventory[currentTile] > 0) {
        gridItem.style.backgroundColor = currentTile;
        inventory[currentTile]--;
        updateCounters();
      }
    }
  }
});

updateCounters();
