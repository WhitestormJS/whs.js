import {Shape} from 'three';
import {Extrude} from '../../index';

describe('Extrude', () => {
  const extrude = new Extrude();
  test('constructs with no shape nor options', () => {
    expect(extrude.geometry.shapes).toBe(undefined);
    expect(extrude.geometry.options).toBe(undefined);
  });

  test('builds non buffered extrude geometry', () => {
    const params = {
      buffer: false,

      geometry: {
        shapes: [newShape(10, 20)],
        options: []
      }
    };

    const geometry = extrude.buildGeometry(params);
    expect(geometry.isBufferGeometry).toBeFalsy();
  });

  test('builds buffered extrude geometry', () => {
    const params = {
      buffer: true,

      geometry: {
        shapes: [newShape(10, 25)],
        options: []
      }
    };

    const geometry = extrude.buildGeometry(params);
    expect(geometry.isBufferGeometry).toBeTruthy();
  });
});

function newShape(width, height) {
  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, height);
  shape.lineTo(width, height);
  shape.lineTo(width, 0);
  shape.lineTo(0, 0);
  return shape;
}
