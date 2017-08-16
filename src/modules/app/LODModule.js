import {
  AnimationMixer,
  AnimationClip,
  Clock
} from 'three';

import {Loop} from '../../core/Loop';

export class LODModule {
  constructor(app, params = {}) {
    this.app = app;
    this.params = Object.assign({
      speed: 1
    }, params);
  }

  /**
   * @method update
   * @instance
   * @description Update the mixer (being called on frame animation loop)
   * @memberof module:modules/mesh.AnimationModule
   */
  update() {
    //if (this.mixer) this.mixer.update(this.clock.getDelta() * this.params.speed);
  }

  integrate(self) {
    self.loop = new Loop(() => {
      var j = 0;
      self.update(); 
      self.loadedMesh.scale.setX(self.loadedMesh.scale.x+=.1);
      self.loadedMesh.geometry.scale(self.loadedMesh.scale.x+=.1, 1,1);
    });
    //self.currentMeshmesh.geometry.raduisTop = 200; 
    //if (!self.isDeferred) 
    self.loop.start(self.app);
  }

  manager(manager) {
    //manager.define('animation');
    var z = 0;
    this.scene = this.app.manager.get('camera');
  }

  bridge = {
    mesh(mesh, self) {
      console.log(mesh);
      self.loadedMesh = mesh;
      // //self.clonedGeometry = mesh.geometry.clone();
      // //self.clonedGeometry.height = self.clonedGeometry.height * 2;
      // //console.log("half level: " + self.halfLevel + "  and its original level: " + mesh.geometry.height);
      // var lod = new THREE.LOD();

      // //Create spheres with 3 levels of detail and create new LOD levels for them
      // for( var i = 0; i < 3; i++ ) {

      //   var geometry2 = new THREE.IcosahedronBufferGeometry( 10, 3 - i )

      //   var meshToAdd = new THREE.Mesh( geometry2, new THREE.Material() );

      //   lod.addLevel( meshToAdd, i * 75 );

      // }
      // mesh.geometry.scale(100,1,1);
      return mesh;
    }
  }
}
