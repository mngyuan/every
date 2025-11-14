function setup() {
  createCanvas(400, 400);

  // untilMousePressed() will wait until the mouse is pressed, ignoring the time
  // interval in every()
  every(2)
    .seconds.draw(draw1)
    .untilMousePressed()
    .draw(draw2)
    .untilMousePressed()
    // unless you specifically give a time interval to a specific scene
    .draw(draw3, 5)
    .untilMousePressed();
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
