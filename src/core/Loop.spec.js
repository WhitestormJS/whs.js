import {App, Loop} from './index';

const app = new App();
const loop = new Loop(() => {}, false);

app.start();

test('.start()', () => {
  loop.start(app);
  expect(loop.enabled).toBeTruthy();
});

test('.stop()', () => {
  loop.stop(app);
  expect(loop.enabled).toBeFalsy();
});

test('.execute()', done => {
  new Loop(() => done()).execute();
});
