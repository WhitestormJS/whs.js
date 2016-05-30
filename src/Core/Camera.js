WHS.Camera = class extends WHS.Object {
  constructor(params, type) {
    if (!type) {
      console.error('@constructor: Please specify " type ".');
    }

    let _set = function (x, y, z) {
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

    var scope = Object.assign(
      this,
      {
        _type: type,
        helper: false
      }
    );

    if (WHS.debug) {
      console.debug('@WHS.Camera: Camera ' + scope._type +
      ' found.', scope);
    }

    return scope;
  }

  wrap(...tags) {
    'use strict';

    let _scope = this;

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

        if (_scope.__params.useTarget) {
          _scope.lookAt(_scope.__params.target);
        }

        if (_scope.__params.helper) {
          _scope.helper = new THREE.CameraHelper(
            _scope.getNative()
          );
        }

        tags.forEach(tag => {
          _scope[tag] = true;
        });

        if (WHS.debug) {
          console.debug('@WHS.Camera: Camera ' + _scope._type + ' is ready.', _scope);
        }

        _scope.emit('ready');

        resolve(_scope);
      } catch (err) {
        console.error(err.message);

        reject();
      }
    });
  }

  addTo(parent) {
    'use strict';

    this.parent = parent;

    let _helper = this.helper;
    let _scope = this;

    return new Promise((resolve, reject) => {
      try {
        _scope.parent.getScene().add(_scope.getNative());
        _scope.parent.children.push(_scope);

        if (_helper) {
          _scope.parent.getScene().add(_helper);
        }
      } catch (err) {
        console.error(err.message);
        reject();
      } finally {
        if (WHS.debug) {
          console.debug(
            '@WHS.Camera: Camera ' + _scope._type + ' was added to world.',
            [_scope, _scope.parent]
          );
        }

        resolve(_scope);

        _scope.emit('ready');
      }
    });
  }

  clone() {
    return new WHS.Shape(this.__params, this._type).copy(this);
  }

  copy(source) {
    this.mesh = source.mesh.clone();

    this.wrap();

    this.position = source.position.clone();
    this.rotation = source.rotation.clone();

    this._type = source._type;

    return this;
  }

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
    let _scope = this;
    let gEnd = time;

    let animation = new WHS.loop(clock => {
      let u =  clock.getElapsedTime() * 1000 / gEnd;
      let vec1 = curve.getPoint(u);
      let vec2 = curve.getPoint((u + 0.01) % 1);

      _scope.position.set(vec1.x, vec1.y, vec1.z);

      if (!lookAt) {
        _scope.lookAt(vec2);
      } else if (lookAt instanceof THREE.Vector3) {
        _scope.lookAt(lookAt);
      } else if (
          lookAt instanceof THREE.Curve ||
          lookAt instanceof THREE.CurvePath
        ) {
        _scope.lookAt(lookAt.getPoint(u));
      }
    });

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new WHS.loop(clock => {
          let u =  clock.getElapsedTime() * 1000 / gEnd;
          let vec1 = curve.getPoint(u);
          let vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);

          if (!lookAt) {
            _scope.lookAt(vec2);
          } else if (lookAt instanceof THREE.Vector3) {
            _scope.lookAt(lookAt);
          } else if (
              lookAt instanceof THREE.Curve ||
              lookAt instanceof THREE.CurvePath
            ) {
            _scope.lookAt(lookAt.getPoint(u));
          }
        });

        animation.start();
      }, time);
    } else {
      setTimeout(() => {
        animation.stop();
      }, time);
    }
  }

  lookAt(vector3) {
    return this.getNative().lookAt(vector3);
  }

  getWorldDirection(vector3) {
    return this.getNative().getWorldDirection(vector3);
  }
};
