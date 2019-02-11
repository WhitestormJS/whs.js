import {connect} from '../../api';

import {
  App,
  Component,
  TreeModule,
  RenderingModule,
  ResizeModule,
  ControlsModule
} from '@whs/core';

import {
  WorldModule,
  RigidbodyModule,
  AmmoEngine,
} from '@whs/physics';

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
  new RenderingModule(),
  new WorldModule({
    engine: new AmmoEngine({
      path: window.origin + '/assets/ammo.js'
    })
  })
]);

const sphere = new Component.Mesh({
  geometry: new THREE.SphereGeometry(0.5, 16, 16),
  material: new THREE.MeshLambertMaterial({color: 0xff0000}),
  position: [1, 0, 0],
  modules: [
    new RigidbodyModule({type: 'sphere', radius: 0.5, restitution: 0.5, friction: 1})
  ]
});

const sphere2 = new Component.Mesh({
  geometry: new THREE.SphereGeometry(0.5, 16, 16),
  material: new THREE.MeshLambertMaterial({color: 0x00ff00}),
  position: [0.5, 3, 0],
  modules: [
    new RigidbodyModule({type: 'sphere', radius: 0.5, restitution: 0.5, friction: 1})
  ]
});

const box = new Component.Mesh({
  geometry: new THREE.BoxGeometry(4, 0.2, 4),
  material: new THREE.MeshLambertMaterial({color: 0x0000ff}),
  position: [0, -3, 0],
  modules: [
    new RigidbodyModule({type: 'box', size: [4, 0.2, 4], mass: 0, restitution: 1, friction: 1})
  ]
});

app.add(sphere);
app.add(sphere2);
app.add(box);

app.add({native: new THREE.AmbientLight(0xaaaaaa)});
app.add(new Component.Light({
  light: new THREE.DirectionalLight(0xffffff, 0.5),
  position: [1, 1, 0]
}));

app.start();

ready();
