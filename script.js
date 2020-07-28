
//Variables to get the buttons
const playButton = document.getElementById("play-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
//variables to get the speed input, and text to be read
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
//character that is currently spoken, used  to know where we stopped reading at 
let currentCharacter;

//play, pause and stop buttons event listeners, they all go to a function respectively
playButton.addEventListener("click", () => {
  playText(textInput.value);
});
pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);
//event listener in case user changes the speed of reading while the reader is playing.
speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(currentCharacter));
});

//most of the heavy lifting in this project is already done for us using a SpeechSynthesisUtterance object, which we are getting an instance of here
const utterance = new SpeechSynthesisUtterance();

//check if the text has finished being spoken, and reactivate the textbox area
utterance.addEventListener("end", () => {
  textInput.disabled = false;
});
//updates the current character, at every spoken character
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

//speeks the text in the area, but first checks if the text is currently paused, or if it already is speaking.
//if not it disables the textarea input and starts speaking from the inputted text
function playText(text) {
  if (speechSynthesis.pause && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  utterance.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}
//pauses the speaking in case that it was speaking
function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}
//stops the text reading
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
