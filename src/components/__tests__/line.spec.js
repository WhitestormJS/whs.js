import * as WHS from '../../index';
import {Vector3} from 'three';

describe('Line', () => {
  test('constructs with defaults vertices', () => {
    const line = new WHS.Line();
    expect(line.geometry.curve).toBe(undefined);
    expect(line.geometry.vertices[0]).toEqual({"x": 0, "y": 0, "z": 0});
    expect(line.geometry.vertices[1]).toEqual({"x": 10, "y": 0, "z": 0});
  });

  test('constructs with vertices according to start/end', () => {
    const startVect = {x: 10, y: 1, z: 15};
    const endVect = {x: 15, y: 10, z: 25};

    const line = new WHS.Line({
      geometry: {
        start: new Vector3(startVect.x, startVect.y, startVect.z),
        end: new Vector3(endVect.x, endVect.y, endVect.z)
      }
    });

    expect(line.geometry.vertices[0]).toEqual({
      "x": startVect.x,
      "y": startVect.y,
      "z": startVect.z
    });
    expect(line.geometry.vertices[1]).toEqual({
      "x":  endVect.x,
      "y": endVect.y,
      "z": endVect.z});
    });

});
