import {connect} from '../../api';

import {
  App,
  Component,
  TreeModule,
  RenderingModule,
  ResizeModule,
  ControlsModule,
} from '@whs/core';

import {
  EffectsModule,
  BloomEffect,
  BlendFunction
} from '@whs/devkit/effects';

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
  new ControlsModule(({camera, renderer}) => new THREE.OrbitControls(camera.native, renderer.domElement)),
  new EffectsModule()
]);

const bloomEffect = new BloomEffect({
  blendFunction: BlendFunction.SCREEN,
  resolutionScale: 0.2,
  distinction: 0.2
});

bloomEffect.blendMode.opacity.value = 4.0;

app.manager.effects
  .render()
  .effect(bloomEffect, true);

const sphere = new Component.Mesh({
  geometry: new THREE.SphereGeometry(1, 16, 16),
  material: new THREE.MeshBasicMaterial({color: 0xff0000})
});

const sphere2 = new Component.Mesh({
  geometry: new THREE.SphereGeometry(1, 16, 16),
  material: new THREE.MeshBasicMaterial({color: 0x0000ff}),
  position: [1, 0, 0]
});

app.add(sphere);
app.add(sphere2);
app.start();

ready();
