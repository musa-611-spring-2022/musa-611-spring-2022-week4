/* =====================

# Exercise: Selectors & Events

## Introduction

Open the index.html page in your browser, and update the variables and functions
below so that the results all read "Success!".

===================== */

/* ====================
Part 1: Set the variable below equal to the paragraph element representing the
first test result.
==================== */

let firstResult;
firstResult = document.getElementById("result-1");

/* ====================
Parts 2: Set the variable below equal to a collection of the paragraph
elements representing the 2nd and 3rd results.
==================== */

let secondAndThirdResults;
secondAndThirdResults = document.getElementsByClassName("result result-2-3");

/* ====================
Parts 3: Set the variable below equal to a collection of the paragraph
elements representing the all of the results.
==================== */

let allResults;
allResults = document.getElementsByTagName('p');

/* ====================
Part 4: Add an event listener to the button in problem 4 that changes the
button's own text to "I'm Clicked!"
==================== */

let imClickedButton;
imClickedButton = document.getElementById('im-clicked-button');
if (imClickedButton) {
  imClickedButton.addEventListener('click', (evt) => {
    document
      .getElementById('im-clicked-button')
      .innerHTML = "I'm Clicked!";
    });
  }


/* ====================
Part 5: Add an event listener to the button in problem 5 that creates a new span
to the spanContainer. The span should contain a single number representing how
many times you have clicked the button. For example, if it is your 3rd time
clicking the button, you should add:

  <span>3</span>

HINT: You may need some global state for this problem.
==================== */

let spanContainer = document.querySelector('#span-container');
let n = 0
//let n = 0
spanContainer.appendChild(htmlToElement('<span>'+n+'</span>'));

let addSpanButton;
addSpanButton = document.getElementById('add-span-button');

if (addSpanButton) {
  addSpanButton.addEventListener('click', (evt) => {
    n+=1
    document
      .getElementById('span-container')
      .appendChild(htmlToElement('<span>'+n+'</span>'))

  });
}

/* =====================

Results (all should report success)
YOU NEED NOT (AND SHOULD NOT) EDIT BELOW THIS LINE.

===================== */

function updateResults() {
  // Part 1
  try {
    firstResult.textContent = 'Success!';
  } catch (exc) {
    console.log('Failed part 1:');
    console.error(exc);
  }

  // Part 2
  try {
    if (secondAndThirdResults.length !== 2) {
      console.log(`Failed part 2: Variable should represent exactly 2 elements, not ${secondAndThirdResults.length}.`);
    } else {
      document.querySelector('#result-2').textContent = 'Success!';
    }
  } catch (exc) {
    console.log('Failed part 2:');
    console.error(exc);
  }

  // Part 3
  try {
    if (allResults.length < 3) {
      console.log(`Failed part 3: Variable should represent ... elements, not ${secondAndThirdResults.length}.`);
    } else {
      document.querySelector('#result-3').textContent = 'Success!';
    }
  } catch (exc) {
    console.log('Failed part 3:');
    console.error(exc);
  }

  // Part 4
  if (imClickedButton) {
    imClickedButton.addEventListener('DOMNodeInserted', () => {
      if (imClickedButton.textContent === 'I\'m Clicked!') {
        document.querySelector('#result-4').textContent = 'Success!';
      }
    });
  }

  // Part 5
  spanContainer.addEventListener('DOMNodeInserted', () => {
    if (spanContainer.children.length === 6
        && spanContainer.lastChild.textContent === '5') {
      document.querySelector('#result-5').textContent = 'Success!';
    }
  });
}

updateResults();
