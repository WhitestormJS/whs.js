import './polyfill';
import * as WHS from '../src/index';
import {FogModule} from '../src/modules/app/FogModule';
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


// TODO move Modules tests into individual specs
const defaultFog = new FogModule();
test('FogModule', () => {
  modules.fog = defaultFog;
});
// TODO figure out a better approach to add assertions
// and cleaner way to assert object properties
test('Default Fog is a FogExp2', () => {
  expect(defaultFog.fog.isFogExp2).toBeTruthy();
});

test('Fog has the default color', () => {
  expect(defaultFog.fog.color.getHex()).toBe(0xefd1b5);
});

test('Fog has the default density', () => {
  expect(defaultFog.fog.density).toBe(0.020);
});

const linearFog = new FogModule({}, 'linear');
test('Linear Fog is a Fog', () => {
  expect(linearFog.fog.isFog).toBeTruthy();
});

test('Linear Fog has the default color', () => {
  expect(linearFog.fog.color.getHex()).toBe(0xefd1b5);
});

test('Linear Fog has the default near value', () => {
  expect(linearFog.fog.near).toBe(10);
});

test('Linear Fog has the default far value', () => {
  expect(linearFog.fog.far).toBe(1000);
});

const fogColor = 0xffffff;
const fogDensity = 0.025;
const customExp2Fog = new FogModule({color: fogColor, density: fogDensity});
test('Custom exp2 Fog is set with the constructor params', () => {
  expect(customExp2Fog.fog.color.getHex()).toBe(fogColor);
  expect(customExp2Fog.fog.density).toBe(fogDensity);
});

test('Applying basic modules to app', () => {
  app
    .module(modules.element)
    .module(modules.scene)
    .module(modules.camera)
    .module(modules.rendering)
    .module(modules.postprocessor)
    .module(modules.resize)
    .module(modules.mouse)
    .module(modules.fog);

  app.start();
});

test('OrbitModule', () => {
  modules.orbit = new WHS.controls.OrbitModule();
});

test('Applying controls modules to app', () => {
  app.module(modules.orbit);

  app.start();
});

test('DynamicGeometryModule', () => {
  modules.dym = new WHS.mesh.DynamicGeometryModule();
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
