export const $world = {
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: "window",

  gravity: [0, -100, 0],

  modules: [
    new WHS.modules.ElementModule(),
    new WHS.modules.SceneModule(),
    new WHS.modules.RenderingModule(),
    new WHS.modules.CameraModule()
  ],

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

export const $colors = {
  bg: 0x162129,
  plane: 0x447F8B,
  mesh: 0xF2F2F2,
  softbody: 0x434B7F
};

export function addAmbient(world, intensity) {
  new WHS.AmbientLight({
    light: {
      intensity: intensity
    }
  }).addTo(world);
}

export function addBasicLights(world, intensity = 0.5, position = [0, 10, 10], distance = 100) {
  addAmbient(world, 1 - intensity);

  return new WHS.PointLight({
    light: {
      intensity,
      distance
    },

    shadowmap: {
      fov: 90
    },

    position
  }).addTo(world);
}

export function addPlane(world, size = 100) {
  return new (PHYSICS.$rigidBody(WHS.Plane, PHYSICS.PLANE))({
    geometry: {
      width: size,
      height: size
    },

    physics: {
      create: PHYSICS.createPlane
    },

    mass: 0,

    material: {
      color: 0x447F8B,
      kind: 'phong'
    },

    rotation: {
      x: - Math.PI / 2
    }
  }).addTo(world)
}

export function addBoxPlane(world, size = 100) {
  return new (PHYSICS.$rigidBody(WHS.Box, PHYSICS.BOX))({
    geometry: {
      width: size,
      height: 1,
      depth: size
    },

    mass: 0,

    material: {
      color: 0x447F8B,
      kind: 'phong'
    }
  }).addTo(world)
}
