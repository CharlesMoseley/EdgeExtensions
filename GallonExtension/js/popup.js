thing = document.getElementById("thingId");

thing.innerHTML = ":3";
thing.style.backgroundColor = "yellow";
thing.style = "background-color:red;width:200px;height:100px;font-family:courier;" /* style is the attribute being edited and overriding the previous line and the style original defined in the html */
thing.onmousedown = thingMouseDown;
//thing.onmousemove = thingMouseMove;
//thing.onmouseup = thingMouseUp;
thing.onmouseover = highlight;
thing.onmouseout = unhighlight;

body = document.documentElement

xPos = 100;
yPos = 0;

function myFunction(){
	this.innerHTML = "Thanks";
}

function thingMouseDown(e){
	this.onmousemove = nof;
	xPos = e.pageX
	this.innerHTML = updatePos(xPos);
	this.onmousemove = thingMouseMove;
	body.onmouseup = thingMouseUp;
	
}

function thingMouseMove(e){
	this.onmousedown = nof;
	xPos = e.pageX
	this.innerHTML = updatePos(xPos);
	//this.onmouseup = thingMouseUp;
}

function thingMouseUp(e){
	thing.onmousemove = nof;
	thing.innerHTML = updatePos(xPos);
	thing.onmousedown = thingMouseDown;
}

function nof(){
	
}

function updatePos(pos){
	if (pos < 50){
		return 50;
	} else if (pos > 100) {
		return 100;
	} else {
		return pos;
	}
}

function highlight(){
	this.style.backgroundColor = "rgb(255,80,80)";
}

function unhighlight(){
	this.style.backgroundColor = "red";
}