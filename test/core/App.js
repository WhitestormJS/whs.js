import test from 'ava';
import * as WHS from '../../build/whitestorm.js';

/*
 * Ignored methods:
 *
 * - .addLoop() & .removeLoop() - Used in Loop tests;
 * - .modules() - Piped version of .applyModule();
 * - .add() - Component-specific method that relies on .native;
 *
 */

const app = new WHS.App();

test('.start()', t => {
  t.notThrows(() => {
    app.start();
  });
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
