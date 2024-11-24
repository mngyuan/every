let timer;

function setup() {
  createCanvas(400, 400);

  every(5)
    .seconds.show(draw1)
    .untilMousePressed()
    .show(draw2, 8)
    .untilKeyPressed(ENTER)
    .show(draw3);
}

function draw() {
  background(220);
}

function draw1() {
  background('red');
}

function draw2() {
  background('blue');
  if (!timer) {
    timer = setTimeout(() => {
      console.log('8s');
      timer = null;
    }, 8000);
  }
}
function draw3() {
  background('green');
}
