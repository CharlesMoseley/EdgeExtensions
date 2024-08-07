surround = document.getElementById("slider-surround");
slider = document.getElementById("slider");

surround.onmousedown = sliderMouseDown;
surround.onmouseover = highlight;
surround.onmouseout = unhighlight;

indicator = document.getElementById("VolumeAmount");

doc = document.documentElement;

xPos = 15;

/* The order of applying events could be different.
One thing we coul do is have the doc.onmouseup = sliderMouseUp before any of the functions.
Mousingup anywhere in the document should stop all events.
 */

function sliderMouseDown(e){
	this.onmousemove = nof;
	xPos = e.pageX;
	xPos = xPos - 12;
	indicator.innerHTML = sliderUpdatePos(xPos);
	slider.style.transform = 'translate('+sliderUpdatePos(xPos)+'px)';
	this.onmousemove = sliderMouseMove;
	doc.onmouseup = sliderMouseUp;
	
}

function sliderMouseMove(e){
	this.onmousedown = nof;
	xPos = e.pageX;
	xPos = xPos - 12;
	indicator.innerHTML = sliderUpdatePos(xPos);
	slider.style.transform = 'translate('+sliderUpdatePos(xPos)+'px)';
}

function sliderMouseUp(e){
	surround.onmousemove = nof;
	indicator.innerHTML = sliderUpdatePos(xPos);
	slider.style.transform = 'translate('+sliderUpdatePos(xPos)+'px)';
	surround.onmousedown = sliderMouseDown;
}

function sliderUpdatePos(pos){
	if (pos < 0){
		return 0;
	} else if (pos > 100) {
		return 100;
	} else {
		return pos;
	}
}

function nof(){
	
}

function highlight(){
	this.style.backgroundColor = "rgb(255,80,80)";
}

function unhighlight(){
	this.style.backgroundColor = "red";
}
/*
async connectAsync(stream) {
	const auCtx = new AudioContext();
	const source = auCtx.createMediaStreamSource(stream);
	const destNode = auCtx.createMediaStreamDestination();
	const gainNode = this.gainNode = auCtx.createGain();
	gainNode.gain.value = 1;
	gainNode.connect(destNode);
	source.connect(gainNode);
	const outStream = destNode.stream;
	//await this.visualizer.setStreamAsync(outStream);
	this.audio.srcObject = outStream;
	this.audio.play();
	//setKnobValue(100);
}

async getStreamAsync(tabId) {
	const currTabId = (await chrome.tabs.getCurrent())
		?.id;
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