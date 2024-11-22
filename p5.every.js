let _context;

p5.prototype.every = function (n) {
  // Reset context; we want every() to be like a setup(),
  // called once per sketch to register
  _context = {scene: 0, sceneFs: []};

  const genTimeObject = (multiplier) => {
    const myself = {
      show: function (drawF, len) {
        _context.sceneFs.push({
          drawF,
          len: (len || n) * p5.prototype.getTargetFrameRate(),
        });
        return myself;
      },
      untilMousePressed: function () {},
      untilKeyPressed: function () {},
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
  const cyclicFrameCount =
    this.frameCount % _context.sceneFs.reduce((acc, {len}) => acc + len, 0);

  // Pick scene from _context.sceneFs based on cyclicFrameCount and ranges of len
  let len = 0;
  for (let i = 0; i < _context.sceneFs.length; i++) {
    len += _context.sceneFs[i].len;
    if (cyclicFrameCount < len) {
      _context.scene = i;
      break;
    }
  }
  _context.sceneFs[_context.scene] && _context.sceneFs[_context.scene].drawF();
};
p5.prototype.registerMethod('post', p5.prototype.chooseScene);
p5.prototype.unregisterMethod('remove', p5.prototype.chooseScene);
