let synthesis = window.speechSynthesis;
let voices = [];
let baseContainer = document.querySelector('#base-container');
let voiceSelect = document.querySelector('#voiceSelect');
let previousVoice = '';

document.querySelector('body').addEventListener('keypress', event => {
  if(event.keyCode === 13) {
    let text = document.querySelector('#text').value;
    speak(text);
  }
});

document.querySelector('#voiceSelect').addEventListener('change', event => {
  previousVoice = event.target.value;
});

document.querySelector('#buttons').addEventListener('click', event => {
  switch (event.target.id) {
    case 'pause':
    synthesis.pause();
    break;
    case 'resume':
    synthesis.resume();
    break;
    case 'cancel':
    synthesis.cancel();
    break;
  }
});

document.querySelector('#joke').addEventListener('click', event => {
  const jokesArray = ['http://api.icndb.com/jokes/random',
  'https://official-joke-api.appspot.com/random_joke',
  'https://icanhazdadjoke.com/'
];

let rand = getRandomInt(3);
let jokeText = '';

fetch(jokesArray[rand], {
  headers: { "Accept": "application/json" }
})
.then(response => {
  return response.json();
})
.then(result => {

  switch (rand) {
    case 0:
    jokeText = result.value.joke;
    break;
    case 1:
    jokeText = result.setup + ' ' + result.punchline;
    break;
    case 2:
    jokeText = result.joke;
    break;
    default:
  }
  console.log(jokeText);
  speak(jokeText);
})
.catch(err => console.log(err));
})

let counter = 0;

function createVoiceSelect() {
  voiceSelect.innerHTML = '';
  console.log(counter++);
  voices = synthesis.getVoices();
  voices.forEach(voice => {
    let option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    if(voice.name == previousVoice) {
      option.selected = true;
    }
    voiceSelect.appendChild(option);
  });
  baseContainer.appendChild(voiceSelect);
}

createVoiceSelect();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = createVoiceSelect;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function speak(jokeText) {
  let utterance = new SpeechSynthesisUtterance(jokeText);
  let selectedVoiceObject = voices.find(voice => voice.name == voiceSelect.value);
  utterance.voice = selectedVoiceObject;
  utterance.pitch = document.querySelector('#pitchRange').value;
  utterance.rate = document.querySelector('#rateRange').value;
  synthesis.speak(utterance);
}
