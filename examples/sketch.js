function setup() {
  createCanvas(400, 400);

  every(2).seconds.show(draw1).show(draw2).show(draw3);
  print(getTargetFrameRate());
}

function draw() {
  background(220);
}

function draw1() {
  background('red');
}

function draw2() {
  background('blue');
}
function draw3() {
  background('green');
}
