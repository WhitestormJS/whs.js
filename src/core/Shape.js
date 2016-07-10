import * as THREE from 'three';

import {loadMaterial} from '../extras/api';
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

    super({
      mass: 10,
      build: true,
      softbody: false,
      geometry: {},

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

      morph: {
        speed: 1,
        duration: 1
      },

      physics: !!'physics'

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

        wait: [],
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
    this.wait.push(promise);
    return this;
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with shape
   * additionally.
   */
  wrap(...tags) {
    const _scope = this;

    if (tags.indexOf('wait') >= 0) {
      return new Promise((resolve, reject) => {
        Promise.all(_scope.wait).then(() => {
          try {
            if (tags.indexOf('no-shadows') < 0) {
              _scope.getNative().castShadow = true;
              _scope.getNative().receiveShadow = true;
            }

            if (tags.indexOf('no-transforms') < 0) {
              if (!_scope.getParams().softbody) {
                _scope.position.set(
                  _scope.__params.pos.x,
                  _scope.__params.pos.y,
                  _scope.__params.pos.z
                );

                _scope.rotation.set(
                  _scope.__params.rot.x,
                  _scope.__params.rot.y,
                  _scope.__params.rot.z
                );

                _scope.scale.set(
                  _scope.__params.scale.x,
                  _scope.__params.scale.y,
                  _scope.__params.scale.z
                );
              }
            }

            // Box helper.
            if (_scope.__params.helpers.box) {
              _scope.helpers.box = new THREE.BoxHelper(
                _scope.getNative()
              );
            }

            // Bounding box helper.
            if (_scope.__params.helpers.boundingBox) {
              _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(
                _scope.getNative(),
                _scope.__params.helpers.boundingBox.color
                ? _scope.__params.helpers.boundingBox.color
                : 0xffffff
              );
            }

            // Edges helper.
            if (_scope.__params.helpers.edges) {
              _scope.helpers.edges = new THREE.EdgesHelper(
                _scope.getNative(),
                _scope.__params.helpers.edges.color
                ? _scope.__params.helpers.edges.color
                : 0xffffff
              );
            }

            // faceNormals helper.
            if (_scope.__params.helpers.faceNormals) {
              _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.faceNormals.size
                ? _scope.__params.helpers.faceNormals.size
                : 2,
                _scope.__params.helpers.faceNormals.color
                ? _scope.__params.helpers.faceNormals.color
                : 0xffffff,
                _scope.__params.helpers.faceNormals.linewidth
                ? _scope.__params.helpers.faceNormals.linewidth
                : 1
              );
            }

            // vertexNormals helper.
            if (_scope.__params.helpers.vertexNormals) {
              _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.vertexNormals.size
                ? _scope.__params.helpers.vertexNormals.size
                : 2,
                _scope.__params.helpers.vertexNormals.color
                ? _scope.__params.helpers.vertexNormals.color
                : 0xffffff,
                _scope.__params.helpers.vertexNormals.linewidth
                ? _scope.__params.helpers.vertexNormals.linewidth
                : 1
              );
            }

            if (defaults.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

            _scope.emit('ready');

            resolve(_scope);
          } catch (err) {
            console.error(err.message);
            reject();
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          if (tags.indexOf('no-shadows') < 0) {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;
          }

          if (tags.indexOf('no-transforms') < 0) {
            if (!_scope.getParams().softbody) {
              _scope.position.set(
                _scope.__params.pos.x,
                _scope.__params.pos.y,
                _scope.__params.pos.z
              );

              _scope.rotation.set(
                _scope.__params.rot.x,
                _scope.__params.rot.y,
                _scope.__params.rot.z
              );

              _scope.scale.set(
                _scope.__params.scale.x,
                _scope.__params.scale.y,
                _scope.__params.scale.z
              );
            }
          }

          // Box helper.
          if (_scope.__params.helpers.box) {
            _scope.helpers.box = new THREE.BoxHelper(
              _scope.getNative()
            );
          }

          // Bounding box helper.
          if (_scope.__params.helpers.boundingBox) {
            _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(
              _scope.getNative(),
              _scope.__params.helpers.boundingBox.color
              ? _scope.__params.helpers.boundingBox.color
              : 0xffffff
            );
          }

          // Edges helper.
          if (_scope.__params.helpers.edges) {
            _scope.helpers.edges = new THREE.EdgesHelper(
              _scope.getNative(),
              _scope.__params.helpers.edges.color
              ? _scope.__params.helpers.edges.color
              : 0xffffff
            );
          }

          // faceNormals helper.
          if (_scope.__params.helpers.faceNormals) {
            _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(
              _scope.getNative(),
              _scope.__params.helpers.faceNormals.size
              ? _scope.__params.helpers.faceNormals.size
              : 2,
              _scope.__params.helpers.faceNormals.color
              ? _scope.__params.helpers.faceNormals.color
              : 0xffffff,
              _scope.__params.helpers.faceNormals.linewidth
              ? _scope.__params.helpers.faceNormals.linewidth
              : 1
            );
          }

          // vertexNormals helper.
          if (_scope.__params.helpers.vertexNormals) {
            _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(
              _scope.getNative(),
              _scope.__params.helpers.vertexNormals.size
              ? _scope.__params.helpers.vertexNormals.size
              : 2,
              _scope.__params.helpers.vertexNormals.color
              ? _scope.__params.helpers.vertexNormals.color
              : 0xffffff,
              _scope.__params.helpers.vertexNormals.linewidth
              ? _scope.__params.helpers.vertexNormals.linewidth
              : 1
            );
          }

          if (defaults.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

          resolve(_scope);

          _scope.emit('ready');
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }
  }

  /**
   * Add shape to WHS.World object.
   *
   * @param {WHS.World} parent - World, were this shape will be.
   * @param {...String} tags - Tags for compiling.
   */
  addTo(parent, ...tags) {
    const _helpers = this.helpers,
      _scope = this;

    _scope.parent = parent;

    if (tags.indexOf('wait') >= 0) {
      return new Promise((resolve, reject) => {
        Promise.all(_scope.wait).then(() => {
          try {
            const parentNative = _scope.parent instanceof World
              ? _scope.parent.getScene()
              : _scope.parent.getNative();

            parentNative.add(_scope.getNative());
            _scope.parent.children.push(_scope);

            if (_scope.__params.softbody) {
              _scope.native.position.set(0, 0, 0);
              _scope.native.rotation.set(0, 0, 0);
            }

            if (_scope.__params.helpers.box) parentNative.add(_helpers.box);
            if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);
            if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);
            if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);
            if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
          } catch (err) {
            console.error(err.message);
            reject();
          } finally {
            if (_scope._wait) {
              _scope.getNative().addEventListener('ready', () => {
                resolve(_scope);
              });
            } else resolve(_scope);

            _scope.getNative().addEventListener('collide', () => {
              _scope.emit('collide');
            });

            if (defaults.debug) {
              console.debug(
                `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                [_scope, _scope.parent]
              );
            }
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          const parentNative = _scope.parent instanceof World
            ? _scope.parent.getScene()
            : _scope.parent.getNative();

          parentNative.add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_scope.__params.softbody) {
            _scope.native.position.set(0, 0, 0);
            _scope.native.rotation.set(0, 0, 0);
          }

          if (_scope.__params.helpers.box) parentNative.add(_helpers.box);
          if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);
          if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);
          if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);
          if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (_scope._wait) {
            _scope.getNative().addEventListener('ready', () => {
              resolve(_scope);
            });
          } else resolve(_scope);

          _scope.getNative().addEventListener('collide', () => {
            _scope.emit('ready');
          });

          if (defaults.debug) {
            console.debug(
                `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                [_scope, _scope.parent]
              );
          }
        }
      });
    }
  }

  /**
   * Initialize shape's material object.
   */
  _initMaterial(params = {}) {
    return this.getParams().physics
      ? loadMaterial(params)._materialP
      : loadMaterial(params)._material;
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
    else this.setNative(sourceNative.clone());

    this.wrap();

    this.position.copy(source.position);
    this.rotation.copy(source.rotation);
    this.quaternion.copy(source.quaternion);

    this.getNative().mass = source.getNative().mass;

    return this;
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
        // this.__c_rot = false;
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
      this.native.geometry = this.buildGeometry(
        this.updateParams({geometry: params})
      );
    }
  }

  M_(params = {}) {
    this.native.material = this._initMaterial(
      this.updateParams({material: params}).material
    );
  }

  set M_color(val) {
    this.updateParams({material: {color: val}});
    this.native.material.color = new THREE.Color(val);
  }

  get M_color() {
    return this.native.material.color;
  }

  proccessSoftbodyGeometry(geometry) {
    geometry.rotateX(this.__params.rot.x);
    geometry.rotateY(this.__params.rot.x);
    geometry.rotateZ(this.__params.rot.x);

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
    this.native = native;
    this.position = this.native.position.clone();
    this.quaternion = this.native.quaternion.clone();
    this.rotation = this.native.rotation.clone();

    return this.native;
  }

  setMaterial(material) {
    this.native.material = material;
    return this.native.material;
  }

  setAngularVelocity(...args) {
    return this.getNative().setAngularVelocity(...args);
  }

  setLinearVelocity(...args) {
    return this.getNative().setLinearVelocity(...args);
  }

  follow(curve, time = 1000, loop) {
    const _scope = this,
      gEnd = time;

    let animation = new Loop(clock => {
      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u % 1),
        vec2 = curve.getPoint((u + 0.01) % 1);

      _scope.position.set(vec1.x, vec1.y, vec1.z);
      _scope.getNative().lookAt(vec2);
    });

    _scope.getWorld().addLoop(animation);

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new Loop(clock => {
          const u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);
          _scope.getNative().lookAt(vec2);
        });

        _scope.getWorld().addLoop(animation);

        animation.start();
      }, time);
    } else {
      setTimeout(() => {
        animation.stop();
        _scope.getWorld().removeLoop(animation);
      }, time);
    }
  }
}

export {
  Shape
};
