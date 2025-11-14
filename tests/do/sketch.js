function setup() {
  createCanvas(400, 400);
  every().seconds.do(do1).do(do2);
  textAlign(CENTER);
  background('red');
}

function draw() {}

function do1() {
  text('Hello', random(width), random(height));
}

function do2() {
  text('World', random(width), random(height));
}

function keyPressed() {
  background('red');
}
