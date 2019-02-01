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

const app = new App([
  App.define(
    { // General app configuration
      size: [window.innerWidth, window.innerHeight]
    }, // Configuration-dependent dependencies
    ({size}, {onUpdate}) => ({
      camera: new Component.Camera({
        camera: new THREE.PerspectiveCamera(45, size[0] / size[1], 1, 1000),
        position: [0, 0, 10],
      }).autoSizeUpdate(onUpdate),
      container: document.body,
    })
  ),
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
