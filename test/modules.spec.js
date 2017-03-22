import './polyfill';
import * as WHS from '../src/index';
import gl from 'gl';

const app = new WHS.App();
const modules = {};

// console.log((typeof performance === 'undefined' ? Date : performance).now());

test('ElementModule', () => {
  modules.element = new WHS.app.ElementModule();
});

test('SceneModule', () => {
  modules.scene = new WHS.app.SceneModule();
});

test('CameraModule', () => {
  modules.camera = new WHS.app.CameraModule();
});

test('RenderingModule', () => {
  modules.rendering = new WHS.app.RenderingModule({
    renderer: {
      context: gl(10, 10)
    }
  });
});

test('PostProcessorModule', () => {
  modules.postprocessor = new WHS.app.PostProcessorModule();
});

test('ResizeModule', () => {
  modules.resize = new WHS.app.ResizeModule();
});

test('VirtualMouseModule', () => {
  modules.mouse = new WHS.app.VirtualMouseModule();
});

test('Applying basic modules to app', () => {
  app
    .module(modules.element)
    .module(modules.scene)
    .module(modules.camera)
    .module(modules.rendering)
    .module(modules.postprocessor)
    .module(modules.resize)
    .module(modules.mouse);

  app.start();
});

test('OrbitModule', () => {
  modules.orbit = new WHS.controls.OrbitModule();
});

test('Applying controls modules to app', () => {
  app.module(modules.orbit);

  app.start();
});

describe('DynamicGeometryModule', () => {
  modules.dym = new WHS.mesh.DynamicGeometryModule();
  test('has false attributes by default', () => {
    expect(modules.dym.attributes).toBeFalsy();
  });
});

test('TextureModule', () => {
  modules.texture = new WHS.mesh.TextureModule({
    url: 'myurl.png'
  });
});

// TODO: fix applying modules to mesh
// test('Applying modules to mesh', () => {
//   const element = new WHS.Sphere();
//
//   element
//     .module(modules.dym)
//     .module(modules.texture);
//
//   element.start();
// });
