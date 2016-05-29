/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Camera super class */
WHS.Camera = class extends WHS.Object {

  /**
   * Constructing WHS.Camera object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Camera type.
   * @return {WHS.Camera}
   */
  constructor(params, type) {

    if (!type) console.error('@constructor: Please specify " type ".');

    const _set = function (x, y, z) {

      this.x = x;
      this.y = y;
      this.z = z;

    };

    params.useTarget = Boolean(params.target);

    super({
      camera: {
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1000,

        left: window.innerWidth / -2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: window.innerHeight / -2,

        cubeResolution: 128
      },

      helper: false,

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

      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      }
    });

    super.setParams(params);

    const scope = Object.assign(
      this,
      {
        _type: type,
        helper: false
      }
    );

    if (WHS.debug)
      console.debug(`@WHS.Camera: Camera ${scope._type} found.`, scope);

    return scope;

  }

  /**
   * Applying position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with light
   * additionally.
   */
  wrap(...tags) {

    const _scope = this;

    return new Promise((resolve, reject) => {

      try {

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

        if (_scope.__params.useTarget) _scope.lookAt(_scope.__params.target);

        if (_scope.__params.helper) {

          _scope.helper = new THREE.CameraHelper(
            _scope.getNative()
          );

        }

        tags.forEach(tag => {

          _scope[tag] = true;

        });

        if (WHS.debug)
          console.debug(`@WHS.Camera: Camera ${_scope._type} is ready.`, _scope);

        _scope.emit('ready');

        resolve(_scope);

      } catch (err) {

        console.error(err.message);
        reject();

      }

    });

  }

  /**
   * Add light to WHS.World object.
   *
   * @param {WHS.World} root - World, were this light will be.
   * @param {...String} tags - Tags for compiling.
   */
  addTo(parent) {

    this.parent = parent;

    const _helper = this.helper,
      _scope = this;

    return new Promise((resolve, reject) => {

      try {

        _scope.parent.getScene().add(_scope.getNative());
        _scope.parent.children.push(_scope);

        if (_helper) _scope.parent.getScene().add(_helper);

      } catch (err) {

        console.error(err.message);
        reject();

      } finally {

        if (WHS.debug) {

          console.debug(
            `@WHS.Camera: Camera ${_scope._type} was added to world.`,
            [_scope, _scope.parent]
          );

        }

        resolve(_scope);

        _scope.emit('ready');

      }

    });

  }

  /**
   * Clone camera.
   */
  clone() {

    return new WHS.Shape(this.__params, this._type).copy(this);

  }

  /**
   * Copy camera.
   *
   * @param {WHS.Camera} source - Source object, that will be applied to this.
   */
  copy(source) {

    this.mesh = source.mesh.clone();

    this.wrap();

    this.position = source.position.clone();
    this.rotation = source.rotation.clone();

    this._type = source._type;

    return this;

  }

  /* Access private data */

  setNative(camera) {

    return native.set(this, camera);

  }

  getNative() {

    return native.get(this);

  }

  get position() {

    return this.getNative().position;

  }

  set position(vector3) {

    return this.getNative().position.copy(vector3);

  }

  get rotation() {

    return this.getNative().rotation;

  }

  set rotation(euler) {

    return this.getNative().rotation.copy(euler);

  }

  follow(curve, time = 1000, loop, lookAt) {

    const _scope = this,
      gEnd = time;

    let animation = new WHS.loop(clock => {

      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u),
        vec2 = curve.getPoint((u + 0.01) % 1);

      _scope.position.set(vec1.x, vec1.y, vec1.z);

      if (!lookAt) _scope.lookAt(vec2);
      else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
      else if (
          lookAt instanceof THREE.Curve
          || lookAt instanceof THREE.CurvePath
        ) _scope.lookAt(lookAt.getPoint(u));

    });

    animation.start();

    if (loop) {

      setInterval(() => {

        animation.stop();

        animation = new WHS.loop(clock => {

          const u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u),
            vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);

          if (!lookAt) _scope.lookAt(vec2);
          else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
          else if (
              lookAt instanceof THREE.Curve
              || lookAt instanceof THREE.CurvePath
            ) _scope.lookAt(lookAt.getPoint(u));

        });

        animation.start();

      }, time);

    } else {

      setTimeout(() => {

        animation.stop();

      }, time);

    }

  }

  /* =========== POLYFILL =========== */

  lookAt(vector3) {

    return this.getNative().lookAt(vector3);

  }

  getWorldDirection(vector3) {

    return this.getNative().getWorldDirection(vector3);

  }

};
