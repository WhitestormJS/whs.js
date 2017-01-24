import test from 'ava';
import * as WHS from '../../build/whitestorm.js';

const app = new WHS.App();
const loop = new WHS.Loop(() => {}, false);

app.start();

test('.start()', t => {
  loop.start(app);
  t.true(loop.enabled);
});

test('.stop()', t => {
  loop.stop(app);
  t.false(loop.enabled);
});

test('.execute()', t => {
  new WHS.Loop(() => t.pass()).execute();
});
