/*
Crusader kings game where you have heirs and they die and you need to conquer the kingdom.
YOu have to click to get resources and make decisions.


-- MVP --
Screens
Map/ Resources Screen/ Kings Court/ Family tree

Population, food, materials
Can name kingdom
-Cannot name Kings, randomly generated

some scripted experiences
random events

conquer where you are at

--Later updates
Add crests
procedurally generate maps
you can die/succeeded by heir
Add ability to chose where people work
Add unit types
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

//Game variables / Starting
let pop = 0;
let food = 100;
let foodConsumed = 0;
let mats = 0;

//Multipliers
let popMultiplier = pop * 0.015;

//Functions

function updateUI() {
  popValue.innerText = `Population: ${pop}`;
  foodValue.innerText = `Food: ${food}`;
  matsValue.innerText = `Mats: ${mats}`;
  foodConsumedValue.innerText = `Food Consumed: ${foodConsumed}`;
}

function onStart() {
  pop = 2;
  foodValue.style.visibility = "hidden";
  foodConsumedValue.style.visibility = "hidden";
  foodButton.style.visibility = "hidden";
  matsButton.style.visibility = "hidden";
  matsValue.style.visibility = "hidden";
  updateUI();
}

function displayOtherResources() {
  if (pop >= 25) {
    foodValue.style.visibility = "visible";
    foodButton.style.visibility = "visible";
    foodConsumedValue.style.visibility = "visible";
    matsButton.style.visibility = "visible";
    matsValue.style.visibility = "visible";
  }
}

//Determines how much food is consumed
function foodCalculator() {
  foodConsumed = pop / 10;
  food = Math.floor(food - foodConsumed);
}

//Event listeners
form.addEventListener("submit", (event) => {
  let kingdomName = nameInput.value;
  const h1 = document.createElement("h1");
  h1.innerHTML = `${kingdomName}`;
  nameDiv.appendChild(h1);
  form.style.display = "none";
  event.preventDefault();
});

popButton.addEventListener("click", () => {
  pop += 5;
  updateUI();
});

foodButton.addEventListener("click", () => {
  food += 1;
  updateUI();
});

matsButton.addEventListener("click", () => {
  mats += 1;
  updateUI();
});

//Game Loops
window.setInterval(function () {
  displayOtherResources();
  foodCalculator();
  updateUI();
}, 2000);

//Calls
onStart();
