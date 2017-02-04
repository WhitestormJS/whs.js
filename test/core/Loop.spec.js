import * as WHS from '../build/whitestorm';

const app = new WHS.App();
const loop = new WHS.Loop(() => {}, false);

app.start();

test('.start()', () => {
  loop.start(app);
  expect(loop.enabled).toBeTruthy();
});

test('.stop()', () => {
  loop.stop(app);
  expect(loop.enabled).toBeFalsy();
});

test('.execute()', (done) => {
  new WHS.Loop(() => done()).execute();
});
