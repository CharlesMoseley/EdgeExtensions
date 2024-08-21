const audioContext = new AudioContext();

audioElement = document.querySelector(".mp3audio");
playButton = document.querySelector(".audiobutton");
volumeControl = document.querySelector(".volume");
vlmInd = document.querySelector(".volumeindicator")

const gainNode = audioContext.createGain();
track = audioContext.createMediaElementSource(audioElement);
track.connect(gainNode).connect(audioContext.destination);

audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false,
);

playButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  },
  false,
);

vlmValInit = Math.pow(volumeControl.value,1.7);
gainNode.gain.value = vlmValInit;
vlmInd.textContent = Math.round(vlmValInit*10000)/100;
volumeControl.addEventListener(
  "input",
  () => {
	vlmVal = Math.pow(volumeControl.value,1.7);
    gainNode.gain.value = vlmVal;
	vlmInd.textContent = Math.round(vlmVal*10000)/100;
  },
  false,
);

