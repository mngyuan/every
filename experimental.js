// Should it be cycle or do (or omit entirely)
every(5).seconds.cycle([draw1, draw2, draw3]);
every(5).seconds.do(draw1);
// Every other - is this useful
every(2).other().minutes.do(draw1);
// Respond to events - is this part of the remit
every().mousePress.do(draw1);
every(4).other().mousePress(draw1);
// .cycle doesn't handle different length scenes
every(5).seconds.draw(draw1, 5).draw(draw2, 6).draw(draw3, 5);
// what if different scenes have different interactions?
every(5)
  .seconds.draw(draw1, 5, scene1MousePress, scene1Keypress)
  .draw(draw2, 6)
  .draw(draw3, 5);
// what if a scene should play until some condition is met?
every(5)
  .seconds.draw(draw1, () => scene1Done)
  .draw(draw2)
  .draw(draw3);
// or maybe scenes can return completions
every(5).seconds.drawUntilDone(draw1).draw(draw2);
draw1 = () => 'done';
// What if a scene should just wait after a delay?
every(5)
  .seconds.drawUntil(draw1, () => scene1Done)
  .draw(draw2);
draw1 = () => {
  setTimeout(() => (scene1Done = true), 5000);
};
// or promise style?
every(5).seconds.drawUntil(draw1).draw(draw2);
draw1 = (resolve) => {
  setTimeout(resolve, 5000);
};
// or promise style with less presupposed knowledge on promises?
every(5).seconds.drawUntil(draw1).draw(draw2);
draw1 = (reportDone) => {
  reportDone(5000);
};
// Should you be able to insert scenes?
timeline = every(5).seconds.draw(draw1).draw(draw2);
timeline.draw(draw3);
timeline.Nth(2).draw(draw4); // inserts draw4 after draw2
// Should scenes pass data to each other?
every(5).seconds.drawUntil(draw1).draw(draw2);
draw1 = (resolve) => {
  resolve('foo');
};
draw2 = (resolve, lastSceneData) => {
  console.log(lastSceneData);
};
// or maybe this should just be handled with global variables
// Maybe, you'll insert a scene, and later want to turn it off? or maybe insteaad
// of inserting/deleting you just need to toggle on/off?
every(5).seconds.draw(draw1).draw(draw2).if(checkDraw2Visible);
function checkDraw2Visible() {
  return draw2Visible;
}
// What about running through a sequence of prerecorded events i.e. symphonyinacid.net
every(midiEvent).timestamp.react(processMidiEvent);
every(recordedEvents).timestamp.react(processRecordedEvent);
const recordedEvents = {0: [1], 5000: [2], 10000: [3]};
const processRecordedEvent = (event) => {
  switch (event) {
    case 1:
      draw1();
      break;
    case 2:
      draw2();
      break;
    case 3:
      draw3();
      break;
  }
};
// or maybe avoiding the switch
every(recordedEvents).timestamp.react(1, draw1).react(2, draw2).react(3, draw3);
