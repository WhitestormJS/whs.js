import test from 'ava';
import * as WHS from '../../build/whitestorm';

/*
 * Ignored methods:
 *
 * - .publish() & .unpublish() - Aliases of .add() and .remove();
 *
 */

const composition = {};
const testValue = {test: true};

const manager = new WHS.ModuleManager(composition);
const module = new WHS.app.SceneModule();

test('.active()', t => {
  manager.active(module);
  t.is(manager.currentModule, module);
});

test('.add()', t => {
  t.plan(2);

  manager.add('immutable', testValue, {immutable: true, alias: '$testkey'});
  manager.add('overwritable', testValue);

  t.is(manager.store.immutable[0], testValue, 'value is set');
  t.is(composition.$testkey, testValue, 'alias is set');
});

test('.get()', t => {
  t.is(manager.get('immutable'), testValue);
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

test('.update()', async t => {
  const update = new Promise((resolve, reject) => {
    manager.update({
      overwritable: () => {
        resolve(true);
      }
    });

    setTimeout(reject, 1);
  });

  manager.set('overwritable', 'check update');

  t.true(await update);
});

test('.has()', t => {
  t.plan(2);

  t.true(manager.has('immutable'), 'manager has \'immutable\' dependency');
  t.false(manager.has('whatever'), 'manager doesn\'t have \'whatever\' dependency');
});

test('.remove()', t => {
  t.plan(2);

  manager.remove('immutable');
  manager.remove('overwritable');

  t.is(manager.store.immutable, null);
  t.is(manager.store.overwritable, null);
});

test('.reset()', t => {
  manager.reset();
  t.is(manager.currentModule, null);
});
