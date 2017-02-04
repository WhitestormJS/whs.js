import * as WHS from '../src/index';

const app = new WHS.App();
const modules = {};

test('ElementModule', () => {
  modules.element = new WHS.app.ElementModule();
});

test('SceneModule', () => {
  modules.scene = new WHS.app.SceneModule();
});

test('CameraModule', () => {
  modules.camera = new WHS.app.CameraModule();
});

test('Applying basic modules to app', () => {
  app
    .module(modules.element)
    .module(modules.scene)
    .module(modules.camera);

  app.start();
});

test('OrbitModule', () => {
  modules.orbit = new WHS.controls.OrbitModule();
})

test('FirstPersonModule', () => {
  modules.fps = new WHS.controls.FirstPersonModule();
})

// TODO: fix applying controls
// test('Applying controls modules to app', () => {
//   app
//     .module(modules.orbit)
//     .module(modules.fps);
//
//   app.start();
// });
