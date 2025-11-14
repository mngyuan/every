# `every()` - Time based media for p5.js

`every()` helps you schedule scene changes in p5.js and more, for easily working on time-based media.

```javascript
// A 6 minute loop, with 3 different scenes, each 2 minutes long
every(2).minutes
  .draw(draw1)
  .draw(draw2)
  .draw(draw3);
```
```javascript
every(1).hours
  .draw(draw1)
  .draw(draw2);
```

[The Clock by Christian Marclay](https://editor.p5js.org/mngyuan/sketches/9_9gpe_Vh): 
```javascript
const videos = [vid1200, vid1201, ..., vid2359];
every(1).seconds
  .drawAll(videos);
```

# Installation

Download [`p5.every.js`](https://github.com/mngyuan/every/blob/main/p5.every.js) from this repository, and include it in your HTML file.

```html
<script src="path/to/p5.every.js"></script>
```

Replace `path/to/p5.every.js` with the actual path of where you've placed `p5.every.js`.

Or use the hosted version

```html
<script src="https://cdn.jsdelivr.net/gh/mngyuan/every/p5.every.js"></script>
```

# Usage

In p5.js, `every()` belongs in the `setup()` function:
```javascript
function setup() {
  createCanvas(400, 400);
  every().seconds
    .draw(drawScene1)
    .draw(drawScene2);
}
```
If no duration is passed to every, the duration defaults to 1.

You can provide different times to different scenes; in this case the number in `every()` indicates the default time if no time is provided for a scene.

```javascript
every(5).seconds
  .draw(draw1)     // shows for 5 seconds
  .draw(draw2, 6)  // shows for 6 seconds
  .draw(draw3, 4); // shows for 4 seconds
```

Similarly, you can provide different interactions to different scenes.

```javascript
every(5).seconds
  .draw(draw1, 5, {mousePressed: scene1MousePress, keyPressed: scene1Keypress})
  .draw(draw2, 6)
  .draw(draw3, 4, {mousePressed: scene3MousePress, keyPressed: scene3Keypress});
```

If you just need to change scenes when the mouse is clicked or a key is pressed,

```javascript
every(5).seconds
  .draw(draw1).untilKeyPressed([ENTER])
  .draw(draw2).untilMousePressed()
  .draw(draw3);
```

A scene can be skipped if a certain condition is not met.

```javascript
every(5).seconds
  .draw(draw1)
  .draw(draw2).if(checkDraw2Visible);

function checkDraw2Visible() {
  return keyPressed;
}
```

# Experimental APIs - [Request for Comments](https://github.com/mngyuan/every/issues/new)

You can also only transition scenes if a condition is met; in this case, a scene ends when it has `reportDone()`'d, which optionally takes a delay.

```javascript
every(5).seconds
  .draw(draw1).until()
  .draw(draw2);
function draw1(reportDone) {
  if (mouseIsPressed) {
    // end 2s after mouse press
    reportDone(2000);
  }
}
```

You can also provide a timestamped list of events to `every()` to schedule events at specific times. Useful for playing back recorded performances i.e. MIDI performances.

```javascript
const recordedEvents = {0: [1], 5000: [2], 10000: [3]};
every(recordedEvents).timestamp
  .react(1, draw1)
  .react(2, draw2)
  .react(3, draw3);
```
