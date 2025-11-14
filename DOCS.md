# every Documentation

## `.frames`, `.seconds`, `.minutes`, `.hours`, `.days`

You can specify the time unit for the duration passed to `every()`.

```javascript
every(30).frames
  .draw(draw1)
  .draw(draw2);
```

## `draw`

You can provide different times to different scenes; in this case the number in `every()` indicates the default time if no time is provided for a scene.

```javascript
every(5)
  .seconds.draw(draw1) // shows for 5 seconds
  .draw(draw2, 6)      // shows for 6 seconds
  .draw(draw3, 4);     // shows for 4 seconds
```

Similarly, you can provide different interactions to different scenes.

```javascript
every(5)
  .seconds.draw(draw1, 5, {
    mousePressed: scene1MousePress,
    keyPressed: scene1Keypress,
  })
  .draw(draw2, 6)
  .draw(draw3, 4, {mousePressed: scene3MousePress, keyPressed: scene3Keypress});
```

## `untilKeyPressed` and `untilMousePressed`

If you just need to change scenes when the mouse is clicked or a key is pressed,

```javascript
every(5)
  .seconds.draw(draw1)
  .untilKeyPressed([ENTER])
  .draw(draw2)
  .untilMousePressed()
  .draw(draw3);
```

## `if`

A scene can be skipped if a certain condition is not met.

```javascript
every(5).seconds.draw(draw1).draw(draw2).if(checkDraw2Visible);

function checkDraw2Visible() {
  return keyPressed;
}
```

## `drawAll`

[The Clock by Christian Marclay](https://editor.p5js.org/mngyuan/sketches/9_9gpe_Vh):

```javascript
const videos = [vid1200, vid1201, ..., vid2359];
every().seconds
  .drawAll(videos);
```

## `do`

If you want to do something once after a certain duration, you can use `do` instead of `draw`.
If you don't draw a background, this can be useful to add on top of the last scene.

```javascript
function setup() {
  createCanvas(400, 400);
  every().seconds
    .do(hello)
    .do(world);
  background('red');
}

function hello() {
  text('Hello', random(width), random(height));
}
function world() {
  text('World', random(width), random(height));
}

function draw() {}
```
