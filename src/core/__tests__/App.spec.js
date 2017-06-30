import * as WHS from '../../index';

/*
 * Ignored methods:
 *
 * - .addLoop() & .removeLoop() - Used in Loop tests;
 * - .modules() - Piped version of .applyModule();
 * - .add() - Component-specific method that relies on .native;
 *
 */

const app = new WHS.App();
app.start();

test('.applyModule()', () => {
  const module = new WHS.SceneModule();
  expect(app.applyModule(module)).toBe(module);
});

test('.module()', () => {
  const sceneModule = new WHS.SceneModule();
  const cameraModule = new WHS.DefineModule('camera', new WHS.PerspectiveCamera());

  // Module chain
  app
    .module(sceneModule)
    .module(cameraModule);

  expect(app.modules).toContain(sceneModule);
  expect(app.modules).toContain(cameraModule);
});
