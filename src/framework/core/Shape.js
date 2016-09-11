import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {loadMaterial, extend} from '../utils/index';
import {Loop} from '../extras/Loop';
import {World} from './World';
import {CoreObject} from './CoreObject';
import {deprecate} from '../utils/decorators';

const _set = (x, y, z) => {
  this.x = x;
  this.y = y;
  this.z = z;
};

const physicsDefaults = Physijs.default !== false ? {
  restitution: 0.3,
  friction: 0.8,
  damping: 0,
  pressure: 100,
  margin: 0,
  klst: 0.9,
  kvst: 0.9,
  klst: 0.9
} : false;

class Shape extends CoreObject {
  static defaults = {
    mass: 10,
    build: true,
    softbody: false,
    geometry: {},

    shadow: {
      cast: true,
      receive: true
    },

    material: {
      kind: 'basic'
    },

    helpers: {
      box: false,
      boundingBox: false,
      edges: false,
      faceNormals: false
    },

    pos: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    },

    rot: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    },

    scale: {
      x: 1,
      y: 1,
      z: 1,
      set: _set
    },

    target: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    },

    physics: physicsDefaults
  };

  __c_rot = false;
  _wait = [];

  helpers = {
    box: null,
    boundingBox: null,
    edges: null,
    faceNormals: null
  };

  constructor(params = {}, type = 'mesh') {
    super();

    if (params instanceof THREE.Object3D) {
      this.params = extend({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z},
        scale: {x: params.scale.x, y: params.scale.y, z: params.scale.z},
        mass: params.mass,
        physics: Boolean(params._physijs)
      }, Shape.defaults);
    } else this.params = extend(params, Shape.defaults);

    if (params instanceof THREE.Object3D) this.native = params;

    this.type = type;
    this.physics = Physijs.default !== false;
  }

  wait(promise) {
    this._wait.push(promise);
  }

  wrap(...tags) {
    if (this._wait.length) {
      return new Promise((resolve, reject) => {
        Promise.all(this._wait).then(() => {
          const _native = this.native,
            _params = this.params,
            _params_helpers = _params.helpers;

          if (!_native) reject();

          if (tags.indexOf('no-shadows') < 0) {
            _native.castShadow = _params.shadow.cast;
            _native.receiveShadow = _params.shadow.receive;
          }

          if (tags.indexOf('no-transforms') < 0) {
            if (!_params.softbody) {
              const _params_pos = _params.pos,
                _params_rot = _params.rot,
                _params_scale = _params.scale;

              this.position.set(
                _params_pos.x,
                _params_pos.y,
                _params_pos.z
              );

              this.rotation.set(
                _params_rot.x,
                _params_rot.y,
                _params_rot.z
              );

              this.scale.set(
                _params_scale.x,
                _params_scale.y,
                _params_scale.z
              );
            }
          }

          // Box helper.
          if (_params_helpers.box) {
            this.helpers.box = new THREE.BoxHelper(
              _native
            );
          }

          // Bounding box helper.
          if (_params_helpers.boundingBox) {
            extend(_params_helpers.boundingBox, {
              color: 0xffffff
            });

            this.helpers.boundingBox = new THREE.BoundingBoxHelper(
              _native,
              _params_helpers.boundingBox.color
              ? _params_helpers.boundingBox.color
              : 0xffffff
            );
          }

          // Edges helper.
          if (_params_helpers.edges) {
            extend(_params_helpers.edges, {
              color: 0xffffff
            });

            this.helpers.edges = new THREE.EdgesHelper(
              _native,
              _params_helpers.edges.color
            );
          }

          // faceNormals helper.
          if (_params_helpers.faceNormals) {
            const _params_helpers_faceNormals = _params_helpers.faceNormals;

            extend(_params_helpers_faceNormals, {
              size: 2,
              color: 0xffffff,
              linewidth: 1
            });

            this.helpers.faceNormals = new THREE.FaceNormalsHelper(
              _native,
              _params_helpers_faceNormals.size,
              _params_helpers_faceNormals.color,
              _params_helpers_faceNormals.linewidth
            );
          }

          // vertexNormals helper.
          if (_params_helpers.vertexNormals) {
            const _params_helpers_vertexNormals = _params_helpers.vertexNormals;

            extend(_params_helpers_vertexNormals, {
              size: 2,
              color: 0xffffff,
              linewidth: 1
            });

            this.helpers.vertexNormals = new THREE.VertexNormalsHelper(
              _native,
              _params_helpers_vertexNormals.size,
              _params_helpers_vertexNormals.color,
              _params_helpers_vertexNormals.linewidth
            );
          }

          resolve(this);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const _native = this.native,
          _params = this.params,
          _params_helpers = _params.helpers;

        if (!_native) reject();

        if (tags.indexOf('no-shadows') < 0) {
          _native.castShadow = _params.shadow.cast;
          _native.receiveShadow = _params.shadow.receive;
        }

        if (tags.indexOf('no-transforms') < 0) {
          if (!_params.softbody) {
            const _params_pos = _params.pos,
              _params_rot = _params.rot,
              _params_scale = _params.scale;

            this.position.set(
              _params_pos.x,
              _params_pos.y,
              _params_pos.z
            );

            this.rotation.set(
              _params_rot.x,
              _params_rot.y,
              _params_rot.z
            );

            this.scale.set(
              _params_scale.x,
              _params_scale.y,
              _params_scale.z
            );
          }
        }

        // Box helper.
        if (_params_helpers.box) {
          this.helpers.box = new THREE.BoxHelper(
            _native
          );
        }

        // Bounding box helper.
        if (_params_helpers.boundingBox) {
          extend(_params_helpers.boundingBox, {
            color: 0xffffff
          });

          this.helpers.boundingBox = new THREE.BoundingBoxHelper(
            _native,
            _params_helpers.boundingBox.color
            ? _params_helpers.boundingBox.color
            : 0xffffff
          );
        }

        // Edges helper.
        if (_params_helpers.edges) {
          extend(_params_helpers.edges, {
            color: 0xffffff
          });

          this.helpers.edges = new THREE.EdgesHelper(
            _native,
            _params_helpers.edges.color
          );
        }

        // faceNormals helper.
        if (_params_helpers.faceNormals) {
          const _params_helpers_faceNormals = _params_helpers.faceNormals;

          extend(_params_helpers_faceNormals, {
            size: 2,
            color: 0xffffff,
            linewidth: 1
          });

          this.helpers.faceNormals = new THREE.FaceNormalsHelper(
            _native,
            _params_helpers_faceNormals.size,
            _params_helpers_faceNormals.color,
            _params_helpers_faceNormals.linewidth
          );
        }

        // vertexNormals helper.
        if (_params_helpers.vertexNormals) {
          const _params_helpers_vertexNormals = _params_helpers.vertexNormals;

          extend(_params_helpers_vertexNormals, {
            size: 2,
            color: 0xffffff,
            linewidth: 1
          });

          this.helpers.vertexNormals = new THREE.VertexNormalsHelper(
            _native,
            _params_helpers_vertexNormals.size,
            _params_helpers_vertexNormals.color,
            _params_helpers_vertexNormals.linewidth
          );
        }

        resolve(this);
      });
    }
  }

  addTo(parent) {
    const _helpers = this.helpers;
    this.parent = parent;

    if (this._wait.length) {
      return new Promise((resolve, reject) => {
        Promise.all(this._wait).then(() => {
          const _native = this.native,
            _params = this.params,
            _params_helpers = _params.helpers,
            _parent = this.parent;

          if (!_native) reject();

          const parentNative = _parent instanceof World ? _parent.scene
            : _parent.native;

          parentNative.add(_native);
          this.parent.children.push(this);

          if (_params.softbody) {
            _native.position.set(0, 0, 0);
            _native.rotation.set(0, 0, 0);
          }

          if (_params_helpers.box) parentNative.add(_helpers.box);
          if (_params_helpers.boundingBox) parentNative.add(_helpers.boundingBox);
          if (_params_helpers.edges) parentNative.add(_helpers.edges);
          if (_params_helpers.faceNormals) parentNative.add(_helpers.faceNormals);
          if (_params_helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);

          resolve(this);

          _native.addEventListener('collision', () => {
            this.emit('collide');
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const _native = this.native,
          _params = this.params,
          _params_helpers = _params.helpers,
          _parent = this.parent;

        if (!_native) reject();

        const parentNative = _parent instanceof World ? _parent.scene
          : _parent.native;

        parentNative.add(_native);
        this.parent.children.push(this);

        if (_params.softbody) {
          _native.position.set(0, 0, 0);
          _native.rotation.set(0, 0, 0);
        }

        if (_params_helpers.box) parentNative.add(_helpers.box);
        if (_params_helpers.boundingBox) parentNative.add(_helpers.boundingBox);
        if (_params_helpers.edges) parentNative.add(_helpers.edges);
        if (_params_helpers.faceNormals) parentNative.add(_helpers.faceNormals);
        if (_params_helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);

        resolve(this);

        _native.addEventListener('collision', () => {
          this.emit('collide');
        });
      });
    }
  }

  clone() {
    return new Shape(this.params, this.type).copy(this);
  }

  copy(source) {
    const sourceNative = source.native;

    if (sourceNative) {
      if (source.params.softbody)
        this.native = new sourceNative.constructor(sourceNative.tempGeometry.clone(), sourceNative.material, source.params);
      else this.native = sourceNative.clone(source.params);

      this.native.mass = sourceNative.mass;

      this.params = source.params;

      this.wrap();

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    } else this.params = source.params;

    return this;
  }

  getParent() {
    return this.parent;
  }

  getWorld() {
    let p = this.parent;

    while (!(p instanceof World)) {
      if (p) p = p.parent;
      else return false;
    }

    return p;
  }

  get position() {
    return this.native.position;
  }

  set position(vector3) {
    const pos = this._native.position,
      native = this._native;

    Object.defineProperties(pos, {
      x: {
        get() {
          return this._x;
        },

        set(x) {
          native.__dirtyPosition = true;
          this._x = x;
        }
      },
      y: {
        get() {
          return this._y;
        },

        set(y) {
          native.__dirtyPosition = true;
          this._y = y;
        }
      },
      z: {
        get() {
          return this._z;
        },

        set(z) {
          native.__dirtyPosition = true;
          this._z = z;
        }
      }
    });

    native.__dirtyPosition = true;

    pos.copy(vector3);
  }

  get quaternion() {
    this.__c_rot = true;
    return this.native.quaternion;
  }

  set quaternion(quaternion) {
    const quat = this._native.quaternion,
      native = this._native;

    quat.copy(quaternion);

    quat.onChange(() => {
      if (this.__c_rot) {
        if (native.__dirtyRotation === true) {
          this.__c_rot = false;
          native.__dirtyRotation = false;
        }
        native.__dirtyRotation = true;
      }
    });
  }

  get rotation() {
    this.__c_rot = true;
    return this._native.rotation;
  }

  set rotation(euler) {
    const rot = this._native.rotation,
      native = this._native;

    rot.copy(euler);

    rot.onChange(() => {
      if (this.__c_rot) {
        this.quaternion.copy(new THREE.Quaternion().setFromEuler(rot));
        native.__dirtyRotation = true;
      }
    });
  }

  get scale() {
    return this.native.scale;
  }

  set scale(vector3) {
    this.native.scale.copy(vector3);
    return this.native.scale;
  }

  G_(params = {}) {
    if (this.buildGeometry) {
      this.native.geometry = this.buildGeometry(
        this.updateParams({geometry: params})
      );
    }
  }

  M_(params = {}) {
    if (this.params.material.kind !== params.kind)
      this.native.material = loadMaterial(
        this.updateParams({material: params}).material
      );
    else {
      this.updateParams({material: params});

      for (key in params) {
        this.native.material[key] = params[key];
      }
    }
  }

  set M_color(val) {
    this.updateParams({material: {color: val}});
    this.native.material.color = new THREE.Color(val);
  }

  get M_color() {
    return this.native.material.color;
  }

  get material() {
    return this.native.material;
  }

  set material(material) {
    this.native.material = material;
  }

  get geometry() {
    return this.native.geometry;
  }

  set geometry(geometry) {
    this.native.geometry = geometry;
  }

  proccessSoftbodyGeometry(geometry) {
    const _params = this.params;

    geometry.rotateX(_params.rot.x);
    geometry.rotateY(_params.rot.y);
    geometry.rotateZ(_params.rot.z);

    geometry.scale(
      _params.scale.x,
      _params.scale.y,
      _params.scale.z
    );

    geometry.translate(
      _params.pos.x,
      _params.pos.y,
      _params.pos.z
    );
  }

  /* Access private data */
  get native() {
    return this._native;
  }

  set native(mesh) {
    this._native = mesh;

    if (mesh instanceof THREE.Object3D) {
      this.position = mesh.position.clone();
      this.quaternion = mesh.quaternion.clone();
      this.rotation = mesh.rotation.clone();
    }
  }

  /* Physics */

  setAngularVelocity(...args) {
    return this.native.setAngularVelocity(...args);
  }

  setLinearVelocity(...args) {
    return this.native.setLinearVelocity(...args);
  }

  applyCentralImpulse(...args) {
    return this.native.applyCentralImpulse(...args);
  }

  applyImpulse(...args) {
    return this.native.applyImpulse(...args);
  }

  applyTorque(...args) {
    return this.native.applyTorque(...args);
  }

  applyCentralForce(...args) {
    return this.native.applyCentralForce(...args);
  }

  applyForce(...args) {
    return this.native.applyForce(...args);
  }

  getAngularVelocity(...args) {
    return this.native.getAngularVelocity(...args);
  }

  getLinearVelocity(...args) {
    return this.native.getLinearVelocity(...args);
  }

  setAngularFactor(...args) {
    return this.native.setAngularFactor(...args);
  }

  setLinearFactor(...args) {
    return this.native.setLinearFactor(...args);
  }

  setDamping(...args) {
    return this.native.setDamping(...args);
  }

  setCcdMotionThreshold(...args) {
    return this.native.setCcdMotionThreshold(...args);
  }

  setCcdSweptSphereRadius(...args) {
    return this.native.setCcdSweptSphereRadius(...args);
  }

  appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
    return this.native.appendAnchor(world.scene, object.native, node, influence, collisionBetweenLinkedBodies);
  }

  /* Three.js */

  raycast(...args) {
    return this.native.lookAt(...args);
  }

  /* API */
  @deprecate('0.0.11')
  follow(curve, time = 1000, loop) {
    const gEnd = time;

    let animation = new Loop(clock => {
      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u % 1),
        vec2 = curve.getPoint((u + 0.01) % 1);

      this.position.set(vec1.x, vec1.y, vec1.z);
      this.native.lookAt(vec2);
    });

    this.getWorld().addLoop(animation);

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new Loop(clock => {
          const u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

          this.position.set(vec1.x, vec1.y, vec1.z);
          this.native.lookAt(vec2);
        });

        this.getWorld().addLoop(animation);

        animation.start();
      }, time);
    } else {
      setTimeout(() => {
        animation.stop();
        this.getWorld().removeLoop(animation);
      }, time);
    }
  }

  /* VISIBILITY */
  show() {
    this.native.visible = true;
  }

  hide() {
    this.native.visible = false;
  }
}

export {
  Shape
};
