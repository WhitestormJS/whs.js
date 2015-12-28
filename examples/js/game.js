 // NOTE: Make person bigger 10 times
  var preloader = WHS.gp.preloader();

  var GAME = new WHS.init({
    anaglyph: false,
    //helper: true,
    stats: "fps", // fps, ms, mb
    wagner: true,
    autoresize: true,

    gravity: {
      x: 0,
      y: -100,
      z: 0
    },

    camera: {
      far: 1000
    },

    rWidth: window.innerWidth / 1.5,
    rHeight: window.innerHeight / 1.5,

    background: 0x70DBFF
  });

  preloader.start(GAME);

  GAME.ground = GAME.addGround("terrain", {
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
  });

  // NOTE: Default light.
  GAME.light1 = GAME.addLight("spot", {
    color: 0xffffff, //0x00ff00,
    intensity: 2,
    distance: 1000
  }, {
    x: 160, // 100,
    y: 220, // 30,
    z: 160, // 100
  }, {
    x: 0,
    y: 0,
    z: 0
  });

  /*GAME.light1 = GAME.addLight("point", {
    color: 0xffffff, //0x00ff00,
    intensity: 0.8
  }, {
    x: 100, // 100,
    y: 110, // 30,
    z: 100, // 100
  }, {
    x: 0,
    y: 0,
    z: 0
  });*/


  // NOTE: Default light.
  /*GAME.light1 = GAME.addLight("directional", {
    color: 0xffffff, //0x00ff00,
    intensity: 1
  }, {
    x: 70, // 100,
    y: 70, // 30,
    z: 70, // 100
  }, {
    x: 70,
    y: 72,
    z: 70
  });*/

  GAME.parrot = GAME.addMorph("assets/models/morph/parrot.js", {
  geometryOptions: {
      width: 2,
      height: 2,
      depth: 2
  },
  materialOptions: {
      color: 0xffffff,
      kind: "basic",
      map: WHS.API.texture('assets/textures/box.jpg')
  },
  pos: {
      x: 70,
      y: 72,
      z: 70
  },
  morph: {
    duration: 0.5,
    speed: 250
  }
});

  // NOTE: Test light.
  /*GAME.light2 = GAME.addLight("point", {
    color: 0xffffff,
    intensity: 4,
    distance: 1
  }, {
    x: 100, //  100,
    y: 110, //  30,
    z: 100, //  100
  }, {
    x: 0,
    y: 0,
    z: 0
  });*/

  // NOTE: Test light.
  /*GAME.light2 = GAME.addLight("ambient", {
    color: 0xffffff
  }, {
    x: 100, //  100,
    y: 30, //  30,
    z: 100, //  100
  }, {
    x: 0,
    y: 0,
    z: 0
  });*/

  GAME.fog = GAME.addFog("fogexp2", {
    hex: 0x777777,
    near: 0.015,
    far: 250,
    density: 0.015
  });

  GAME.cube = GAME.addObject("cube",
  {
      geometryOptions: {
          width: 2,
          height: 2,
          depth: 2
      },
      mass: 5,
      onlyvis: false,
      materialOptions: {
          color: 0xffffff,
          kind: "basic",
          map: WHS.API.texture('assets/textures/box.jpg')
      },
      pos: {
          x: 60,
          y: 370,
          z: 60
      }
  });

  GAME.cube = GAME.addObject("cube",
  {
      geometryOptions: {
          width: 2,
          height: 2,
          depth: 2
      },
      mass: 5,
      onlyvis: false,
      materialOptions: {
          color: 0xffffff,
          kind: "basic",
          map: WHS.API.texture('assets/textures/box.jpg')
      },
      pos: {
          x: 60,
          y: 400,
          z: 0
      }
  });

  GAME.person = GAME.addObject("sphere", {
    geometryOptions: {
      radius: 3
    },
    mass: 10,
    onlyvis: false,
    materialOptions: {
      color: 0xffffff,
      kind: "lambert"
    },
    pos: {
      x: 0,
      y: 400,
      z: 0
    }
  });

  GAME.zoomEffect = GAME.addWagner(WAGNER, "zoomBlurPass", {}).apply();
  GAME.multipassEffect = GAME.addWagner(WAGNER, "vignettePass", {}).apply();
  GAME.directionalblurEffect = GAME.addWagner(WAGNER, "motionBlurPass", {}).apply();

  GAME.MakeFirstPerson(GAME.person, PointerLockControls, '#blocker'); // *WHS* object, Pointer lock controls object, Jquery blocker div selector.

  var grasscoords = [];

  for (var x = 0; x < 20; x++) {
    for (var y = 0; y < 15; y++) {
      /*grasscoords.push({
        x: x,
        y: y
      });*/

    }
  }

  preloader.end();

/*
  console.log(WHS.API.getheight({
        x: 0,
        y: 0
      }, -500, GAME.ground, -1));

  GAME.addGrass(GAME.ground, {
    coords: grasscoords
  });*/


  //GAME.person.addCompoundFace();