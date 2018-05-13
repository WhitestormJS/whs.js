import * as WHS from '../../index';

const composition = {};
const testValue = {test: true};

const manager = new WHS.ModuleManager(composition);
const module = new WHS.SceneModule();

test('.active()', () => {
  manager.active(module);
  expect(manager.currentModule).toBe(module);
});

test('.set()', () => {
  manager.set('overwritable', testValue);
});

test('.get()', () => {
  expect(manager.get('overwritable')).toBe(testValue);
});

test('.set()', () => {
  manager.set('overwritable', 'newValue');

  expect(manager.store.getState()[0].overwritable).toBe('newValue');
});

test('.update()', () => {
  const update = new Promise((resolve, reject) => {
    manager.update({
      overwritable: () => {
        resolve(true);
      }
    });

    setTimeout(reject, 1);
  });

  manager.set('overwritable', 'check update');

  expect(update).toBeTruthy();
});

test('.has()', () => {
  expect(manager.has('whatever')).toBeFalsy();
});

test('.reset()', () => {
  manager.reset();
  expect(manager.currentModule).toBe(null);
});
