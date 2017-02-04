import * as WHS from '../build/whitestorm';

/*
 * Ignored methods:
 *
 * - .addLoop() & .removeLoop() - Used in Loop tests;
 * - .modules() - Piped version of .applyModule();
 * - .add() - Component-specific method that relies on .native;
 *
 */

const app = new WHS.App();

test('.start()', () => {
  app.start();
});

test('.applyModule()', t => {
  const module = new WHS.app.SceneModule();
  expect(app.applyModule(module)).toBe(module);
});

test('.module()', t => {
  // Module chain
  app
    .module(new WHS.app.SceneModule())
    .module(new WHS.app.CameraModule());
});
