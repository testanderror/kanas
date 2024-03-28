let fetchedData;
let hiraganaData;
let katakanaData;
let currentEntry;
let count = 0;
let counter = '';

let currentDataType;

const gameContainer = document.getElementById('game-grid');
const startBtn = document.getElementById('start-button');
const homeBtn = document.getElementById('homeBtn');
const hiraganaBtn = document.getElementById('hiragana');
const katakanaBtn = document.getElementById('katakana');
const introElements = document.querySelectorAll('#intro');
const introTop = document.querySelector('.introTop');
const introBottom = document.querySelector('.introBottom');

function fetchData() {
  return fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
    })
    .catch((error) => {
      console.error('Error loading data:', error);
    });
}

function appendDataToGameGrid(dataType) {
  fetchData(dataType)
    .then(() => {
      const randomIndex = Math.floor(Math.random() * fetchedData.length);
      const fetchedEntry = fetchedData[randomIndex];
      currentEntry = {
        romaji: fetchedEntry.romaji,
        hiragana: fetchedEntry.hiragana,
        katakana: fetchedEntry.katakana,
      };
      const gameGrid = document.getElementById('game-grid');

      gameGrid.innerHTML = '';

      const pElement = document.createElement('p');
      pElement.textContent = `${currentEntry[dataType]}`;
      pElement.style.fontSize = '140px';
      pElement.style.fontFamily = 'myFont';
      pElement.style.color = 'maroon';
      gameGrid.appendChild(pElement);

      createInputElement('game-grid', 'input-text', '...');
      createSubmitButton(
        'game-grid',
        'submit-button',
        'Input Answer',
        handleSubmitButtonClick
      );
    })
    .catch((error) => {
      console.error('Error appending data to game grid:', error);
    });
}

function handleSubmitButtonClick() {
  removeCounterElements();
  const inputValue = document.getElementById('input-text').value.trim();
  console.log(`${inputValue}: that's inputValue`);

  if (!inputValue) {
    return; // Prevent form submission
  }

  if (inputValue.toLowerCase() === currentEntry.romaji.toLowerCase()) {
    appendDataToGameGrid(currentDataType);
    count += 1;

    counter = document.createElement('div');
    counter.classList.add('counter');
    counter.textContent = `${count} correct in a row:)`;
    counter.style.fontSize = '20px';
    counter.style.fontFamily = 'Reddit Mono, monospace';
    console.log(counter);

    const parentElement = gameContainer.parentNode;
    parentElement.insertBefore(counter, parentElement.lastElementChild);

    console.log('MATCH');

    console.log(`${count} words in a row!`);
  } else {
    count = 0;
    alert('wrong');
    console.log('CHIGAU!');
    document.getElementById('input-text').value = '';
  }
}

function removeCounterElements() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => counter.remove());
}

function createInputElement(parentElementId, inputId, placeholder) {
  const parentElement = document.getElementById(parentElementId);

  const inputElement = document.createElement('input');

  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('id', inputId);
  inputElement.setAttribute('autocomplete', 'off');
  inputElement.setAttribute('placeholder', placeholder);
  inputElement.style.padding = '10px 20px';
  inputElement.style.width = '40px';
  inputElement.style.textAlign = 'center';

  inputElement.style.fontSize = '18px'; // Adjust the font size of the placeholder

  parentElement.appendChild(inputElement);
}

function createSubmitButton(
  parentElementId,
  buttonId,
  buttonText,
  clickHandler
) {
  const parentElement = document.getElementById(parentElementId);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button'); // Ensures it doesn't submit forms
  submitButton.setAttribute('id', buttonId);
  submitButton.style.marginTop = '20px';
  submitButton.style.backgroundColor = 'whitesmoke';

  const buttonTextSpan = document.createElement('span');
  buttonTextSpan.textContent = buttonText;

  if (clickHandler && typeof clickHandler === 'function') {
    buttonTextSpan.addEventListener('click', clickHandler);
  }

  submitButton.appendChild(buttonTextSpan);
  parentElement.appendChild(submitButton);
}

function blink() {
  introElements.forEach((element) => {
    const color = getRandomColor(); // Get a random color
    element.style.color = color; // Apply the color to the text
  });
}

function getRandomColor() {
  const colors = ['#000000', '#FFFFFF']; // Array of colors (black and white)
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex]; // Return a random color from the array
}

function toggleGameContainer(dataType) {
  gameContainer.style.display = 'flex';
  gameContainer.style.flexDirection = 'column';
  gameContainer.style.justifyContent = 'center';
  gameContainer.style.alignItems = 'center';
  startBtn.style.display = 'none';
  homeBtn.style.display = 'flex';
  homeBtn.style.bottom = '20px';
  hiraganaBtn.style.display = 'none';
  katakanaBtn.style.display = 'none';
  introTop.style.display = 'none';
  introBottom.style.display = 'none';
  currentDataType = dataType;
  appendDataToGameGrid(dataType);
}

function resetGameContainer() {
  gameContainer.style.display = 'none';
  startBtn.style.display = 'block';
  homeBtn.style.display = 'none';
  introTop.style.display = 'block';
  introBottom.style.display = 'block';
  removeCounterElements();
  count = 0;
}

function toggleOptions() {
  hiraganaBtn.style.display = 'block';
  katakanaBtn.style.display = 'block';
  introTop.style.marginBottom = '180px';
  introBottom.style.marginTop = '210px';
  startBtn.style.display = 'none';
}

startBtn.addEventListener('click', toggleOptions);

hiraganaBtn.addEventListener('click', () => toggleGameContainer('hiragana'));
katakanaBtn.addEventListener('click', () => toggleGameContainer('katakana'));

homeBtn.addEventListener('click', resetGameContainer);

// Call the blink function every 500 milliseconds (adjust the interval as needed)
setInterval(blink, 100);
