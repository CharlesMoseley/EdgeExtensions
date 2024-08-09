


/*async getStreamAsync(tabId) {
	const currTabId = chrome.tabs.getCurrent().id;
	if (!currTabId) {
		throw new Error("Error getting curr Tab Id");
	}
	return new Promise(r => {
		chrome.tabCapture.getMediaStreamId({
			consumerTabId: currTabId,
			targetTabId: tabId,
		}, (streamId) => {
			const stream = navigator.mediaDevices.getUserMedia({
				video: false,
				audio: {
					mandatory: {
						chromeMediaSource: "tab",
						chromeMediaSourceId: streamId,
					}
				},
			});
			r(stream);
		});
	});
}*/









audio = document.querySelector(".audio-output");
volumeControl = document.querySelector(".volume");

//chrome.runtime.sendMessage({ popupOpen: true });
chrome.tabs.onUpdated.addListener((...params) => this.onTabUpdated(...params));

params = new URLSearchParams(location.search);
tabId = Number(params.get("tabId"));

const currTabId = chrome.tabs.getCurrent().id;
if (!currTabId) {
	throw new Error("Error getting curr Tab Id");
}
stream = new Promise(r => {
	chrome.tabCapture.getMediaStreamId({
		consumerTabId: currTabId,
		targetTabId: tabId,
	}, (streamId) => {
		const stream = navigator.mediaDevices.getUserMedia({
			video: false,
			audio: {
				mandatory: {
					chromeMediaSource: "tab",
					chromeMediaSourceId: streamId,
				}
			},
		});
		r(stream);
	});
});

audioContext = new AudioContext();
//stream = getStreamAsync(tabId);
source = audioContext.createMediaStreamSource(stream);
gainNode = audioContext.createGain();
destNode = audioContext.createMediaStreamDestination();
//source.connect(gainNode).connect(audioContext.destination);
source.connect(gainNode).connect(destNode);

gainNode.gain.value = Math.pow(volumeControl.value,1.7);
volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = Math.pow(volumeControl.value,1.7);
  },
  false,
);

audio.srcObject = destNode.stream;
audio.play()

/*connectAsync(stream) {
	const auCtx = new AudioContext();
	const source = auCtx.createMediaStreamSource(stream);
	const destNode = auCtx.createMediaStreamDestination();
	const gainNode = this.gainNode = auCtx.createGain();
	gainNode.gain.value = 1;
	gainNode.connect(destNode);
	source.connect(gainNode);
	const outStream = destNode.stream;
	this.audio.srcObject = outStream;
	this.audio.play();
}*/

