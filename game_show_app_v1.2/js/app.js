const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttonReset = document.querySelector('button.btn__reset');
const missed = 0;
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

function checkLetter(button) {
    let phraseElements = document.querySelectorAll('li.letter');
    let match = '';
    for(let i = 0; i < phraseElements.length; i++) {
        if (phraseElements[i].textContent.toUpperCase() === button.textContent.toUpperCase()) {
            phraseElements[i].classList.add('show');
            match = phraseElements[i];
        }
    }
}

document.addEventListener('click', (e) => {
    if(event.target.tagName === 'BUTTON') {
        event.target.classList.add('chosen');
        event.target.setAttribute('disabled', true);
        checkLetter(event.target);
    }
})
