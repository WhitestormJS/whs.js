import {
  Loop,
  Component,
  App,
  CameraComponent,
  LightComponent,
  MeshComponent
} from "./core";
import {MeshStandardMaterial} from 'three';

import {Box, Sphere} from './components';

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

const light = new LightComponent({});
const clonedLight = light.clone();
const copiedLight = light.copy(clonedLight);
copiedLight.wrap();
copiedLight.addTo(app);

const mesh = new MeshComponent({});
mesh.addTo(app);
mesh.clone();
mesh.copy({});
mesh.build();

const box = new Box({
  position: {
    x: 1
  },
  material: new MeshStandardMaterial()
});
box.addTo(app);

const sphere = new Sphere({
  position: {
    x: 1
  },
  material: new MeshStandardMaterial()
});
sphere.addTo(app);
