# `every()` - Manage time in p5.js

`every()` helps you schedule scene changes and more, for easily working with time in p5.js.

```javascript
function setup() {
  createCanvas(400, 400);
  every().seconds
    .draw(drawScene1)
    .draw(drawScene2);
}
```
```javascript
every(1).hours
  .draw(draw1)
  .draw(draw2);
```

# Installation

Add the following to the `<head>` in your `index.html`

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

You can also specify different durations, interactions, and conditions for each scene.

```javascript
every(5)
  .seconds.draw(draw1) // shows for 5 seconds
  .draw(draw2, 6)      // shows for 6 seconds
  .draw(draw3, 4, {
    mousePressed: scene3MousePress,
    keyPressed: scene3Keypress
  })
  .do(draw4).if(shouldDraw4);
```

Read more in the [documentation](DOCS.md) or check out the [examples](examples/).
