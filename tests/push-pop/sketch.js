// No errors should appear in console
// Text should appear centered on the canvas and in two sizes

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  every(1).seconds.draw(draw1).draw(draw2);
}

function draw() {
  background(220);
}

function draw1() {
  textSize(128);
  text('Hello', 200, 200);
}
function draw2() {
  text('I should be normal sized', 200, 200);
}
