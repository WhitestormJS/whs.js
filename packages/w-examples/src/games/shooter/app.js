import {connect} from '../../api';

import {
  App,
  Component,
  TreeModule,
  RenderingModule,
  ControlsModule,
} from '@whs/core';

import {WorldModule, AmmoEngine} from '@whs/physics';

import * as TWEEN from '@tweenjs/tween.js';

const {ready} = connect();

export const app = new App([
  App.define({ // General app configuration
    size: [window.innerWidth, window.innerHeight],
    camera: new Component.Camera({
      camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000),
      position: [0, 20, 50],
    }),
    container: document.body
  }),
  new TreeModule(), // Add manager.scene & app.add()
  new RenderingModule({clearColor: 0xffffff}, {antialias: true}),
  new WorldModule({
    engine: new AmmoEngine({
      path: window.origin + '/assets/ammo.js'
    })
  }),
  new ControlsModule(({camera, renderer}) => new THREE.OrbitControls(camera.native, renderer.domElement))
]);

export const store = new App.Store({
  gltf: new THREE.GLTFLoader()
});

app.add(
  new Component.Mesh({
    geometry: new THREE.SphereGeometry(1, 32, 32),
    material: new THREE.MeshBasicMaterial({color: 0xff0000})
  })
)

app.scene.add(new THREE.AmbientLight(0xffffff));
app.start();

app.loop(clock => {
  TWEEN.update();
});

ready();
