const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttonReset = document.querySelector('button.btn__reset');
let missed = 0;
const phrases = ['HIP TO BE SQUARE', 'THE HEART OF ROCK AND ROLL', 'THE POWER OF LOVE', 'DO YOU BELIEVE IN LOVE', 'WORKIN FOR A LIVIN'];
const ul = phrase.querySelector('ul');

// When the "Start Game" button is clicked, the overlay disappears, showing the phrase and keyboard
buttonReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// This function randomly selects a phrase from the "phrases" variable and splits each letter and space into a separate array element within the "answerPhrase variable"
function getRandomPhraseAsArray(arr) {
  const getRandomPhrase = arr[Math.floor(Math.random()*arr.length)];
  let answerPhrase = getRandomPhrase.split("");
  return answerPhrase;
}

getRandomPhraseAsArray(phrases);

//This function creates a li element for each letter and space in the randomly selected phrase and adds it to the ul in the div with the id "phrase"
function addPhraseToDisplay(arr) {
    for (i = 0; i < arr.length; i += 1) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(arr[i]));
        ul.appendChild(li);
        if (li.textContent != " ") {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases));

//This function checks to see if the button that was clicked by the user matches a letter in the phrase. If so, the 'show' class is added to display the letter on the page
function checkLetter(button) {
    let phraseElements = document.querySelectorAll('li.letter');
    let match = false;
    for(let i = 0; i < phraseElements.length; i++) {
        if (phraseElements[i].textContent.toUpperCase() === button.textContent.toUpperCase()) {
            phraseElements[i].classList.add('show');
            match = true;
        }
    }
    return match;
}

//This event listener listens for a click action on the div with the 'qwerty'ID, changes the color of the clicked button in the div, and disables it
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        e.target.classList.add('chosen');
        e.target.setAttribute('disabled', true);
        const match = checkLetter(e.target);
        //if the button clicked does not match a letter within the phrase, increment the missed counter by one    
        if (!match) {
                const tries = document.querySelectorAll('.tries');
                tries[missed].style.display = 'none';
                missed++;
            }
    }
    checkWin();
})

//This function validates if the number of letters clicked matches the number of letters in the phrase and displays the win overlay if true.
function checkWin() {
    const letterSum = document.getElementsByClassName('letter');
    const showSum = document.getElementsByClassName('show');
    const endGameMessage = document.querySelector('h2.title');
    if(letterSum.length === showSum.length) {
        endGameMessage.textContent = "You've Won!!!";
        overlay.style.display = 'flex';
        overlay.classList.add('win');
    //if the number of incorrect letter guesses is above 4, the lose overlay displays
    } else if(missed > 4) {
        endGameMessage.textContent = "You've Lost";
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
    }
}

