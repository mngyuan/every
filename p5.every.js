let _context;

const skipToNextScene = (frameCount, len) => {
  const totalLenOfScenes = _context.sceneFs.reduce(
    (acc, {len}) => acc + len,
    0,
  );
  // need to recompute this otherwise the closure uses the old value from the outer scope
  const cyclicFrameCount =
    (frameCount + _context.skippedFrames) % totalLenOfScenes;
  _context.skippedFrames += len - cyclicFrameCount;
  _context.skippedFrames = _context.skippedFrames % totalLenOfScenes;
  if (_context.timerPaused) {
    _context.timerPaused = false;
  }
};

const calculateCurrentScene = (frameCount) => {
  // 'len' is counted in frames; calculate the total length
  const totalLenOfScenes = _context.sceneFs.reduce(
    (acc, {len}) => acc + len,
    0,
  );
  const cyclicFrameCount =
    (frameCount + _context.skippedFrames) % totalLenOfScenes;
  // Pick scene from _context.sceneFs based on cyclicFrameCount and ranges of len
  let len = 0,
    i;
  for (i = 0; i < _context.sceneFs.length; i++) {
    len += _context.sceneFs[i].len;
    if (cyclicFrameCount < len) {
      break;
    }
  }
  return [i, len];
};

p5.prototype.every = function (n = 1) {
  // Reset context; we want every() to be like a setup(),
  // called once per sketch to register
  _context = {
    scene: -1,
    sceneFs: [],
    mouseListeners: [],
    keyboardListeners: [],
    skippedFrames: 0,
    timerPaused: false,
  };

  const genTimeObject = (multiplier) => {
    const myself = {
      show: function (drawF, len) {
        _context.sceneFs.push({
          drawF,
          passedLen: len,
          len: (len ?? n) * p5.prototype.getTargetFrameRate() * multiplier,
        });
        return myself;
      },
      showAll: function (drawFs) {
        _context.sceneFs = _context.sceneFs.concat(
          drawFs.map((drawF) => ({
            drawF,
            len: n * p5.prototype.getTargetFrameRate() * multiplier,
          })),
        );
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
      until: function () {
        return myself;
      },
      if: function (predicate) {
        _context.sceneFs[_context.sceneFs.length - 1].if = predicate;
        return myself;
      },
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
  if (_context != undefined) {
    if (!_context.timerPaused) {
      let [i, len] = calculateCurrentScene(this.frameCount);

      if (_context.scene != i) {
        // Changing scenes

        // Remove existing listeners
        _context.mouseListeners.map((listener) =>
          document.removeEventListener('mousedown', listener),
        );
        _context.keyboardListeners.map((listener) =>
          document.removeEventListener('keydown', listener),
        );
        // Check new scene(s)'s predicate
        let checked = [];
        while (_context.sceneFs[i].if && _context.sceneFs[i].if()) {
          if (checked.includes((i + 1) % _context.sceneFs.length)) {
            // We've checked all scenes, none of them passed
            break;
          }
          checked.push(i);
          // skip to the start of the next scene
          skipToNextScene(this.frameCount, len);
          [i, len] = calculateCurrentScene(this.frameCount);
        }
        // Add new scene's listeners
        if (_context.sceneFs[i].mousePressed) {
          document.addEventListener(
            'mousedown',
            _context.sceneFs[i].mousePressed,
          );
          _context.mouseListeners.push(_context.sceneFs[i].mousePressed);
        }
        if (_context.sceneFs[i].untilMousePressed) {
          if (_context.sceneFs[i].passedLen) {
            // Even though untilMousePressed was passed, a length was also passed, so
            // this scene will still countdown
          } else {
            _context.timerPaused = true;
          }
          const listener = () => {
            // just skip to the start of the next scene
            skipToNextScene(this.frameCount, len);
          };
          document.addEventListener('mousedown', listener);
          _context.mouseListeners.push(listener);
        }
        if (_context.sceneFs[i].untilKeyPressed) {
          if (_context.sceneFs[i].passedLen) {
            // Even though untilKeyPressed was passed, a length was also passed, so
            // this scene will still countdown
          } else {
            _context.timerPaused = true;
          }
          const listener = (e) => {
            // check keyCode, which is deprecated, but p5 still uses
            if (
              _context.sceneFs[_context.scene].untilKeyPressed === true ||
              e.keyCode == _context.sceneFs[_context.scene].untilKeyPressed
            ) {
              // just skip to the start of the next scene
              skipToNextScene(this.frameCount, len);
            }
          };
          document.addEventListener('keydown', listener);
          _context.keyboardListeners.push(listener);
        }

        if (_context.scene !== -1) {
          pop();
        }
        push();
        _context.scene = i;
      }
    }

    _context.sceneFs[_context.scene] &&
      _context.sceneFs[_context.scene].drawF();
  }
};
p5.prototype.registerMethod('post', p5.prototype.chooseScene);
p5.prototype.unregisterMethod('remove', p5.prototype.chooseScene);
