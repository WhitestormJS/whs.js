var preloader = Preloader();

// INITIALIZATION SCENE.
var GAME = new WHS.init( {
  anaglyph: false,
  //helper: true,
  stats: "fps", // fps, ms, mb
  wagner: true,
  autoresize: true,

  gravity: {
      x: 0,
      y: - 100,
      z: 0
  },

  camera: {
      far: 10000
  },

  rWidth: window.innerWidth / 1.5,
  rHeight: window.innerHeight / 1.5,

  background: 0x70DBFF
} );


// INIT SPACE.
preloader.start( GAME );

GAME.ground = GAME.addGround( "terrain", {
  terrain: defaultTerrainMap,
  depth: 100,
  width: 256,
  height: 256
  //useDeafultMaterial: false
  //detality:1
}, {
  color: 0xff0000,
  side: THREE.DoubleSide,
  kind: "basic"
}, {
  x: 0,
  y: 0,
  z: 0
} );

// NOTE: Default light.
GAME.light1 = GAME.addLight( "spot", {
  color: 0xffffff, //0x00ff00,
  intensity: 3,
  distance: 1000
}, {
  x: 160, // 100,
  y: 120, // 30,
  z: 160, // 100
}, {
  x: 0,
  y: 10,
  z: 0
} );

GAME.parrot = GAME.addMorph( "assets/models/morph/parrot.js", {
  geometryOptions: {
      width: 2,
      height: 2,
      depth: 2
  },
  materialOptions: {
      color: 0xffffff,
      kind: "basic",
      map: WHS.API.texture( 'assets/textures/box.jpg' )
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
      duration: 0.5,
      speed: 250
  }
} );

GAME.skybox = GAME.addSkybox( {
  src: "assets/textures/skybox/skymap",
  imgSuffix: ".png",
  skyType: "sphere",
  rot: { y: Math.PI / 180 * - 90 },
  pos: { y: - 200 }
} );

GAME.cube1 = GAME.addObject( "cube",
{
  geometryOptions: {
      width: 2,
      height: 2,
      depth: 2
  },
  mass: 1,
  onlyvis: false,
  materialOptions: {
      color: 0xffffff,
      kind: "basic",
      map: WHS.API.texture( 'assets/textures/box.jpg' )
  },
  pos: {
      x: 50,
      y: 70,
      z: 60
  }
} );

GAME.cube2 = GAME.addObject( "cube",
{
  geometryOptions: {
      width: 2,
      height: 2,
      depth: 2
  },
  mass: 1,
  onlyvis: false,
  materialOptions: {
      color: 0xffffff,
      kind: "basic",
      map: WHS.API.texture( 'assets/textures/box.jpg' )
  },
  pos: {
      x: 60,
      y: 70,
      z: 0
  }
} );

GAME.person = GAME.addObject( "sphere", {
  geometryOptions: {
      radius: 2
  },
  mass: 100,
  onlyvis: false,
  materialOptions: {
      color: 0xffffff,
      kind: "lambert",
      rest: 0,
      fri: 1
  },
  pos: {
      x: 0,
      y: 100,
      z: 0
  }
} );

// EFFECTS.
GAME.zoomEffect = GAME.addWagner( WAGNER, "zoomBlurPass", {} ).apply();
GAME.multipassEffect = GAME.addWagner( WAGNER, "vignettePass", {} ).apply();
GAME.directionalblurEffect = GAME.addWagner( WAGNER, "motionBlurPass", {} ).apply();

GAME.MakeFirstPerson( GAME.person, { // *WHS* object, Pointer lock controls object, Jquery blocker div selector.
  block: document.getElementById('blocker'),
  speed: 5 // 5
} );

/*var grasscoords = [];

for (var x = 0; x < 20; x++) {
  for (var y = 0; y < 15; y++) {
    grasscoords.push({
      x: x,
      y: y
    });

  }
}*/

GAME.start();

preloader.end();
