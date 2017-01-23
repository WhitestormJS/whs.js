const radiusMin = 110, // Min radius of the asteroid belt.
  radiusMax = 220, // Max radius of the asteroid belt.
  particleCount = 400, // Ammount of asteroids.
  particleMinRadius = 0.1, // Min of asteroid radius.
  particleMaxRadius = 4, // Max of asteroid radius.
  planetSize = 50; // Radius of planet.

const colors = {
  green: 0x8fc999,
  blue: 0x5fc4d0,
  orange: 0xee5624,
  yellow: 0xfaff70
};

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 100, 400),
    far: 2000,
    near: 1
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x2a3340,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new WHS.OrbitControlsModule(),
  new WHS.app.AutoresizeModule()
]);

const space = new WHS.Group();
space.addTo(world);
space.rotation.z = Math.PI / 12;

const planet = new WHS.Tetrahedron({
  geometry: {
    radius: planetSize,
    detail: 2
  },

  material: new THREE.MeshStandardMaterial({
    color: 0xee5624,
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
  })
});

planet.addTo(space);

// LIGHTS.
new WHS.AmbientLight({
  light: {
    color: 0x663344,
    intensity: 2
  }
}).addTo(world);

new WHS.DirectionalLight({
  light: {
    color: 0xffffff,
    intensity: 1.5,
    distance: 800
  },

  shadowmap: {
    width: 2048,
    height: 2048,

    left: -800,
    right: 800,
    top: 800,
    bottom: -800,
    far: 800
  },

  position: {
    x: 300,
    z: 300,
    y: 100
  }
}).addTo(world);

const s1 = new WHS.Dodecahedron({
  geometry: {
    buffer: true,
    radius: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    emissive: 0x270000,
    roughness: 0.9,
  })
});

const s2 = new WHS.Box({
  geometry: {
    buffer: true,
    width: 10,
    height: 10,
    depth: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
  })
});

const s3 = new WHS.Cylinder({
  geometry: {
    buffer: true,
    radiusTop: 0,
    radiusBottom: 10,
    height: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000,
  })
});

const s4 = new WHS.Sphere({
  geometry: {
    buffer: true,
    radius: 10
  },

  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x270000
  })
});

const asteroids = new WHS.Group();
asteroids.addTo(space);

// Materials.
const mat = [
  new THREE.MeshPhongMaterial({ color: colors.green, shading: THREE.FlatShading }),
  new THREE.MeshPhongMaterial({ color: colors.blue, shading: THREE.FlatShading }),
  new THREE.MeshPhongMaterial({ color: colors.orange, shading: THREE.FlatShading }),
  new THREE.MeshPhongMaterial({ color: colors.yellow, shading: THREE.FlatShading })
];

for (let i = 0; i < particleCount; i++) {
  const particle = [s1, s2, s3, s4][Math.ceil(Math.random() * 3)].clone(),
    radius = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius);

  particle.g_({
    radiusBottom: radius,
    radiusTop: 0,
    height: particle instanceof WHS.Cylinder ? radius * 2 : radius,
    width: radius,
    depth: radius,
    radius
  });

  particle.material = mat[Math.floor(4 * Math.random())]; // Set custom THREE.Material to mesh.

  // Particle data.
  particle.data = {
    distance: radiusMin + Math.random() * (radiusMax - radiusMin),
    angle: Math.random() * Math.PI * 2
  };

  // Set position & rotation.
  particle.position.x = Math.cos(particle.data.angle) * particle.data.distance;
  particle.position.z = Math.sin(particle.data.angle) * particle.data.distance;
  particle.position.y = -10 * Math.random() + 4;

  particle.rotation.set(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random());

  particle.addTo(asteroids);
}

// Animating rotating shapes around planet.
const particles = asteroids.children;
console.log(asteroids);

const animation = new WHS.Loop(() => {
  for (let i = 0, max = particles.length; i < max; i++) {
    const particle = particles[i];

    particle.data.angle += 0.02 * particle.data.distance / radiusMax;

    particle.position.x = Math.cos(particle.data.angle) * particle.data.distance;
    particle.position.z = Math.sin(particle.data.angle) * particle.data.distance;

    particle.rotation.x += Math.PI / 60;
    particle.rotation.y += Math.PI / 60;
  }

  planet.rotation.y += 0.005;
});

world.addLoop(animation);

animation.start();

// Start rendering.
world.start();
