import test from 'ava';
import * as WHS from '../../build/whitestorm.js';

/*
 * Ignored methods:
 *
 * - .integrateModules() - Does most of .applyModule(), used only in core;
 * - .modules() - Piped version of .applyModule();
 * - .add() - Component-specific method that relies on .native;
 *
 */

const app = new WHS.App();
const component = new WHS.Component();
const component2 = new WHS.Component();

app.start();

test('.wait() & .defer()', t => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(), 1);
  });

  component.wait(promise);
  component.defer(() => t.pass());
});

test('throws error when .manager is used, but not defined', t => {
  t.throws(() =>
    new WHS.Component({manager: false}).manager
  , '@Component: ModuleManager is not used in this component. \'manager\' parameter should be set as \'true\'');
});

test('.updateParams()', t => {
  component.updateParams({
    hello: 'world'
  });

  t.is(component.params.hello, 'world');
});

test('.copy()', t => {
  component.copy(component2);
  t.deepEqual(component.params, component2.params);
});

test('.clone()', t => {
  const cloned = component.clone();
  t.notDeepEqual(cloned, component);
});

test('.applyModule()', t => {
  const module = new WHS.mesh.DynamicGeometryModule();
  t.is(component.applyModule(module), module);
});

test('.applyBridge()', t => {
  t.is(component.applyBridge({hello: 'world'}).hello, 'world');
});
