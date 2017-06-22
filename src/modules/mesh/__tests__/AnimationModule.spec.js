import '../../../polyfill';

import {Clock, AnimationMixer} from 'three';
import {Box, App} from '../../../index';
import {AnimationModule} from '../AnimationModule';

const app = new App();

const box = new Box();
box.skeleton = ['skel'];

box.geometry = {
  animations: ['anim']
};

const modules = {};
const animationModule = new AnimationModule(app);
modules.animationModule = animationModule;

describe('Animation module', () => {
  test('constructs with a clock', () => {
    expect(animationModule.clock).toBeInstanceOf(Clock);
  });

  test('bridges mesh creating an animation mixer', () => {
    animationModule.bridge.mesh(box, animationModule);
    expect(animationModule.mixer).toBeInstanceOf(AnimationMixer);
  });

  test('bridges mesh populating clips from mesh animation', () => {
    animationModule.bridge.mesh(box, animationModule);
    expect(animationModule.clips).toEqual(box.geometry.animations);
  });

  test('bridges mesh passing mesh skeleton to its geometry', () => {
    animationModule.bridge.mesh(box, animationModule);
    expect(box.geometry.skeleton).toEqual(box.skeleton);
  });

  test('applies to mesh', () => {
    box.module(modules.animationModule);
  });

  // TODO test play/update (mock?)
});
