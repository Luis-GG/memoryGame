const gameContainer = document.getElementById("game");
const clickedPair = document.querySelectorAll(".target");
const userName = document.querySelector("input");
const btn = document.querySelector("button");
const scoreDisp = document.querySelector("p");

let selectedCards = [];
let score = 0;
let guessCount = 0;




const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function displayScore() {
  scoreDisp.innerText = `Score: ${guessCount}`;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let loopCounter = 0;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    loopCounter++;
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("hidden");
    newDiv.classList.add("card");
    newDiv.setAttribute("data-id", loopCounter);
    newDiv.setAttribute("data-color", color);


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  }
}


function checkForMatch() {

  if (selectedCards[0].cardColor === selectedCards[1].cardColor) {
    setTimeout(function () {

    }, 1000);
    selectedCards = [];

    return true;
  } else {
    setTimeout(function () {
    }, 1000);
    selectedCards = [];
    return false;
  }
}




function objectCreator(cardColor, cardId) {
  let newobj = {};
  newobj.cardColor = cardColor;
  newobj.cardId = cardId;

  selectedCards.push(newobj);
}



// TODO: Implement this function!
function handleCardClick(event) {
  //remove class attribute of "hidden" to turn card over
  event.target.classList.remove("hidden");
  event.target.classList.add("target");

  // grabbing clicked card meta data, color and id
  let clickedCardColor = event.target.getAttribute("data-color");
  let clickedCardId = event.target.getAttribute("data-id");

  // placing clicked cards in an array to be compared 
  objectCreator(clickedCardColor, clickedCardId);
  const targetDiv = document.querySelectorAll(".target");
  const allCards = document.querySelectorAll(".card");

  if (selectedCards.length === 2) {
    guessCount++;
    displayScore();
    if (checkForMatch()) {
      score += 2;
      for (let item of targetDiv) {
        setTimeout(function () {
          item.classList.remove("target");
          item.classList.add("completed");

          console.log("match");
          console.log(item);

        }, 1000);

      }


    } else {
      console.log("no match")

      for (let items of targetDiv) {
        setTimeout(function () {
          items.classList.add("hidden");
          console.log(items);
          items.classList.remove("target");
        }
          , 1000);
      }

    }


    if (score === COLORS.length) {
      setTimeout(function () {
        alert(`
        Game Over 
        Final Score: ${guessCount}`
        );
      }, 500);
    }
  }
}












// when the DOM loads
createDivsForColors(shuffledColors);
