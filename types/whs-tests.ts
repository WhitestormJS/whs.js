import {MeshStandardMaterial} from 'three';

import {
  Loop,
  Component,
  App,
  CameraComponent,
  LightComponent,
  MeshComponent
} from "./core";

import {
  Box, 
  Cone,
  CubeCamera,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere,
} from './components';

import {
  AmbientLight,
  AreaLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  SpotLight
} from './components/lights';

import {
  AnimationModule,
  DynamicGeometryModule,
  TextureModule,
} from './modules/mesh';

import {
  ControlsModule,
  ElementModule,
  EventsPatchModule,
  FogModule,
  OrbitControlsModule,
  PostProcessorModule,
  RenderingModule,
  ResizeModule,
  SceneModule,
  StateModule,
  VirtualMouseModule
} from './modules/app';

import {DefineModule} from './modules';

// Core
const app = new App();
app.start();

let loop = new Loop(() => {});
loop = new Loop(() => {}, true);

loop.start(app);
loop.stop(app);
loop.execute();

const component = new Component();
component.addTo(app);
component.clone();
const component2 = new Component();
component.copy(component2);

// Testing parent of component (ModuleSystem)
// TODO pass module type
component.integrateModules();
component.applyModule(null);
const map = component.applyBridge();
component.disposeModule(null);
component.disposeModules();
component.module(null).disposeModules();

const camera = new CameraComponent();
const clonedCamera = camera.clone();


// Meshes

const mesh = new MeshComponent({});
mesh.addTo(app);
mesh.clone();
mesh.copy({});
mesh.build();

const box = new Box({
  build: false,
  position: {
    x: 1
  },

  material: new MeshStandardMaterial()
});
box.build();
box.addTo(app);

const sphere = new Sphere({
  build: false,
  position: {
    x: 1
  },

  material: new MeshStandardMaterial()
});
sphere.buildGeometry({buffer: true});
sphere.addTo(app);

const cone = new Cone({build: false});
cone.buildGeometry({buffer: true});
cone.addTo(app);

// Cameras

const cubeCamera = new CubeCamera({
  build: false,
  
  position: {
    x: 1,
    y: 10,
    z: 0
  }
});
const nativeCubeCamera = cubeCamera.build();

const orthographicCamera = new OrthographicCamera({
  build: false,
  far: 100
});
const orthographicCameraNative = orthographicCamera.build();

const perspectiveCamera = new PerspectiveCamera({
  build: false,
  far: 100
});
perspectiveCamera.wrap
const perspectiveCameraNative = orthographicCamera.build();


// Lights

const light = new LightComponent({build: false});
light.build();
const clonedLight = light.clone();
const copiedLight = light.copy(clonedLight);
copiedLight.wrap();
copiedLight.addTo(app);

const ambientLight = new AmbientLight({
  color: 0xffffff,
  intensity: 0.5
});
ambientLight.addTo(app);

const areaLight = new AreaLight({build: false});
areaLight.build();
areaLight.addTo(app);

const hemisphereLight = new HemisphereLight({ 
  build: false
});
hemisphereLight.build();
hemisphereLight.addTo(app);

const pointLight = new PointLight({build: false});
pointLight.build();
pointLight.addTo(app);

const spotLight = new SpotLight({build: false});
spotLight.build();
spotLight.addTo(app);

// Mesh Modules

const animationModule = new AnimationModule(app, false, {speed: 1.2});
animationModule.play('clip');

const dynamicGeometryModule = new DynamicGeometryModule({attributes: false});

let textureModule = new TextureModule([{
    url: 'some/path',
    type: 'map'
  }]
);
textureModule = new TextureModule({
    url: 'some/path',
    type: 'bumpMap'
  }
);

// app Modules

const controlsModule = new ControlsModule();
const orbitControlsModule = new OrbitControlsModule();

const elementModule = new ElementModule(document.getElementById('app'));
elementModule.createElement();

const eventsPatchModule = new EventsPatchModule();
eventsPatchModule.patchEvents(null, null, ['mouseup', 'mousedown']);

const fogModule = new FogModule({}, 'linear');

const postProcessorModule = new PostProcessorModule();
postProcessorModule.render();
postProcessorModule.renderToScreen(true);

const renderingModule = new RenderingModule();
renderingModule.play();
renderingModule.stop();
renderingModule.dispose();

const resizeModule = new ResizeModule({auto: true});
resizeModule.addAutoresize();
resizeModule.addCallback(function() {console.log('called back')});
resizeModule.setSize(10, 10);
resizeModule.trigger();

const sceneModule = new SceneModule(false);

const stateModule = new StateModule();
const data = stateModule.get('key');

const virtualMouseModule = new VirtualMouseModule();
virtualMouseModule.hovers(new Box(), false);
virtualMouseModule.track(new Sphere(), false);

const defineModule = new DefineModule('camera', 
  new PerspectiveCamera({
    build: false,
    far: 100
  })
);
new App([defineModule]);
