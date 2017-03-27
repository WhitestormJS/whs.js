import {App, Component} from './index';
import {DynamicGeometryModule} from '../modules/mesh/export';

/*
 * Ignored methods:
 *
 * - .integrateModules() - Does most of .applyModule(), used only in core;
 * - .modules() - Piped version of .applyModule();
 * - .add() - Component-specific method that relies on .native;
 *
 */

const app = new App();
const component = new Component();
const component2 = new Component();

app.start();

test('.wait() & .defer()', done => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(), 1);
  });

  component.wait(promise);
  component.defer(() => done());
});

test('throws error when .manager is used, but not defined', () => {
  expect(() => new Component({manager: false}).manager)
    .toThrowError('@Component: ModuleManager is not used in this component. \'manager\' parameter should be set as \'true\'');
});

test('.updateParams()', () => {
  component.updateParams({
    hello: 'world'
  });

  expect(component.params.hello).toBe('world');
});

test('.copy()', () => {
  component.copy(component2);
  expect(component.params).toEqual(component2.params);
});

test('.clone()', () => {
  const cloned = component.clone();
  expect(cloned).not.toEqual(component);
});

test('.applyModule()', () => {
  const module = new DynamicGeometryModule();
  expect(component.applyModule(module)).toBe(module);
});

test('.applyBridge()', () => {
  expect(component.applyBridge({hello: 'world'}).hello).toBe('world');
});
