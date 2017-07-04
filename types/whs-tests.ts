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
