let canvas;
let canvasContext;

let xv=yv=0; // X and Y velocity
let px=py=10; // player X and Y
let gs=tc=20; // grid size and tile count
let ax=ay=15; // apple X and Y
let trail=[];
let tail=5;

window.onload= function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000/15);
}

function game() {
  px+=xv;
  py+=yv;
  if(px<0) {
    px = tc-1;
  }
  if(px>tc-1) {
    px = 0;
  }
  if(py<0) {
    py = tc-1;
  }
  if(py>tc-1) {
    py = 0;
  }
  drawRect(0,0,canvas.width,canvas.height,'black'); // background;

  for(let i=0;i<trail.length;i++) {
    drawRect(trail[i].x*gs, trail[i].y*gs, gs-2 ,gs-2,'lime');
    if (trail[i].x == px && trail[i].y == py) {
      tail = 5;
    }
  }

  trail.push({x: px,y:py});
  while(trail.length > tail) {
    trail.shift();
  }


  if (ax == px && ay == py) {
    tail++;
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tc);

  }
  drawRect(px*gs, py*gs, gs-2 ,gs-2,'lime');

  drawRect(ax*gs, ay*gs, gs-2 ,gs-2,'red');
}

function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      xv = -1;
      yv = 0;
      break;
    case 38:
      xv = 0;
      yv = -1;
      break;
    case 39:
      xv = 1;
      yv = 0;
      break;
    case 40:
      xv = 0;
      yv = 1;
      break;
  }
}

function drawRect(topX, topY, width,height,color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(topX, topY, width,height);
}
