/*
Crusader kings game where you have heirs and they die and you need to conquer the kingdom.
YOu have to click to get resources and make decisions.


-- MVP --
Screens
Map&battle screen/ Resources Screen/ Kings Court/ Family tree

Population, food, materials
Can name kingdom -- DONE
-Cannot name Kings, randomly generated -- DONE

some scripted experiences
random events
Decided how to determine if king is dead

conquer where you are at

--Later updates
Add crests
procedurally generate maps
you can die/succeeded by heir
Add ability to chose where people work
Add unit types
Add dropdown to show the breakdown of how food is being consumed
Add notification system
*/

//Add a feature at start where you pick your kingdom name/crest

//Dom Variables
const popValue = document.querySelector("#pop");
const foodValue = document.querySelector("#food");
const foodConsumedValue = document.querySelector("#food-consumed");
const matsValue = document.querySelector("#mats");
const popButton = document.querySelector("#pop-clicker");
const foodButton = document.querySelector("#food-clicker");
const matsButton = document.querySelector("#mats-clicker");
const nameInput = document.querySelector("#name-input");
const form = document.querySelector("#form");
const nameDiv = document.querySelector("#name");
const soldierValue = document.querySelector("#soldiers");
const trainButton = document.querySelector("#train-clicker");
const soldierCostValue = document.querySelector("#soldiers-cost");
const yearValue = document.querySelector("#year");
const currentKingValue = document.querySelector("#current-king");
const courtDisplay = document.querySelector("#court");
const familyTreeDiv = document.querySelector(".family-tree");

//Game variables / Starting
let familyTree = [
  {
    name: "Mika",
    reign: 23,
  },
];
//Index for familytree
let isTheKingDead = true; //Figure out ways to determine if king is dead
let currentKing = 0;
let year = 0;
let season = 1;
let pop = 0;
let food = 100;
let foodConsumed = 0;
let mats = 0;
let units = 0;
let soldierCost = {
  popCost: 1,
  foodCost: 2,
  matsCost: 2,
};

//Random Event Data
let randomEvent = [
  {
    name: "Earthquake",
    alert:
      "Suddenly, the walls of your mighty fortress rumble and the  ground begins to violently crack and shake, An EARTHQUAKE!",
    popHit: 100,
    matsHit: 500,
    foodHit: 50,
    unitHit: 50,
  },
  {
    name: "Plauge",
    alert:
      "In the blink of an eye, your population has been ravaged by an unkown force, You know a heavy sickness has been spreading among your people, A newfound plauge",
    popHit: 1000,
    foodHit: 500,
  },
  {
    name: "Volcanic Eruption",
    popHit: 250,
    alert:
      "The lonely volcano you have been eerily eyeing has decided to enact his rage upon your people today, Fire and brimstone blanket your city in turmoil. ",
    matsHit: 750,
    foodHit: 100,
    unitHit: 25,
  },
  {
    name: "Typhoon",
    alert:
      "The sky above you turns grey, As you peer out into the ocean you are horrified to see a tidal wave the size of a mountain hurdling towards your kindgom, you raise the bells and command your people to brace for impact.",
    popHit: 400,
    matsHit: 750,
    foodHit: 200,
    unitHit: 50,
  },
];

//Multipliers
let popMultiplier = pop * 0.015;

//Functions
//Checks if you have enough resources to buy a unit & buys unit
function buyUnit() {
  if (
    pop >= soldierCost.popCost &&
    food >= soldierCost.foodCost &&
    mats >= soldierCost.matsCost
  ) {
    pop -= soldierCost.popCost;
    food -= soldierCost.foodCost;
    mats -= soldierCost.matsCost;

    units += 1;
  }
}

//Updates UI on display
function updateUI() {
  popValue.innerText = `Population: ${pop}`;
  foodValue.innerText = `Food: ${food}`;
  matsValue.innerText = `Mats: ${mats}`;
  soldierValue.innerText = `Units: ${units}`;
  foodConsumedValue.innerText = `Food Consumed: ${foodConsumed}`;
  soldierCostValue.innerText = `Population Cost: ${soldierCost.popCost} \n Food Cost: ${soldierCost.foodCost} \n Material Cost: ${soldierCost.matsCost}  `;
}

//Hides functions on start and sets up game
function onStart() {
  pop = 2;
  foodValue.style.visibility = "hidden";
  foodConsumedValue.style.visibility = "hidden";
  foodButton.style.visibility = "hidden";
  matsButton.style.visibility = "hidden";
  matsValue.style.visibility = "hidden";
  updateUI();
}

//Displays resurces once you population hits a certain amount
function displayOtherResources() {
  if (pop >= 25) {
    foodValue.style.visibility = "visible";
    foodButton.style.visibility = "visible";
    foodConsumedValue.style.visibility = "visible";
    matsButton.style.visibility = "visible";
    matsValue.style.visibility = "visible";
  }
  //Add feature where you are slowly introduced to different game mechanics
}

//Random Event Generator
function randomEvents() {
  if (pop <= 500) {
    //Display type of disaster
    let disasterDisplay = randomEvent[0].name;
    const h1 = document.createElement("h1");
    h1.innerHTML = `${disasterDisplay}`;
    courtDisplay.appendChild(h1);
    //Numbers
    pop -= randomEvent[0].popHit;
    food -= randomEvent[0].foodHit;
    mats -= randomEvent[0].matsHit;
    units -= randomEvent[0].unitHit;
  }
  if (pop <= 2000) {
    //Display type of disaster
    let disasterDisplay = randomEvent[1].name;
    const h1 = document.createElement("h1");
    h1.innerHTML = `${disasterDisplay}`;
    courtDisplay.appendChild(h1);

    //Numbers
    pop -= randomEvent[1].popHit;
    food -= randomEvent[1].foodHit;
    mats -= randomEvent[1].matsHit;
    units -= randomEvent[1].unitHit;
  }
  if (pop <= 4000) {
    //Display type of disaster
    let disasterDisplay = randomEvent[2].name;
    const h1 = document.createElement("h1");
    h1.innerHTML = `${disasterDisplay}`;
    courtDisplay.appendChild(h1);

    //Numbers
    pop -= randomEvent[2].popHit;
    food -= randomEvent[2].foodHit;
    mats -= randomEvent[2].matsHit;
    units -= randomEvent[2].unitHit;
  }
  if (pop <= 5000) {
    //Display type of disaster
    let disasterDisplay = randomEvent[3].name;
    const h1 = document.createElement("h1");
    h1.innerHTML = `${disasterDisplay}`;
    courtDisplay.appendChild(h1);

    //Numbers
    pop -= randomEvent[3].popHit;
    food -= randomEvent[3].foodHit;
    mats -= randomEvent[3].matsHit;
    units -= randomEvent[3].unitHit1;
  }
}

//Determines how much food is consumed
function foodCalculator() {
  foodConsumed = (units + pop) / 10;
  if (food - foodConsumed >= 0) {
    food = Math.floor(food - foodConsumed);
    foodValue.style.color = "white";
  } else {
    food = 0;
    foodValue.style.color = "red";
  }
}

//Determines if people die due to starvation
function famineCalc() {
  if (food <= 0) {
    pop -= 1;
  }
}

//Family Tree
function displayFamilyTree() {
  //Displays current king on top
  currentKingValue.innerText = `King ${familyTree[currentKing].name} - ${familyTree[currentKing].reign}`;
  if (isTheKingDead) {
    let heirName = nextHeir();
    //Generates new object
    let newKingObj = { name: heirName, reign: 0 };
    familyTree.push(newKingObj);

    //Generates new h3 for family tree
    let h3 = document.createElement("h3");

    h3.innerHTML = `King ${familyTree[currentKing].name} - ${familyTree[currentKing].reign}`;
    familyTreeDiv.appendChild(h3);
    currentKing += 1;
    currentKingValue.innerText = `King ${familyTree[currentKing].name} - ${familyTree[currentKing].reign}`;

    //Resets king
    isTheKingDead = false;
  }
}

//Generates a new heir
function nextHeir() {
  let randomName = [
    "Amis",
    "Daw",
    "Col",
    "Elric",
    "Henry",
    "Firmin",
    "Hamo",
    "Ibb",
    "Judd",
    "Larkin",
    "Morris",
    "Noll",
    "Randel",
    "Rohese",
    "Wilkin",
    "Wymond",
    "Wyot",
  ];

  let random = Math.floor(Math.random() * randomName.length + 1);
  let name = randomName[random];

  return name;
}

//Increases Kings age
//Passes time with seasons and displays year
function seasonGenerator() {
  let seasonString = "";
  if (season == 1) {
    seasonString = "Spring";
    season += 1;
  } else if (season == 2) {
    seasonString = "Summer";
    season += 1;
  } else if (season == 3) {
    seasonString = "Fall";
    season += 1;
  } else {
    seasonString = "Winter";
    season = 1;
    year += 1;
    familyTree[currentKing].reign += 1;
  }
  yearValue.innerText = `Year: ${year} - ${seasonString} `;
}

//Event listeners
//Gets name of kingdom
form.addEventListener("submit", (event) => {
  let kingdomName = nameInput.value;
  const h1 = document.createElement("h1");
  h1.innerHTML = `${kingdomName}`;
  nameDiv.appendChild(h1);
  form.style.display = "none";
  event.preventDefault();
});

//Pop clicker
popButton.addEventListener("click", () => {
  pop += 5;
  updateUI();
});

//Food Clicker
foodButton.addEventListener("click", () => {
  food += 5;
  updateUI();
});

//Mats clicker
matsButton.addEventListener("click", () => {
  mats += 5;
  updateUI();
});

//Train unit clicker
trainButton.addEventListener("click", () => {
  buyUnit();
  updateUI();
});

//Game Loops
window.setInterval(function () {
  displayOtherResources();
  foodCalculator();
  famineCalc();
  seasonGenerator();
  displayFamilyTree();
  updateUI();
}, 2500);

//Calls
onStart();
