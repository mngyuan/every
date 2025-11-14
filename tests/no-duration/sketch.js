// No errors should appear in console

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  every().seconds.draw(draw1).draw(draw2);
}

function draw() {
  background(220);
}

function draw1() {
  text('Hello', 200, 200);
}
function draw2() {
  text('World', 200, 200);
}
