var slider = $('.slider');
var maxPos = 100
var minPos = 0

function moveKnob(direction) {
  
  if(direction == 'left') {
    if((pos - 1) >= minPos) {
      pos = pos - 1;
      setAngle();
    }
  }
  
  else if(direction == 'right') {
    if((pos + 1) <= minangle) {
      pos = pos + 1;
      setAngle();
    }
  }

}

function setPos(){
	
  slider.css({
    'transform':'translate('+pos+'px)'
  });

}