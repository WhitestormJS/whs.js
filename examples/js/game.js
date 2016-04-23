var preloader = Preloader();

WHS.debug = true;

// INITIALIZATION SCENE.
var GAME = new WHS.World( {
    
    stats: "fps", // fps, ms, mb
    autoresize: true,

    gravity: {
        x: 0,
        y: - 100,
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

    background: 0x70DBFF
    
} );

GAME.ground = GAME.Terrain( {

    geometry: {
        map: defaultTerrainMap,
        depth: 100,
        width: 256,
        height: 256
    },

    material: {
        color: 0xff0000,
        side: THREE.DoubleSide,
        kind: "basic"
    }, 

    pos: {
        x: 0,
        y: 0,
        z: 0
    }

} );

// NOTE: Default light.
var ambient = GAME.AmbientLight( {
    light: {
        color: 0xffffff,
        intensity: 0.2,
    },

    pos: {
        x: 160, // 100,
        y: 120, // 30,
        z: 160, // 100
    },

    target: {
        x: 0,
        y: 10,
        z: 0
    }
} );


// NOTE: Default light.
GAME.light1 = GAME.SpotLight( {
    light: {
        color: 0xffffff, //0x00ff00,
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
        z: 160, // 100
    },

    target: {
        x: 0,
        y: 10,
        z: 0
    }
} );

GAME.parrot = GAME.Morph( {

    geometry: {
        width: 2,
        height: 2,
        depth: 2,
        path: "assets/models/morph/parrot.js"
    },

    material: {
        useVertexColors: true,
        kind: "basic"
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

GAME.skybox = GAME.Skybox( {
    path: "assets/textures/skybox/skymap",
    imgSuffix: ".png",
    skyType: "sphere",
    radius: GAME._camera.__params.camera.far,
    rot: { y: Math.PI / 180 * - 90 },
    pos: { y: - 200 }
} );

GAME.cube1 = GAME.Box( {

    geometry: {
        width: 2,
        height: 2,
        depth: 2
    },

    mass: 1,
    onlyvis: false,

    material: {
        kind: "lambert",
        map: WHS.API.texture( 'assets/textures/box.jpg' )
    },

    pos: {
        x: 50,
        y: 70,
        z: 60
    }

} );

GAME.cube2 = GAME.Box( {
    geometry: {
        width: 2,
        height: 2,
        depth: 2
    },

    mass: 1,
    onlyvis: false,

    material: {
        kind: "lambert",
        map: WHS.API.texture( 'assets/textures/box.jpg' )
    },

    pos: {
        x: 30,
        y: 50,
        z: 0
    }

} );

GAME.person = GAME.Sphere( {

    geometry: {
        radius: 2
    },

    mass: 10,
    onlyvis: false,

    material: {
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
var effects = new WHS.Wagner(GAME);

//effects.add( "ZoomBlurPass", {} );
effects.add( "VignettePass", {} );

//var directionalblurEffect = GAME.addWagner( "motionBlurPass", {} ).apply();

GAME.FPSControls( GAME.person, { // *WHS* object, Pointer lock controls object, Jquery blocker div selector.
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

preloader.check();
