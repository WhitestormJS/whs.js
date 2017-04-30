import {Box} from '../../index';

describe('Box', () => {
  test('constructs non buffered BoxGeometry', () => {
    const box = new Box();
    expect(box.geometry.type).toEqual('BoxGeometry');
  });

  test('constructs buffered BoxGeometry', () => {
    const box = new Box({
      buffer: true
    });

    expect(box.geometry.type).toEqual('BoxBufferGeometry');
  });
});
