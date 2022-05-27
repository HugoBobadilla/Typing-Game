const quotes = [
  'La forma de empezar es dejar de hablar y empezar a hacer.',
  'El futuro pertenece a aquellos que creen en la belleza de sus sueños.',
  'Dime y lo olvido. Enséñame y lo recuerdo. Involucrarme y aprendo.',
  'Nunca encontrarás un arcoíris si miras hacia abajo.',
  'Locura es hacer lo mismo una y otra vez y esperar resultados diferentes.',
  'No importa lo lento que vayas mientras no te detengas.',
  'Solo se vive una vez, pero si lo haces bien, una vez es suficiente.',
  'El genio es uno por ciento de inspiración, noventa y nueve por ciento de transpiración.'
];

const startBtn = document.getElementById('start-btn');
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-word');

let words = [];
let wordIndex = 0;
let startTime = Date.now();

startBtn.addEventListener('click', () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  
  // Put the quote into an array of words
  words = quote.split(' ');

  // reset the word index for tracking
  wordIndex = 0;

  const spanWords = words.map(word => `<span>${word} </span>`);
  
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';

  messageElement.innerText = '';

  // Clear the textbox
  typedValueElement.value = "";

  typedValueElement.focus();

  // start timer
  startTime = new Date().getTime();
});


typedValueElement.addEventListener('input', () => {
  const currentWord = words[wordIndex];

  const typedWord = typedValueElement.value;
  
  if(typedWord === currentWord && wordIndex === words.length - 1) {
    // end of the sentence
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICIDADES! Terminaste la frase en ${elapsedTime / 1000} segundos.`;
    messageElement.innerText = message;
  } else if(typedWord.endsWith(' ') && typedWord.trim() === currentWord) {
    // ends of the word
    // clear input field
    typedValueElement.value = '';

    // move to the next word
    wordIndex++;

    // reset classname for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }

    // highlight the current word
    quoteElement.childNodes[wordIndex].className = 'highlight';

  } else if(currentWord.startsWith(typedWord)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});