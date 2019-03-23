import {connect} from '../../api';
import {createSelector} from 'reselect';

import {
  App,
  Component,
  TreeModule,
  RenderingModule,
  ResizeModule,
  ControlsModule,
} from '@whs/core';

import {createComposer} from '@whs/devkit/redux';

import reduxStore from './store';

import Teapot from './Teapot';

const {ready} = connect();
const {compose, initialState} = createComposer(reduxStore);

const app = new App([
  compose((state) => ({
    size: state.app.size
  })),
  App.define({ // General app configuration
    camera: new Component.Camera({
      camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000),
      position: [0, 0, 10],
    }),
    container: document.body
  }),
  new TreeModule(), // Add manager.scene & app.add()
  new RenderingModule(),
  new ControlsModule(({camera, renderer}) => new THREE.OrbitControls(camera.native, renderer.domElement))
]);

const geometrySelector = createSelector(
  state => state.objects.sphereRadius,
  radius => new THREE.SphereGeometry(radius, 16, 16)
);

const sphere = new Component.Mesh({
  material: new THREE.MeshBasicMaterial({color: 0xff0000}),
  modules: [
    compose((state) => ({
      geometry: geometrySelector(state)
    }), {
      geometry: (mesh, geometry) => {
        mesh.native.geometry = geometry;
      }
    })
  ],
  position: [-2, 0, 0]
});

const teapot = new Teapot({
  position: [2, -0.5, 0],
  modules: [
    compose((state) => ({
      value: state.objects.teapotValue
    }), {
      value: (mesh, value) => {
        mesh.changeColorFromInt(value);
      }
    })
  ]
});

app.add(sphere);
app.add(teapot);
app.start();

ready();
