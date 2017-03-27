import * as WHS from '../../src/index';

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

test('.active()', () => {
  manager.active(module);
  expect(manager.currentModule).toBe(module);
});

test('.add()', () => {
  manager.add('immutable', testValue, {immutable: true, alias: '$testkey'});
  manager.add('overwritable', testValue);

  expect(manager.store.immutable[0]).toBe(testValue);
  expect(composition.$testkey).toBe(testValue);
});

test('.get()', () => {
  expect(manager.get('immutable')).toBe(testValue);
});

test('.set()', () => {
  expect(() => {
    manager.set('immutable', 'newValue');
  })
  .toThrowError('@ModuleManager: Dependency \'immutable\' is immutable and already used by another module');

  manager.set('overwritable', 'newValue');

  expect(manager.store.overwritable[0]).toBe('newValue');
});

test('.update()', async () => {
  const update = new Promise((resolve, reject) => {
    manager.update({
      overwritable: () => {
        resolve(true);
      }
    });

    setTimeout(reject, 1);
  });

  manager.set('overwritable', 'check update');

  expect(await update).toBeTruthy();
});

test('.has()', () => {
  expect(manager.has('immutable'), 'manager has \'immutable\' dependency').toBeTruthy();
  expect(manager.has('whatever'), 'manager doesn\'t have \'whatever\' dependency').toBeFalsy();
});

test('.remove()', () => {
  manager.remove('immutable');
  manager.remove('overwritable');

  expect(manager.store.immutable).toBe(null);
  expect(manager.store.overwritable).toBe(null);
});

test('.reset()', () => {
  manager.reset();
  expect(manager.currentModule).toBe(null);
});
