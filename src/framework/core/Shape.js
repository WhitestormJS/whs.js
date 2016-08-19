import * as THREE from 'three';

import {loadMaterial, extend} from '../extras/api';
import {Loop} from '../extensions/Loop';
import {defaults} from '../utils/defaults';
import {World} from './World';
import {WHSObject} from './Object';

class Shape extends WHSObject {
  /**
   * Constructing WHS.Shape object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Shape type.
   * @return {WHS.Shape}
   */
  constructor(params = {}, type = 'mesh') {
    const _set = (x, y, z) => {
      this.x = x;
      this.y = y;
      this.z = z;
    };

    const physicsDefaults = !!'physics' ? {
      restitution: 0.3,
      friction: 0.8,
      damping: 0,
      pressure: 100,
      margin: 0,
      klst: 0.9,
      kvst: 0.9,
      klst: 0.9
    } : false;

    super({
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
    });

    if (params instanceof THREE.Object3D) {
      super.setParams({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z},
        scale: {x: params.scale.x, y: params.scale.y, z: params.scale.z},
        mass: params.mass,
        physics: Boolean(params._physijs)
      });
    } else super.setParams(params);

    const scope = Object.assign(this,
      {
        _type: type,
        __c_rot: false,

        _wait: [],

        helpers: {
          box: false,
          boundingBox: false,
          edges: false,
          faceNormals: false
        },

        physics: params.physics
      }
    );

    if (params instanceof THREE.Object3D) this.setNative(params);
    if (defaults.debug) console.debug(`@WHS.Shape: Shape ${scope._type} found.`, scope);

    return scope;
  }

  wait(promise) {
    this._wait.push(promise);
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with shape
   * additionally.
   */
  wrap(...tags) {
    if (this._wait.length) {
      return new Promise((resolve, reject) => {
        Promise.all(this._wait).then(() => {
          const _native = this.getNative(),
            _params = this.getParams(),
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

          if (WHS.debug) console.debug(`@WHS.Shape: Shape ${this._type} is ready.`, this);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const _native = this.getNative(),
          _params = this.getParams(),
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

        if (WHS.debug) console.debug(`@WHS.Shape: Shape ${this._type} is ready.`, this);
      });
    }
  }

  /**
   * Add shape to WHS.World object.
   *
   * @param {WHS.World} parent - World, were this shape will be.
   * @param {...String} tags - Tags for compiling.
   */
  addTo(parent) {
    const _helpers = this.helpers;
    this.parent = parent;

    if (this._wait.length) {
      return new Promise((resolve, reject) => {
        Promise.all(this._wait).then(() => {
          const _native = this.getNative(),
            _params = this.getParams(),
            _params_helpers = _params.helpers,
            _parent = this.parent;

          if (!_native) reject();

          const parentNative = _parent instanceof World ? _parent.getScene()
            : _parent.getNative();

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

          if (WHS.debug) {
            console.debug(
              `@WHS.Shape: Shape ${this._type} was added to world.`,
              [this, _parent]
            );
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        const _native = this.getNative(),
          _params = this.getParams(),
          _params_helpers = _params.helpers,
          _parent = this.parent;

        if (!_native) reject();

        const parentNative = _parent instanceof World ? _parent.getScene()
          : _parent.getNative();

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

        if (WHS.debug) {
          console.debug(
            `@WHS.Shape: Shape ${this._type} was added to world.`,
            [this, _parent]
          );
        }
      });
    }
  }

  /**
   * Clone shape.
   */
  clone() {
    return new WHS.Shape(this.getParams(), this._type).copy(this);
  }

  /**
   * Copy shape.
   *
   * @param {WHS.Shape} source - Source object, that will be applied to this.
   */
  copy(source) {
    const sourceNative = source.getNative();

    if (source.getParams().softbody)
      this.setNative(new sourceNative.constructor(sourceNative.tempGeometry.clone(), sourceNative.material, source.getParams()));
    else this.setNative(sourceNative.clone(source.getParams()));

    this.setParams(source.getParams());

    this.wrap();

    this.position.copy(source.position);
    this.rotation.copy(source.rotation);
    this.quaternion.copy(source.quaternion);

    this.getNative().mass = source.getNative().mass;

    return this;
  }

  getParent() {
    return this.parent;
  }

  /**
   * @return {WHS.World} - World object.
   */
  getWorld() {
    let p = this.parent;

    while (!(p instanceof World)) {
      if (p) p = p.parent;
      else return false;
    }

    return p;
  }

  get position() {
    return this.getNative().position;
  }

  set position(vector3) {
    const pos = this.getNative().position,
      native = this.getNative();

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

    return pos.copy(vector3);
  }

  get quaternion() {
    this.__c_rot = true;
    return this.getNative().quaternion;
  }

  set quaternion(quaternion) {
    const quat = this.getNative().quaternion,
      native = this.getNative();

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

    return quat;
  }

  get rotation() {
    this.__c_rot = true;
    return this.getNative().rotation;
  }

  set rotation(euler) {
    const rot = this.getNative().rotation,
      native = this.getNative();

    rot.copy(euler);

    rot.onChange(() => {
      if (this.__c_rot) {
        this.quaternion.copy(new THREE.Quaternion().setFromEuler(rot));
        native.__dirtyRotation = true;
      }
    });

    return rot;
  }

  get scale() {
    return this.getNative().scale;
  }

  set scale(vector3) {
    this.getNative().scale = vector3;
    return this.getNative().scale;
  }

  G_(params = {}) {
    if (this.buildGeometry) {
      this.getNative().geometry = this.buildGeometry(
        this.updateParams({geometry: params})
      );
    }
  }

  M_(params = {}) {
    this.getNative().material = loadMaterial(
      this.updateParams({material: params}).material
    );
  }

  set M_color(val) {
    this.updateParams({material: {color: val}});
    this.getNative().material.color = new THREE.Color(val);
  }

  get M_color() {
    return this.getNative().material.color;
  }

  proccessSoftbodyGeometry(geometry) {
    geometry.rotateX(this.__params.rot.x);
    geometry.rotateY(this.__params.rot.y);
    geometry.rotateZ(this.__params.rot.z);

    geometry.scale(
      this.__params.scale.x,
      this.__params.scale.y,
      this.__params.scale.z
    );

    geometry.translate(
      this.__params.pos.x,
      this.__params.pos.y,
      this.__params.pos.z
    );
  }

  /* Access private data */

  setNative(native) {
    this._native = native;

    this.position = native.position.clone();
    this.quaternion = native.quaternion.clone();
    this.rotation = native.rotation.clone();
  }

  setMaterial(material) {
    this._native.material = material;
    return this._native.material;
  }

  /* Physics */

  setAngularVelocity(...args) {
    return this.getNative().setAngularVelocity(...args);
  }

  setLinearVelocity(...args) {
    return this.getNative().setLinearVelocity(...args);
  }

  applyCentralImpulse(...args) {
    return this.getNative().applyCentralImpulse(...args);
  }

  applyImpulse(...args) {
    return this.getNative().applyImpulse(...args);
  }

  applyTorque(...args) {
    return this.getNative().applyTorque(...args);
  }

  applyCentralForce(...args) {
    return this.getNative().applyCentralForce(...args);
  }

  applyForce(...args) {
    return this.getNative().applyForce(...args);
  }

  getAngularVelocity(...args) {
    return this.getNative().getAngularVelocity(...args);
  }

  getLinearVelocity(...args) {
    return this.getNative().getLinearVelocity(...args);
  }

  setAngularFactor(...args) {
    return this.getNative().setAngularFactor(...args);
  }

  setLinearFactor(...args) {
    return this.getNative().setLinearFactor(...args);
  }

  setDamping(...args) {
    return this.getNative().setDamping(...args);
  }

  setCcdMotionThreshold(...args) {
    return this.getNative().setCcdMotionThreshold(...args);
  }

  setCcdSweptSphereRadius(...args) {
    return this.getNative().setCcdSweptSphereRadius(...args);
  }

  appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
    return this.getNative().appendAnchor(world.getScene(), object.getNative(), node, influence, collisionBetweenLinkedBodies);
  }

  /* Three.js */

  raycast(...args) {
    return this.getNative().lookAt(...args);
  }

  /* API */

  follow(curve, time = 1000, loop) {
    const gEnd = time;

    let animation = new Loop(clock => {
      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u % 1),
        vec2 = curve.getPoint((u + 0.01) % 1);

      this.position.set(vec1.x, vec1.y, vec1.z);
      this.getNative().lookAt(vec2);
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
          this.getNative().lookAt(vec2);
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
    this.getNative().visible = true;
  }

  hide() {
    this.getNative().visible = false;
  }
}

export {
  Shape
};
