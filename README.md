# `every()` - Time based media for p5.js

# API Proposal - Request for Comments

`every()` helps you schedule scene changes in p5.js and more, for easily working on time-based media.

```javascript
// A 6 minute loop, with 3 different scenes, each 2 minutes long
every(2).minutes
  .show(draw1)
  .show(draw2)
  .show(draw3);
```
```javascript
every(1).hours
  .show(draw1)
  .show(draw2);
```

The 24-hour clock piece by Christian Marclay: 
```javascript
const videos = [vid1200, vid1201, ..., vid2359];
every(1).seconds
  .showAll(videos);
```

You can provide different times to different scenes; in this case the number in `every()` indicates the default time if no time is provided for a scene.

```javascript
every(5).seconds
  .show(draw1) // shows for 5 seconds
  .show(draw2, 6)
  .show(draw3, 4);
```

Similarly, you can provide different interactions to different scenes.

```javascript
every(5).seconds
  .show(draw1, 5, {mousePressed: scene1MousePress, keyPressed: scene1Keypress})
  .show(draw2, 6)
  .show(draw3, 4, {mousePressed: scene3MousePress, keyPressed: scene3Keypress});
```

You can also only transition scenes if a condition is met; in this case, a scene ends when it has `reportDone()`'d, which optionally takes a delay.

```javascript
every(5).seconds
  .show(draw1).until()
  .show(draw2);
function draw1(reportDone) {
  if (mouseIsPressed) {
    // end 2s after mouse press
    reportDone(2000);
  }
}
```

A scene can be skipped if a certain condition is not met.

```javascript
every(5).seconds
  .show(draw1)
  .show(draw2).if(checkDraw2Visible);
function checkDraw2Visible() {
  return shouldShowDraw2;
}
```

*Experimental* - You can also provide a timestamped list of events to `every()` to schedule events at specific times. Useful for playing back recorded performances i.e. MIDI performances.

```javascript
const recordedEvents = {0: [1], 5000: [2], 10000: [3]};
every(recordedEvents).timestamp
  .react(1, draw1)
  .react(2, draw2)
  .react(3, draw3);
```
