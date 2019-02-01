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
  App.define({ // General app configuration
    size: [window.innerWidth, window.innerHeight],
    camera: new Component.Camera({
      camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000),
      position: [0, 0, 10],
    }),
    container: document.body
  }),
  new TreeModule(), // Add manager.scene & app.add()
  new RenderingModule()
]);

const sphere = new Component.Mesh({
  geometry: new THREE.SphereGeometry(1, 8, 8),
  material: new THREE.MeshBasicMaterial({color: 0xff0000})
});

app.add(sphere);
app.start();

ready();
