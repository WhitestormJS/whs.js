import * as WHS from '../../index';

describe('Line', () => {
  test('constructs with defaults vertices', () => {
    const line = new WHS.Line();
    expect(line.geometry.curve).toBe(undefined);
    expect(line.geometry.vertices[0]).toEqual({"x": 0, "y": 0, "z": 0});
    expect(line.geometry.vertices[1]).toEqual({"x": 10, "y": 0, "z": 0});
  });

  test('constructs with curve', () => {
    // TODO, curve needs to be revisted
  });
});
