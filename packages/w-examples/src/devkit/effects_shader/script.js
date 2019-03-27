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
  BloomEffect
} from '@whs/devkit/effects';

const {ready} = connect();

class CustomEffectModule {
  setup(app, {manager}) {
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        inputBuffer: new THREE.Uniform()
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D inputBuffer;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          uv.y += sin(vUv.x * 100.0) * 0.1;
          vec3 color = texture2D(inputBuffer, uv).xyz;
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    manager.effects
      .render()
      .shader(shaderMaterial, true);
  }
}

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
  new EffectsModule(),
  new CustomEffectModule()
]);

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
