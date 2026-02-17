// Console logs should appear once a second

function setup() {
  createCanvas(400, 400);
  every().seconds.do(() => console.log(millis()));
}

function draw() {
  text('Check console logs', 200, 200);
}
