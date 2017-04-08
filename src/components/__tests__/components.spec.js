import * as WHS from '../../index';
import {Mesh} from 'three';

const meshes = [
  'Box',
  'Cylinder',
  'Dodecahedron',
  'Extrude',
  'Icosahedron',
  'Lathe',
  'Group',
  'Octahedron',
  'Parametric',
  'Plane',
  'Polyhedron',
  'Ring',
  'Shape',
  'Sphere',
  'Tetrahedron',
  // 'Text',
  'Torus',
  'Torusknot',
  'Tube'
];

const lights = [
  'AmbientLight',
  'AreaLight',
  'DirectionalLight',
  'HemisphereLight',
  'PointLight',
  'SpotLight'
];

const cameras = [
  'PerspectiveCamera',
  'CubeCamera',
  'OrthographicCamera'
];

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.CameraModule()
]);

app.start();

[meshes, lights, cameras].forEach(category => {
  category.forEach(component => {
    test(component, () => {
      const element = new WHS[component]();

      app.add(element);
      expect(app.children).toContain(element);
    });
  });
});

test('Group', () => {
  const sphere = new WHS.Sphere();
  const box = new WHS.Box();

  const group = new WHS.Group(sphere, box, new Mesh());
  group.addTo(app);
});

describe('Line', () => {
  test('throws if no curve', () => {
    expect(() => {
      new WHS.Line();
    }).toThrow();
  });

  test('has points passed in', () => {
    // TODO assert, I suspect this component is broken
  });
});

describe('Model', () => {
  test('can construct', () => {
    new WHS.Model();
  });
});

describe('Text', () => {
  test('can construct', () => {
    new WHS.Text();
  });
});
