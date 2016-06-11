import Terrain from 'whs-plugin';
import defaultTerrainMap from './assets/terrain/default_terrain';

const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  rWidth: 1,
  rHeight: 1,

  background: 0x70DBFF,

  paths: {
    worker: '{{ libs }}/physijs_worker.js',
    ammo: '{{ libs }}/ammo.js'
  }
});

window.terrain = new Terrain({
  geometry: {
    map: defaultTerrainMap,
    depth: 100,
    width: 256,
    height: 256
  },

  mass: 0,

  material: {
    color: 0xff0000,
    side: THREE.DoubleSide,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME, 'wait');

// NOTE: Default light.
new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

// NOTE: Default light.
new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 0.3,
    distance: 500
  },

  shadowmap: {
    width: 2048,
    height: 2048,
    top: 0,
    fov: 90
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

const parrot = new WHS.Morph({

  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../{{ assets }}/models/morph/parrot.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 0.4,
    speed: 200
  }

});

const parrotPath = [
  new THREE.CubicBezierCurve3(
      new THREE.Vector3(-100, 100, 50),
      new THREE.Vector3(-200, 120, -50),
      new THREE.Vector3(200, 120, -50),
      new THREE.Vector3(100, 100, 50)
    ),
  new THREE.CubicBezierCurve3(
      new THREE.Vector3(100, 100, 50),
      new THREE.Vector3(-200, 80, 150),
      new THREE.Vector3(200, 60, 150),
      new THREE.Vector3(-100, 100, 50)
    )
];

const parrotgoes = new THREE.CurvePath();

parrotgoes.add(parrotPath[0]);
parrotgoes.add(parrotPath[1]);

const flamingo = new WHS.Morph({
  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: '../{{ assets }}/models/morph/flamingo.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 2,
    speed: 50
  }
});

const flamingoPath = [
  new THREE.CubicBezierCurve3(
      new THREE.Vector3(-100, 100, 50),
      new THREE.Vector3(-100, 160, 300),
      new THREE.Vector3(200, 180, 30),
      new THREE.Vector3(100, 140, 80)
    ),
  new THREE.CubicBezierCurve3(
      new THREE.Vector3(100, 140, 80),
      new THREE.Vector3(200, 80, 150),
      new THREE.Vector3(-200, 60, -100),
      new THREE.Vector3(200, 100, 350)
    ),
  new THREE.CubicBezierCurve3(
      new THREE.Vector3(200, 100, 350),
      new THREE.Vector3(200, 80, 150),
      new THREE.Vector3(-200, 60, -100),
      new THREE.Vector3(-100, 100, 50)
    )
];

const flamingogoes = new THREE.CurvePath();

flamingogoes.add(flamingoPath[0]);
flamingogoes.add(flamingoPath[1]);
flamingogoes.add(flamingoPath[2]);

flamingo.addTo(GAME, 'wait').then((obj) => {
  console.log(obj.follow(
    parrotgoes, // flamingogoes
    26000,
    true
  ));
  obj.follow(
    parrotgoes, // flamingogoes
    26000,
    true
  );
});

parrot.addTo(GAME, 'wait').then((obj) => {
  obj.follow(
    flamingogoes,
    20000,
    true
  );
});

new WHS.Skybox({
  path: '../{{ assets }}/textures/skybox/skymap',
  imgSuffix: '.png',
  skyType: 'sphere',
  radius: GAME.getCamera().__params.camera.far,
  rot: {y: Math.PI / 180 * -90},
  pos: {y: -200}
}).addTo(GAME);

const box = new WHS.Box({

  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,
  onlyvis: false,

  material: {
    kind: 'lambert',
    map: WHS.texture('../{{ assets }}/textures/box.jpg')
  },

  pos: {
    x: 50,
    y: 70,
    z: 60
  }

});

GAME.add(box).then(() => {
  const checker1 = new WHS.Loop(() => {
    if (box.nposition.y < -200) {
      box.position.set(50, 70, 60);

      box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker1);

  checker1.start();
});

new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,

  material: {
    kind: 'lambert',
    map: WHS.texture('../{{ assets }}/textures/box.jpg')
  },

  pos: {
    x: 30,
    y: 50,
    z: 0
  }
}).addTo(GAME);

const person = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'lambert',
    rest: 0,
    fri: 1
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

GAME.add(person).then(() => {
  const checker2 = new WHS.Loop(() => {
    if (person.nposition.y < -200) {
      person.position.set(0, 100, 0);

      person.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      person.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  GAME.addLoop(checker2);

  checker2.start();
});

// EFFECTS.
// const effects = new WHS.Wagner(GAME);

// effects.add( "ZoomBlurPass", {} );
// effects.add('VignettePass', {});

// var directionalblurEffect = GAME.addWagner( "motionBlurPass", {} ).apply();

GAME.setControls(
  WHS.firstPersonControls(person, { // *WHS* object, Pointer lock controls object, Jquery blocker div selector.
    speed: 5 // 5
  })
);

/* var grasscoords = [];

for (var x = 0; x < 20; x++) {
  for (var y = 0; y < 15; y++) {
  grasscoords.push({
    x: x,
    y: y
  });

  }
}*/
/*
var curve = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( -100, 100, 50 ),
      new THREE.Vector3( -100, 160, 300 ),
      new THREE.Vector3( 200, 180, 30 ),
      new THREE.Vector3( 100, 140, 80 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0xff0000
  }
});

var curve2 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 100, 140, 80 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( 200, 100, 350 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x00ff00
  }
});

var curve3 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 200, 100, 350 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( -100, 100, 50 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x0000ff
  }
});

curve.addTo( GAME );
curve2.addTo( GAME );
curve3.addTo( GAME );
*/
GAME.start();