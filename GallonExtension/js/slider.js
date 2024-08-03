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