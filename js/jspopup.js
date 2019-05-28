let synthesis = window.speechSynthesis;
let voices = [];

document.addEventListener('DOMContentLoaded', event => {
  // createVoiceSelect();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = createVoiceSelect;
  }
});

document.querySelector('body').addEventListener('keypress', event => {
  if(event.keyCode === 13) {
    console.log('enter');
    let text = document.querySelector('#text').value;
    let selectedVoiceName = document.querySelector('#voiceSelect').value;
    let selectedVoiceObject = voices.find(voice => voice.name == selectedVoiceName);

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoiceObject;
    utterance.pitch = document.querySelector('#pitchRange').value;
    utterance.rate = document.querySelector('#rateRange').value;
    synthesis.speak(utterance);
  }
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
  fetch('http://api.icndb.com/jokes/random')
  .then(response => {
    return response.json();
  })
  .then(result => {
    let text = result.value.joke;
    let selectedVoiceName = document.querySelector('#voiceSelect').value;
    let selectedVoiceObject = voices.find(voice => voice.name == selectedVoiceName);

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoiceObject;
    utterance.pitch = document.querySelector('#pitchRange').value;
    utterance.rate = document.querySelector('#rateRange').value;
    synthesis.speak(utterance);
  })
  .catch(err => console.log(err));
})

let counter = 0;

function createVoiceSelect() {
  console.log(counter++);
  voices = synthesis.getVoices();
  let select = document.createElement('select');
  select.id = 'voiceSelect';
  voices.forEach(voice => {
    let option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    select.appendChild(option);
  });
  document.querySelector('#base-container').appendChild(select);
}
