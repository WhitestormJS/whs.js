import {connect} from '../../api';

import {
  App,
  Component,
  TreeModule,
  RenderingModule,
  ResizeModule,
  ControlsModule
} from '@whs/core';

const {ready} = connect();

const APP_SIZE = [window.innerWidth, window.innerHeight];

const app = new App([
  App.define(({onUpdate}) => ({
    size: APP_SIZE,
    camera: new Component.Camera({
      camera: new THREE.PerspectiveCamera(45, APP_SIZE[0] / APP_SIZE[1], 1, 1000),
      position: [0, 0, 10],
    }).autoSizeUpdate(onUpdate),
    container: document.body
  })),
  new TreeModule(), // Add manager.scene & app.add()
  new RenderingModule(), // Renderer + renderLoop
  new ResizeModule()
]);

const sphere = new Component.Mesh({
  geometry: new THREE.SphereGeometry(1, 8, 8),
  material: new THREE.MeshBasicMaterial({color: 0x0000ff})
});

app.add(sphere);
app.start();

ready();
