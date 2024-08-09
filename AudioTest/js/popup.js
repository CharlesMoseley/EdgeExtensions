const audioContext = new AudioContext();

audioElement = document.querySelector(".mp3audio");
playButton = document.querySelector(".audiobutton");
volumeControl = document.querySelector(".volume");

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

gainNode.gain.value = Math.pow(volumeControl.value,1.7);
volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = Math.pow(volumeControl.value,1.7);
  },
  false,
);

