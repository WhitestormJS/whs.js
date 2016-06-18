const radiusMin = 100,
  radiusMax = 200,
  particleCount = 400,
  particleMinRadius = 1,
  particleMaxRadius = 4,
  planetSize = 50, // Radius.
  particles = [];

const colors = {
  green: 0x8fc999,
  blue: 0x5fc4d0,
  orange: 0xee5624,
  yellow: 0xfaff70
};

const GAME = new WHS.World({
  stats: false,
  autoresize: true,

  gravity: {
    x: 0,
    y: 0,
    z: 0
  },

  camera: {
    far: 2000,
    near: 1,
    z: 400,
    y: 100
  },

  background: 0x2a3340
});

window.planet = new WHS.Tetrahedron({
  geometry: {
    radius: planetSize,
    detail: 2
  },

  mass: 100,

  material: {
    color: 0xee5624,
    shading: THREE.FlatShading,
    kind: 'phong'
  }
});

GAME.add(planet);

// LIGHTS.
new WHS.AmbientLight({
  light: {
    color: 0x663344,
    intensity: 2
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  light: {
    color: 0xffffff,
    intensity: 1.5,
    distance: 800
  },

  shadowmap: {
    left: -800,
    right: 800,
    top: 800,
    bottom: -800,
    far: 800
  },

  pos: {
    x: 300,
    z: 300
  }
}).addTo(GAME);

const s1 = new WHS.Dodecahedron({
  geometry: {
    radius: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    kind: 'phong'
  }
});

const s2 = new WHS.Box({
  geometry: {
    width: 10,
    height: 10,
    depth: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    kind: 'phong'
  }
});

const s3 = new WHS.Cylinder({
  geometry: {
    radiusTop: 0,
    radiusBottom: 10,
    height: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    kind: 'phong'
  }
});

const s4 = new WHS.Sphere({
  geometry: {
    radius: 10
  },

  mass: 0,
  physics: false,

  material: {
    shading: THREE.FlatShading,
    kind: 'phong'
  }
});

// Materials.
const mat = [
  new THREE.MeshPhongMaterial({color: colors.green, shading: THREE.FlatShading}),
  new THREE.MeshPhongMaterial({color: colors.blue, shading: THREE.FlatShading}),
  new THREE.MeshPhongMaterial({color: colors.orange, shading: THREE.FlatShading}),
  new THREE.MeshPhongMaterial({color: colors.yellow, shading: THREE.FlatShading})
];

for (let i = 0; i < particleCount; i++) {
  const particle = [s1, s2, s3, s4][Math.ceil(Math.random() * 3)].clone(),
    radius = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius);

  particle.G_({
    radiusBottom: radius,
    height: particle instanceof WHS.Cylinder ? radius * 2 : radius,
    width: radius,
    depth: radius,
    radius
  });

  particle.setMaterial(mat[Math.floor(4 * Math.random())]); // Set custom THREE.Material to mesh.

  // Overwrite shadows.
  particle.wrap('no-transforms');

  // Particle data.
  particle.data = {
    distance: radiusMin + Math.random() * (radiusMax - radiusMin),
    angle: Math.random() * Math.PI * 2
  };

  // Set position & rotation.
  particle.position.x = Math.cos(particle.data.angle) * particle.data.distance;
  particle.position.z = Math.sin(particle.data.angle) * particle.data.distance;
  particle.position.y = -20 * Math.random() + 4;

  particle.rotation.set(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random());

  GAME.add(particle);
  particles.push(particle);
}

// Animating rotating shapes around planet.
const animation = new WHS.Loop(() => {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    particle.data.angle += 0.02 * particle.data.distance / radiusMax;

    particle.position.x = Math.cos(particle.data.angle) * particle.data.distance;
    particle.position.z = Math.sin(particle.data.angle) * particle.data.distance;

    particle.rotation.x += Math.PI / 60;
    particle.rotation.y += Math.PI / 60;
  }

  planet.rotation.y += 0.005;
});

GAME.addLoop(animation);
GAME.setControls(WHS.orbitControls());

animation.start();

// Start rendering.
GAME.start();
