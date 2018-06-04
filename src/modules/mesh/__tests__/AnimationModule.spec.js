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

describe('Default Animation module', () => {
  test('constructs with app', () => {
    expect(animationModule.app).toEqual(app);
  });

  test('constructs with default speed 1', () => {
    expect(animationModule.params.speed).toEqual(1);
  });

  test('constructs with undefined isDeferred flag', () => {
    expect(animationModule.isDeferred).toEqual(undefined);
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

describe('Animation module with parameters', () => {
  const params = {
    speed: 2
  };
  const isDeferred = true;
  const customAnimationModule = new AnimationModule(app, true, params);

  test('constructs with passed in params', () => {
    expect(customAnimationModule.params).toEqual(params);
  });

  test('constructs with passed in isDeferred flag', () => {
    expect(customAnimationModule.isDeferred).toEqual(isDeferred);
  });
});
