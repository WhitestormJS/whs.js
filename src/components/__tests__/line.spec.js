import * as WHS from '../../index';
import {Vector3, LineCurve3} from 'three';

describe('Line', () => {
  test('constructs with defaults vertices', () => {
    const line = new WHS.Line({
      curve: new LineCurve3(
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0)
      )
    });

    expect(line.geometry.vertices[0]).toEqual({x: 0, y: 0, z: 0});
    expect(line.geometry.vertices[50]).toEqual({x: 10, y: 0, z: 0});
  });
});
