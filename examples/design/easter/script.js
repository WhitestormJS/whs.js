import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: {
      x: 0,
      y: -10,
      z: 0
    },
  }),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(-8, 5, 20),
    fov: 45,
    far: 2000
  }),
  new WHS.app.RenderingModule({
    bgColor: 0xffffff,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new WHS.app.AutoresizeModule()
]);


// world.$camera.lookAt(new THREE.Vector3(0, 0, 0));

// Start rendering.
world.start();

new WHS.Box({
  geometry: {
    width: 100,
    height: 1,
    depth: 100
  },
  modules: [
    new PHYSICS.BoxModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff,
  }),

  position: {
    x: 0,
    y: -1,
    z: 0
  }
}).addTo(world);

const egg = new WHS.Model({
  geometry: {
    path: `${process.assetsPath}/models/easter/egg_light.json`,
  },

  modules: [
    new PHYSICS.ConvexModule({
      path: `${process.assetsPath}/models/easter/egg_low.json`,
    })
  ],

  useCustomMaterial: true,

  material: new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    map: WHS.texture(`${process.assetsPath}/textures/easter/egg1.jpg`),
    side: THREE.DoubleSide
  }),

  position: {
    y: 0,
    x: -10
  },

  rotation: {
    x: Math.PI / 2,
    y: Math.PI / 8
  }
});

const rabbit = new WHS.Model({
  geometry: {
    path: `${process.assetsPath}/models/easter/rabbit.json`
  },

  modules: [
    new PHYSICS.ConcaveModule({
      path: `${process.assetsPath}/models/easter/rabbit_low.json`,
      scale: new THREE.Vector3(0.5, 0.5, 0.5)
    })
  ],

  material: new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    shading: THREE.SmoothShading
  }),

  position: {
    y: 5,
    x: -3
  },

  rotation: {
    x: Math.PI / 2
  },

  scale: [0.5, 0.5, 0.5]
});

rabbit.addTo(world, 'wait');

new WHS.SpotLight({
  light: {
    color: 0xffffff,
    decay: 1,
    distance: 150,
    intensity: 1
  },

  shadowmap: {
    left: -20,
    top: 20,
    bottom: -20,
    right: 20,

    bias: -0.0001,

    width: 4096,
    height: 4096,

    near: 1,
    far: 100,

    fov: 10
  },

  position: {
    z: 20,
    x: 20,
    y: 20
  },

  target: {
    x: -10,
    y: 0,
    z: 0
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.9,
    color: 0xffffff
  }
}).addTo(world);

let egg2, egg3, egg4, egg5, egg6, egg7, egg8, egg9;


egg.addTo(world).then((object) => {
  egg2 = object.clone(false, true);
  egg2.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg2.jpg`);

  egg2.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg3 = object.clone(false, true);
  egg3.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg3.jpg`);

  egg3.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(-8.5);
    obj.position.setZ(1.5);
  });

  egg4 = object.clone(false, true);
  egg4.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg4.jpg`);

  egg4.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0);
    obj.position.setZ(-1.5);
  });

  egg5 = object.clone(false, true);
  egg5.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg1.jpg`);

  egg5.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(2.5);
  });

  egg6 = object.clone(false, true);
  egg6.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg2.jpg`);

  egg6.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(0.5);
    obj.position.setZ(1.5);
  });

  egg7 = object.clone(false, true);
  egg7.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg3.jpg`);

  egg7.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(2);
    obj.position.setZ(-1.5);
  });

  egg8 = object.clone(false, true);
  egg8.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg4.jpg`);

  egg8.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(1);
    obj.position.setZ(2.5);
  });

  egg9 = object.clone(false, true);
  egg9.material.map = new WHS.texture(`${process.assetsPath}/textures/easter/egg1.jpg`);

  egg9.addTo(world).then((obj) => {
    obj.rotation.y = -Math.PI / 8;
    obj.position.setX(3);
    obj.position.setZ(-1.5);
  });
});

document.body.addEventListener('mousemove', (e) => {
  world.$camera.position.x = -8 + (e.screenX - window.innerWidth / 2) / 40;
  world.$camera.position.y = 5 + (e.screenY - window.innerHeight / 2) / 80;
  world.$camera.native.lookAt(new THREE.Vector3(-4, 0, 0));
});

document.body.addEventListener('click', () => {
  rabbit.setLinearVelocity(new THREE.Vector3(0, 5, 0));
  egg.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg2.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg3.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg4.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg5.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg6.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg7.setAngularVelocity(new THREE.Vector3(0, 10, 0));
  egg8.setAngularVelocity(new THREE.Vector3(0, -10, 0));
  egg9.setAngularVelocity(new THREE.Vector3(0, -10, 0));
});
