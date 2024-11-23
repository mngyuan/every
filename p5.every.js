let _context;

p5.prototype.every = function (n) {
  // Reset context; we want every() to be like a setup(),
  // called once per sketch to register
  _context = {
    scene: -1,
    sceneFs: [],
    mouseListeners: [],
    keyboardListeners: [],
    skippedFrames: 0,
  };
  console.log(p5.prototype);

  const genTimeObject = (multiplier) => {
    const myself = {
      show: function (drawF, len) {
        _context.sceneFs.push({
          drawF,
          len: (len ?? n) * p5.prototype.getTargetFrameRate(),
        });
        return myself;
      },
      untilMousePressed: function () {
        // Assume the last one is what we're working on
        _context.sceneFs[_context.sceneFs.length - 1].untilMousePressed = true;
        return myself;
      },
      untilKeyPressed: function (keycode) {
        _context.sceneFs[_context.sceneFs.length - 1].untilKeyPressed =
          keycode ?? true;
        return myself;
      },
      until: function () {},
      if: function () {},
    };
    return myself;
  };

  const secondsObj = genTimeObject(1);
  const minutesObj = genTimeObject(60);
  const hoursObj = genTimeObject(60 * 60);
  const daysObj = genTimeObject(60 * 60 * 24);

  return {
    seconds: secondsObj,
    minutes: minutesObj,
    hours: hoursObj,
    days: daysObj,
  };
};

p5.prototype.chooseScene = function () {
  // 'len' is counted in frames; calculate the total length
  const totalLenOfScenes = _context.sceneFs.reduce(
    (acc, {len}) => acc + len,
    0,
  );
  const cyclicFrameCount =
    (this.frameCount + _context.skippedFrames) % totalLenOfScenes;

  // Pick scene from _context.sceneFs based on cyclicFrameCount and ranges of len
  let len = 0,
    i;
  for (i = 0; i < _context.sceneFs.length; i++) {
    len += _context.sceneFs[i].len;
    if (cyclicFrameCount < len) {
      break;
    }
  }
  if (_context.scene != i) {
    // Changing scenes

    // Remove existing listeners
    _context.mouseListeners.map((listener) =>
      document.removeEventListener('mousedown', listener),
    );
    _context.keyboardListeners.map((listener) =>
      document.removeEventListener('keydown', listener),
    );
    // Add new scene's listeners
    if (_context.sceneFs[i].mousePressed) {
      document.addEventListener('mousedown', _context.sceneFs[i].mousePressed);
      _context.mouseListeners.push(_context.sceneFs[i].mousePressed);
    }
    if (_context.sceneFs[i].untilMousePressed) {
      const listener = () => {
        // just skip to the start of the next scene
        // need to recompute this otherwise the closure uses the old value from the outer scope
        const cyclicFrameCount =
          (this.frameCount + _context.skippedFrames) % totalLenOfScenes;
        _context.skippedFrames += len - cyclicFrameCount; // _context.skippedFrames = _context.skippedFrames % totalLenOfScenes;
      };
      document.addEventListener('mousedown', listener);
      _context.mouseListeners.push(listener);
    }
    if (_context.sceneFs[i].untilKeyPressed) {
      const listener = (e) => {
        // check keycode
        if (
          _context.sceneFs[_context.scene].untilKeyPressed === true ||
          e.key == _context.sceneFs[_context.scene].untilKeyPressed
        ) {
          // just skip to the start of the next scene
          // need to recompute this otherwise the closure uses the old value from the outer scope
          const cyclicFrameCount =
            (this.frameCount + _context.skippedFrames) % totalLenOfScenes;
          _context.skippedFrames += len - cyclicFrameCount; // _context.skippedFrames = _context.skippedFrames % totalLenOfScenes;
        }
      };
      document.addEventListener('keydown', listener);
      _context.keyboardListeners.push(listener);
    }

    _context.scene = i;
  }
  _context.sceneFs[_context.scene] && _context.sceneFs[_context.scene].drawF();
};
p5.prototype.registerMethod('post', p5.prototype.chooseScene);
p5.prototype.unregisterMethod('remove', p5.prototype.chooseScene);
