function setup() {
  createCanvas(400, 400);

  // untilKeyPressed() will wait until a key is pressed, ignoring the time
  // interval in every()
  every(2).seconds
    .show(draw1).untilKeyPressed()
    .show(draw2).untilKeyPressed()
    // you can also wait for only a specific key, by passing a key code
    .show(draw3).untilKeyPressed(ENTER);
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
