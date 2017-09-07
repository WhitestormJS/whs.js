import {Loop, ControlsModule, CameraComponent} from 'whs';
import {REVISION} from 'three';

import {VREffect} from './vr/VREffect';
import VRControlsNative from 'three-vrcontrols-module';
import {WEBVR} from './vr/WebVR';

export class VRModule {
  constructor(params = {}) {
    this.params = Object.assign(params, {
      message: true,
      button: true
    });

    this.scene = null;
    this.camera = null;
    this.effect = null;
  }

  manager(manager) {
    manager.define('vr');

    if (REVISION > 86) console.warn('Please use VRModule2 for Three.js ^0.87.0 (r87)');

    const rendering = manager.use('rendering');
    const renderer = manager.get('renderer');

    const resize = manager.use('resize');

    this.effect = new VREffect(renderer);

    this.scene = manager.get('scene');
    this.camera = manager.get('camera');

    rendering.effect(this.effect);

    // TODO: Fix resize.

    resize.addCallback((width, height) => {
      this.effect.setSize(+width, +height);
    });

    // WEBVR
    const {message, button} = this.params;

    if (message) WEBVR.checkAvailability().catch(message => {
			document.body.appendChild(WEBVR.getMessageContainer(message));
		});

    if (button) WEBVR.getVRDisplay(display => {
      document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
    });
  }
}

export class VR2Module {
  constructor() {
    this.display = new Promise(resolve => WEBVR.getVRDisplay(display => resolve(display)));
  }

  manager(manager) {
    manager.define('vr');

    const renderer = manager.get('renderer');
    renderer.vr.enabled = true;
    console.log(REVISION);

    this.display.then(display => {
      renderer.vr.setDevice(display);

      document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
    });
  }
}

export class VRControls extends ControlsModule {
  constructor({object, onError, intensity}) {
    const controls = new VRControlsNative(object.native, onError);

    controls.standing = true;
    controls.scale = intensity;

    super({controls});
  }
}
