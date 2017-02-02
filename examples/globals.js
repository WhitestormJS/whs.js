export const $world = {
  stats: 'fps', // fps, ms, mb or false if not need.
  autoresize: 'window',

  gravity: [0, -100, 0],

  camera: {
    position: [0, 10, 50]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
};

export const appDefaults = {
  camera: {
    position: new THREE.Vector3(0, 10, 50)
  },
  rendering: {
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  },
  physics: {
    ammo: process.ammoPath
  }
};

export const appModules = ( // appModules(camera, rendering);
  camera = appDefaults.camera,
  rendering = appDefaults.rendering,
  physics = appDefaults.physics,
  useControls = true
) => (
  new WHS.BasicAppPreset({camera, rendering})
    .extend([
      new PHYSICS.WorldModule(physics),
      useControls ? new WHS.controls.OrbitModule() : null,
      new StatsModule()
    ])
    .autoresize()
    .get()
);

export const $colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2,
  softbody: 0x434B7F
};

export function addAmbient(world, intensity) {
  new WHS.AmbientLight({
    light: {
      intensity
    }
  }).addTo(world);
}

export function addBasicLights(world, intensity = 0.5, position = [0, 10, 10], distance = 100, shadowmap) {
  addAmbient(world, 1 - intensity);

  console.log(shadowmap);

  return new WHS.PointLight({
    light: {
      intensity,
      distance
    },

    shadow: Object.assign({
      fov: 90
    }, shadowmap),

    position
  }).addTo(world);
}

export function addPlane(world, size = 100) {
  return new WHS.Plane({
    geometry: {
      width: size,
      height: size
    },

    modules: [
      new PHYSICS.PlaneModule({
        mass: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

    rotation: {
      x: -Math.PI / 2
    }
  }).addTo(world);
}

export function addBoxPlane(world, size = 100) {
  return new WHS.Box({
    geometry: {
      width: size,
      height: 1,
      depth: size
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({color: 0x447F8B})
  }).addTo(world);
}
