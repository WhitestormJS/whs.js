import test from 'ava';
import * as WHS from '../../build/whitestorm.js';

const app = new WHS.App();

test('.start()', t => {
  app.start();
  t.pass();
});

test('.applyModule()', t => {
  const module = new WHS.app.SceneModule();
  t.is(app.applyModule(module), module);
});

test('.module()', t => {
  // Module chain
  t.notThrows(() => {
    app
      .module(new WHS.app.SceneModule())
      .module(new WHS.app.CameraModule());
  });
});
