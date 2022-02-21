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

let firstResult = htmlToElement('<p id="result-1" class="result">No success yet...</p>');

/* ====================
Parts 2: Set the variable below equal to a collection of the paragraph
elements representing the 2nd and 3rd results.
==================== */

let secondAndThirdResults = htmlToElements('<p id="result-2" class="result result-2-3">No success yet...</p><p id="result-3" class="result result-2-3">No success yet...</p>');

/* ====================
Parts 3: Set the variable below equal to a collection of the paragraph
elements representing the all of the results.
==================== */

let allResults = htmlToElements('<p id="result-1" class="result">No success yet...</p><p id="result-2" class="result result-2-3">No success yet...</p><p id="result-3" class="result result-2-3">No success yet...</p><p id="result-4" class="result">No success yet...<br>(click the button)</p><p id="result-5" class="result">No success yet...<br>(click the button 5 times)</p>');

/* ====================
Part 4: Add an event listener to the button in problem 4 that changes the
button's own text to "I'm Clicked!"
==================== */

let imClickedButton = document.querySelector('#im-clicked-button');
if (imClickedButton) {
  imClickedButton.addEventListener('click', () => {
    imClickedButton.textContent = "I'm Clicked!";
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
let addSpanButton = document.querySelector('#add-span-button');
spanContainer.appendChild(htmlToElement('<span>0</span>'));

if (addSpanButton) {
  addSpanButton.addEventListener('click', () => {
    let lastchild = document.querySelector('#span-container').lastChild;
    let currentNum = 0;
    if (lastchild) {
      currentNum = parseInt(lastchild.innerText, 10);
    }
    spanContainer.appendChild(htmlToElement(`<span>${parseInt(currentNum, 10) + 1}</span>`));
  });
}

/* =====================

Results (all should report success)
YOU NEED NOT (AND SHOULD NOT) EDIT BELOW THIS LINE.

===================== */

function updateResults() {
  // Part 1
  try {
    document.querySelector('#result-1').textContent = 'Success!';
  } catch (exc) {
    console.log(firstResult);
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
