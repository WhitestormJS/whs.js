import * as WHS from '../src/index';
import {Mesh} from 'three';

const meshes = [
  'Box',
  'Cylinder',
  'Dodecahedron',
  'Extrude',
  'Icosahedron',
  'Lathe',
  'Group',
  // 'Model',
  // 'Line',
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
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule()
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
