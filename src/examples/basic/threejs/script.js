window.GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  init: {
    scene: false
  }
});

const scene = new THREE.Scene();

const obj1 = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
obj1.position.set(6, 6, 0);

scene.add(obj1);

const obj2 = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
obj2.position.set(12, 6, 0);

scene.add(obj2);

const obj3 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0x0000ff}));
obj3.position.set(0, 0, 3);

// Nested object.
obj2.add(obj3);

GAME.importScene(scene, true);
GAME._initCamera();
GAME._initRendering();
GAME._initHelpers();

const sphere = WHS.MeshComponent(new WHS.Component(
  new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}))
));

sphere.addTo(GAME);
sphere.position.y = 3;

const light = WHS.LightComponent(new WHS.Component(
  new THREE.PointLight()
));

light.wrap();

light.addTo(GAME);

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

GAME.start();
