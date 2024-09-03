const audioContext = new AudioContext();

const audioElement = document.querySelector(".mp3audio");
const audioButton = document.querySelector(".audioButton");
const volumeControl = document.querySelector(".volumeControl");
const volumeIndicator = document.querySelector(".volumeIndicator");

const gainNode = audioContext.createGain();
const track = audioContext.createMediaElementSource(audioElement);
track.connect(gainNode).connect(audioContext.destination);

audioElement.addEventListener(
  "ended",
  () => {
    audioButton.dataset.playing = "false";
  },
  false,
);

audioButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (audioButton.dataset.playing === "false") {
      audioElement.play();
      audioButton.dataset.playing = "true";
    } else if (audioButton.dataset.playing === "true") {
      audioElement.pause();
      audioButton.dataset.playing = "false";
    }
  },
  false,
);

const vlmValInit = Math.pow(volumeControl.value,1.7);
gainNode.gain.value = vlmValInit;
volumeIndicator.textContent = Math.round(vlmValInit*10000)/100;
volumeControl.addEventListener(
  "input",
  () => {
	const vlmVal = Math.pow(volumeControl.value,1.7); //can be const because the function is called for every change in volume
    gainNode.gain.value = vlmVal;
	volumeIndicator.textContent = Math.round(vlmVal*10000)/100;
  },
  false,
);

