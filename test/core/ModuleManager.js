import test from 'ava';
import * as WHS from '../../build/whitestorm.js';

const composition = {};
const testValue = {test: true};

const manager = new WHS.ModuleManager(composition);
const module = new WHS.app.SceneModule();

test('.setActiveModule()', t => {
  manager.setActiveModule(module);
  t.is(manager.currentModule, module);
});

test('.addDependency()', t => {
  t.plan(2);

  manager.addDependency('immutable', testValue, {immutable: true, alias: '$testkey'});
  manager.addDependency('overwritable', testValue);

  t.is(manager.store.immutable[0], testValue, 'value is set');
  t.is(composition.$testkey, testValue, 'alias is set');
});

test('.get()', t => {
  t.is(manager.get('immutable'), testValue);
});

test('.onDependencyUpdate()', async t => {
  const update = new Promise((resolve, reject) => {
    manager.onDependencyUpdate({
      overwritable: () => {
        resolve(true);
      }
    });

    setTimeout(reject, 3000);
  });

  t.true(await update);
});

test('.set()', t => {
  t.plan(2);

  t.throws(
    () => {
      manager.set('immutable', 'newValue');
    },
    '@ModuleManager: Dependency \'immutable\' is immutable and already used by another module',
    'dependency is immutable'
  );

  manager.set('overwritable', 'newValue');

  t.is(manager.store.overwritable[0], 'newValue', 'value is updated');
});

test('.has()', t => {
  t.plan(2);

  t.true(manager.has('immutable'), 'manager has \'immutable\' dependency');
  t.false(manager.has('whatever'), 'manager doesn\'t have \'whatever\' dependency');
});

test('.removeDependency()', t => {
  t.plan(2);

  manager.removeDependency('immutable');
  manager.removeDependency('overwritable');

  t.is(manager.store.immutable, null);
  t.is(manager.store.overwritable, null);
});

test('.reset()', t => {
  manager.reset();
  t.is(manager.currentModule, null);
});
