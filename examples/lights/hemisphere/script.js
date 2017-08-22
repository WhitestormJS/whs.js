import * as UTILS from '../../globals';

const cameraModule = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
  position: {
    z: -30,
    y: 20,
    x: -40
  },
  far: 1000,
  near: 5
}));

const controlsModule = new WHS.OrbitControlsModule();

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200),
    renderer: {
      shadowMap: {
        type: THREE.PCFSoftShadowMap,
        renderSingleSided: true
      }
    }
  }),
  controlsModule,
  cameraModule,
  new WHS.ResizeModule()
]);
controlsModule.controls.autoRotate = true;

// Sky dome shaders
const vertexShader = document.getElementById('vertexShader').textContent;
const fragmentShader = document.getElementById('fragmentShader').textContent;
const uniforms = {
  topColor: {value: new THREE.Color(0x0077df)},
  bottomColor: {value: new THREE.Color(0xffffff)},
  offset: {value: 33},
  exponent: {value: 0.6}
};

// Sky dome
new WHS.Sphere({
  geometry: [800, 32, 15],
  material: new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: THREE.BackSide
  }),
  shadow: {
    cast: false,
    receive: false
  }

}).addTo(app);

const fix = texture => {
  texture.anisotropy = 2;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  return texture;
};

new WHS.Box({
  geometry: {
    width: 3000,
    height: 3000
  },
  position: [0, -1.5, 0],
  rotation: {
    y: 0,
    x: -Math.PI / 2
  },
  shadow: {
    cast: false,
    receive: true
  },
  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/marble.jpg`,
      repeat: new THREE.Vector2(200, 200),
      fix
    }
  )],

  material: new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 0.2
  })
}).addTo(app);

new WHS.DirectionalLight({
  intensity: 0.4,

  shadow: {
    mapSize: {
      width: 4096,
      height: 4096
    },

    far: 20,
    near: 10
  },

  position: [-105, 70, -10]
}).addTo(app);

// The hemisphere light
const hemisphereLight = new WHS.HemisphereLight({
  skyColor: 0xFCD440,
  intensity: 0.4
});
hemisphereLight.addTo(app);

const pilar1 = {x: 0, y: -3.5, z: 0};
const pilar2 = {x: 0, y: -3.5, z: 20};
const pilar3 = {x: 20, y: -3.5, z: 0};
const pilar4 = {x: 20, y: -3.5, z: 20};
addPillar(pilar1);
addPillar(pilar2);
addPillar(pilar3);
addPillar(pilar4);
function addPillar(position) {
  new WHS.Model({
    geometry: {
      path: `${process.assetsPath}/models/pillar.json`
    },

    modules: [
      new WHS.TextureModule({
        url: `${process.assetsPath}/textures/stone.jpg`,
        type: 'map',
        repeat: new THREE.Vector2(3, 3),
        fix
      }, {
        url: `${process.assetsPath}/textures/stoneNormal.jpg`,
        type: 'normalMap',
        repeat: new THREE.Vector2(3, 3),
        fix
      }, {
        url: `${process.assetsPath}/textures/stoneBump.jpg`,
        type: 'bumpMap',
        repeat: new THREE.Vector2(3, 3),
        fix
      }
    )],

    useCustomMaterial: true,

    material: new THREE.MeshPhongMaterial({
      emissive: 0xffffff,
      emissiveIntensity: 0.2
    }),

    shadow: {
      cast: true,
      receive: true
    },

    position,

    rotation: {
      y: -Math.PI / 2
    },

    scale: [2, 3, 2]
  }).addTo(app);
}

const topPlaneSize = 30;
const topPlaneYpos = 24;
addTopPlane({
  width: topPlaneSize,
  height: topPlaneSize
}, topPlaneYpos);

addTopPlane({
  width: topPlaneSize - 3,
  height: topPlaneSize - 3,
  depth: 2
}, topPlaneYpos + 1);

addTopPlane({
  width: topPlaneSize,
  height: topPlaneSize
}, topPlaneYpos + 2);

function addTopPlane(geometry, y) {
  new WHS.Box({
    geometry,

    position: [9, y, 10],
    rotation: {
      y: 0,
      x: -Math.PI / 2
    },

    shadow: {
      cast: true,
      receive: false
    },

    modules: [
      new WHS.TextureModule({
        url: `${process.assetsPath}/textures/stone.jpg`,
        type: 'map'
      }, {
        url: `${process.assetsPath}/textures/stoneNormal.jpg`,
        type: 'normalMap',
        fix
      }, {
        url: `${process.assetsPath}/textures/stoneBump.jpg`,
        type: 'bumpMap',
        fix
      }
    )],

    material: new THREE.MeshPhongMaterial({
      emissive: 0xffffff,
      emissiveIntensity: 0.2
    })
  }).addTo(app);
}

app.start();
