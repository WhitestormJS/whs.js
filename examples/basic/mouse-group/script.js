import * as UTILS from '../../globals';

const mouse = new WHS.VirtualMouseModule();

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 10, 50)
  })),
  new WHS.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  mouse
]);

const sphere = new WHS.Sphere({ // Create sphere component.
  geometry: [3, 32, 32],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 1.5, 0]
});

const sphere2 = sphere.clone(false, true);
sphere2.material.color.setHex(0xff0000);
sphere2.position.x += 4.5;

const sphere3 = sphere.clone(false, true);
sphere3.material.color.setHex(0x0000ff);
sphere3.position.x -= 4.5;

const sphere4 = sphere.clone(false, true);
sphere4.material.color.setHex(0x00ff00);
sphere4.position.y += 4.5;

sphere4.addTo(sphere3);

const group = new WHS.Group(sphere, sphere2, sphere3);
group.addTo(app);

mouse.track(group);

let activeSphere;

const spheres = [];
group.native.traverse(child => spheres.push(child));

group.on('mouseover', () => {
  activeSphere = spheres.find(child => child === mouse.intersection(group)[0].object);

  activeSphere.material.color.set(0xffff00);
  console.log('mouseover');
});

group.on('mousemove', () => {
  console.log('mousemove');
});

group.on('mouseout', () => {
  activeSphere.material.color.set(UTILS.$colors.mesh);
  console.log('mouseout');
});

group.on('click', () => {
  alert('click!');
});

UTILS.addPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.
