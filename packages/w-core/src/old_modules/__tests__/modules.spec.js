import '../../polyfill';
import * as WHS from '../../index';
import {
  Scene,
} from 'three';
import {FogModule} from '../app/FogModule';
import gl from 'gl';
import { Box } from '../../index';

const app = new WHS.App();
const modules = {};

// console.log((typeof performance === 'undefined' ? Date : performance).now());

test('ElementModule', () => {
  modules.element = new WHS.ElementModule();
});

test('SceneModule', () => {
  modules.scene = new WHS.SceneModule();
});

test('SceneModule .add() & .remove()', async () => {
  const a = new WHS.App([
    new WHS.SceneModule(),
  ]);
  const b = new WHS.Box();
  const g = new WHS.Group();

  expect(a.children.length).toBe(0);
  await a.add(g);
  expect(a.children.length).toBe(1);
  await a.add(g);
  expect(a.children.length).toBe(1);
  await a.add(b);
  expect(a.children.length).toBe(2);
  await g.add(b);
  expect(a.children.length).toBe(1);
  expect(g.children.length).toBe(1);
  await a.remove(g);
  expect(a.children.length).toBe(0);
});

test('SceneModule .setScene() & .getScene()', async () => {
  const a = new WHS.App([
    new WHS.SceneModule(),
  ]);
  const b = new WHS.Box();
  expect(a.children.length).toBe(0);
  await a.add(b);
  expect(a.children.length).toBe(1);
  const oldS = a.getScene();
  const s = new Scene();
  a.setScene(s);
  expect(a.children.length).toBe(0);
  a.setScene(oldS);
  expect(a.children.length).toBe(1);
})

test('DefineModule', () => {
  modules.camera = new WHS.DefineModule('camera', new WHS.PerspectiveCamera());
});

test('RenderingModule', () => {
  modules.rendering = new WHS.RenderingModule({
    renderer: {
      context: gl(10, 10)
    }
  });
});

test('PostProcessorModule', () => {
  modules.postprocessor = new WHS.PostProcessorModule();
});

test('ResizeModule', () => {
  modules.resize = new WHS.ResizeModule();
});

test('VirtualMouseModule', () => {
  modules.mouse = new WHS.VirtualMouseModule();
});

// TODO move Modules tests into individual specs
const defaultFog = new FogModule();
test('FogModule', () => {
  modules.fog = defaultFog;
});
describe('Default Fog', () => {
  test('is a FogExp2', () => {
    expect(defaultFog.fog.isFogExp2).toBeTruthy();
  });

  test('has the default color', () => {
    expect(defaultFog.fog.color.getHex()).toBe(0xefd1b5);
  });

  test('has the default density', () => {
    expect(defaultFog.fog.density).toBeCloseTo(0.020);
  });
});

describe('Linear Fog', () => {
  const linearFog = new FogModule({}, 'linear');
  test('is a Fog', () => {
    expect(linearFog.fog.isFog).toBeTruthy();
  });

  test('has the default color', () => {
    expect(linearFog.fog.color.getHex()).toBe(0xefd1b5);
  });

  test('has the default near value', () => {
    expect(linearFog.fog.near).toBe(10);
  });

  test('has the default far value', () => {
    expect(linearFog.fog.far).toBe(1000);
  });
});

describe('Custom Fog', () => {
  const fogColor = 0xffffff;
  const fogDensity = 0.025;
  const customExp2Fog = new FogModule({color: fogColor, density: fogDensity});
  test('is set with the color param', () => {
    expect(customExp2Fog.fog.color.getHex()).toBe(fogColor);
  });
  test('s set with the density param', () => {
    expect(customExp2Fog.fog.density).toBeCloseTo(fogDensity);
  });
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
  modules.orbit = new WHS.OrbitControlsModule();
});

test('Applying controls modules to app', () => {
  app.module(modules.orbit);

  app.start();
});

describe('DynamicGeometryModule', () => {
  modules.dym = new WHS.DynamicGeometryModule();

  test('has false attributes by default', () => {
    expect(modules.dym.attributes).toBeFalsy();
  });
});

test('TextureModule', () => {
  modules.texture = new WHS.TextureModule({
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
