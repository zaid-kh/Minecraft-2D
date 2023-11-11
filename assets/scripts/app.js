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

const resetButton = document.getElementById("reset");

let currentTile = null;
const inventory = {
  dirt: 0,
  rock: 0,
  grass: 0,
  wood: 0,
  leaf: 0,
};

const ROWS = 15; // Number of rows
const COLUMNS = 30; // Number of columns
const SQUARE_SIZE = 30; // grid-item size in pixels

let gridData = [];

function resetWorld() {
  // reset grid
  grid.innerHTML = "";
  gridData = createDynamicGrid();
  drawGridTiles();
  // ! might cause issue since it's a constant
  // reset items
  inventory.dirt = 0;
  inventory.rock = 0;
  inventory.grass = 0;
  inventory.wood = 0;
  inventory.leaf = 0;
  updateCounters();
  currentTile = null;
  select();
}

//
function createGridTemplate() {
  grid.style.gridTemplateColumns = `repeat(${COLUMNS}, ${SQUARE_SIZE}px)`;
  grid.style.gridTemplateRows = `repeat(${ROWS}, ${SQUARE_SIZE}px)`;
}
function createDynamicGrid() {
  createGridTemplate();

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.id = `${i}-${j}`;
      grid.appendChild(gridItem);
      gridData.push(gridItem);
    }
  }
  return gridData;
}
gridData = createDynamicGrid();

function drawGridTiles() {
  for (let g = 0; g < gridData.length; g++) {
    let [i, j] = gridData[g].getAttribute("id").split("-");
    drawDirt(Number(i), Number(j), Number(g));
    drawGrass(Number(i), Number(j), Number(g));
    drawTree(Number(i), Number(j), Number(g));
    drawRocks(Number(i), Number(j), Number(g));
  }
}

drawGridTiles();

// Draw dirt
function drawDirt(i, j, g) {
  if (i <= 14 && i > 11 && j >= 0) {
    gridData[g].classList.add("dirt");
  }
}

function drawGrass(i, j, g) {
  if (i == 11 && j >= 0) {
    gridData[g].classList.add("grass");
  }
}
function drawTree(i, j, g) {
  /**tree 1 */
  // drawing tree leaves
  if (i > 4 && i < 8 && j > 5 && j < 9) {
    gridData[g].classList.add("leaf");
  }
  // drawing tree trunk
  if (i > 7 && i < 11 && j === 7) {
    gridData[g].classList.add("wood");
  }
  /**tree 2 */
  // drawing tree leaves
  if (i > 4 && i <= 8 && j > 22 && j < 26) {
    gridData[g].classList.add("leaf");
  }
  // drawing tree trunk
  if (i > 8 && i < 11 && j === 24) {
    gridData[g].classList.add("wood");
  }
}
function drawRocks(i, j, g) {
  // drawing rocks on the side
  if (i > 8 && i < 11 && j === 3) {
    gridData[g].classList.add("rock");
  }
  // drawing pile of rocks
  if (i == 10 && j > 14 && j < 20) gridData[g].classList.add("rock");
  if (i == 9 && j > 15 && j < 19) gridData[g].classList.add("rock");
  if (i == 8 && j == 17) gridData[g].classList.add("rock");
}

function updateCounters() {
  dirtCounter.textContent = inventory.dirt;
  rockCounter.textContent = inventory.rock;
  grassCounter.textContent = inventory.grass;
  woodCounter.textContent = inventory.wood;
  leafCounter.textContent = inventory.leaf;
}

function highlightSelection(element) {
  element.style.border = "yellow";
  element.style.borderStyle = "solid";
  element.style.borderWidth = "2px";
}
function removeHighlightSelection(element) {
  element.style.border = "#ccc";
  element.style.borderStyle = "solid";
  element.style.borderWidth = "1px";
}

tools.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "shovel") {
    currentTile = "shovel";
    select("shovel", shovel);
  }
  if (target === "axe") {
    currentTile = "axe";
    select("axe", axe);
  }
  if (target === "pickaxe") {
    currentTile = "pickaxe";
    select("pickaxe", pickaxe);
  }
  // e.stopPropagation(); // Prevent the click event from bubbling
});

// ! inv event listner
/**  highlight selected tool/tile */
function select(target, appropriateElement, inventoryTile) {
  // todo: remove whatever is selected because of redundancy
  removeHighlightSelection(dirtSquare);
  removeHighlightSelection(grassSquare);
  removeHighlightSelection(rockSquare);
  removeHighlightSelection(woodSquare);
  removeHighlightSelection(leafSquare);
  removeHighlightSelection(shovel);
  removeHighlightSelection(axe);
  removeHighlightSelection(pickaxe);
  if (appropriateElement) highlightSelection(appropriateElement);

  if (inventoryTile > 0) {
    currentTile = target;
  }
}

inventoryElement.addEventListener("click", (e) => {
  const target = e.target.id;

  if (target === "dirt") {
    select("dirt", dirtSquare, inventory.dirt);
  } else if (target === "grass") {
    select("grass", grassSquare, inventory.grass);
  } else if (target === "rock") {
    select("rock", rockSquare, inventory.rock);
  } else if (target === "wood") {
    select("wood", woodSquare, inventory.wood);
  } else if (target === "leaf") {
    select("leaf", leafSquare, inventory.leaf);
  }
});

grid.addEventListener("click", (e) => {
  const gridItem = e.target;
  /** dirt/ grass/ rock/ wood/ leaf/ cloud/ undefined(sky) */
  const itemTile = gridItem.classList[1];
  console.log("itemTile: ", itemTile);
  // using tools
  //* if SHOVEL -> dirt/ grass
  if (
    currentTile === "shovel" &&
    (itemTile === "grass" || itemTile === "dirt")
  ) {
    // remove block
    gridItem.classList.remove(itemTile.toString());
    // increment in inventory
    inventory[itemTile]++;
    console.log("inventory: ", inventory);
  }
  //* if AXE -> wood/ leaves
  if (currentTile === "axe" && (itemTile === "wood" || itemTile === "leaf")) {
    // remove block
    gridItem.classList.remove(itemTile.toString());
    // increment in inventory
    inventory[itemTile]++;
    console.log("inventory: ", inventory);
  }
  //* if PICKAXE -> rock
  if (currentTile === "pickaxe" && itemTile === "rock") {
    // remove block
    gridItem.classList.remove(itemTile.toString());
    // increment in inventory
    inventory[itemTile]++;
    console.log("inventory: ", inventory);
  }
  // todo: add selection of tiles
  // if currentTile === dirt ==> ....
  updateCounters();
});

updateCounters();
resetButton.addEventListener("click", resetWorld);
