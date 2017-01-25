import * as UTILS from '../../globals';

const resizer = new WHS.app.ResizeModule();

const world = new WHS.App([
  new WHS.app.ElementModule({
    container: document.getElementById('embed')
  }),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    },

    height: 300,
    width: 600
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath
  }),
  new WHS.controls.OrbitModule(),
  resizer
]);

const sphere = new WHS.Sphere({ // Create sphere component.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 100, 0]
});

sphere.addTo(world);

const mouse = new WHS.VirtualMouse(world);
mouse.track(sphere);

sphere.on('mouseover', () => {
  sphere.material.color.set(0xffff00);
  console.log('mouseover');
});

sphere.on('mousemove', () => {
  console.log('mousemove');
});

sphere.on('mouseout', () => {
  sphere.material.color.set(UTILS.$colors.mesh);
  console.log('mouseout');
});

sphere.on('click', () => {
  alert('click!');
});

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.

// DOM

const sizer = document.getElementById('sizer');
const embed = document.getElementById('embed');
let resize = false;

resizer.trigger();

sizer.addEventListener('mousedown', () => {
  resize = true;
});

window.addEventListener('mouseup', () => {
  resize = false;
});

window.addEventListener('mousemove', e => {
  if (resize) {
    embed.style.width = (+embed.style.width.replace('px', '') + e.movementX) + 'px';
    resizer.trigger();
  }
});
