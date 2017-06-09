import {Loop} from 'whs';

import {VREffect} from './lib/VREffect';
import {WEBVR} from './lib/WebVR';

export class VRModule {
  constructor() {
    this.scene = null;
    this.camera = null;
  }

  manager(manager) {
    const rendering = manager.use('rendering');
    const renderer = manager.get('renderer');

    const resize = manager.use('resize');

    const effect = new VREffect(renderer);

    this.scene = manager.get('scene');
    this.camera = manager.get('camera');

    rendering.effect(effect);

    // TODO: Fix resize.

    resize.addCallback((width, height) => {
      effect.setSize.apply(effect, [width, height]);
    });

    // WEBVR

    WEBVR.checkAvailability().catch(message => {
			document.body.appendChild(WEBVR.getMessageContainer(message));
		});

    WEBVR.getVRDisplay(display => {
      document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
    });
  }
}
