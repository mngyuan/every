function setup() {
  createCanvas(400, 400);

  every(2).seconds
    .show(draw1)
    .show(draw2, 4)  // show for 4 seconds
    .show(draw3, 8); // show for 8 seconds
}

function draw() {
  // This won't show anything, but we must have a draw() function for p5
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

