/* Built for whs v2.1.1 */
import { ControlsModule } from 'whs';
import { Matrix4 } from 'three';

/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 *
 * WebVR Spec: http://mozvr.github.io/webvr-spec/webvr.html
 *
 * Firefox: http://mozvr.com/downloads/
 * Chromium: https://webvr.info/get-chrome
 *
 */

var VREffect = function VREffect(renderer, onError) {

	var vrDisplay, vrDisplays;
	var eyeTranslationL = new THREE.Vector3();
	var eyeTranslationR = new THREE.Vector3();
	var renderRectL, renderRectR;

	var frameData = null;

	if ('VRFrameData' in window) {

		frameData = new VRFrameData();
	}

	function gotVRDisplays(displays) {

		vrDisplays = displays;

		if (displays.length > 0) {

			vrDisplay = displays[0];
		} else {

			if (onError) onError('HMD not available');
		}
	}

	if (navigator.getVRDisplays) {

		navigator.getVRDisplays().then(gotVRDisplays).catch(function () {

			console.warn('THREE.VREffect: Unable to get VR Displays');
		});
	}

	//

	this.isPresenting = false;
	this.scale = 1;

	var scope = this;

	var rendererSize = renderer.getSize();
	var rendererUpdateStyle = false;
	var rendererPixelRatio = renderer.getPixelRatio();

	this.getVRDisplay = function () {

		return vrDisplay;
	};

	this.setVRDisplay = function (value) {

		vrDisplay = value;
	};

	this.getVRDisplays = function () {

		console.warn('THREE.VREffect: getVRDisplays() is being deprecated.');
		return vrDisplays;
	};

	this.setSize = function (width, height, updateStyle) {

		rendererSize = { width: width, height: height };
		rendererUpdateStyle = updateStyle;

		if (scope.isPresenting) {

			var eyeParamsL = vrDisplay.getEyeParameters('left');
			renderer.setPixelRatio(1);
			renderer.setSize(eyeParamsL.renderWidth * 2, eyeParamsL.renderHeight, false);
		} else {

			renderer.setPixelRatio(rendererPixelRatio);
			renderer.setSize(width, height, updateStyle);
		}
	};

	// fullscreen

	var canvas = renderer.domElement;
	var requestFullscreen;
	var exitFullscreen;
	var fullscreenElement;
	var defaultLeftBounds = [0.0, 0.0, 0.5, 1.0];
	var defaultRightBounds = [0.5, 0.0, 0.5, 1.0];

	function onVRDisplayPresentChange() {

		var wasPresenting = scope.isPresenting;
		scope.isPresenting = vrDisplay !== undefined && vrDisplay.isPresenting;

		if (scope.isPresenting) {

			var eyeParamsL = vrDisplay.getEyeParameters('left');
			var eyeWidth = eyeParamsL.renderWidth;
			var eyeHeight = eyeParamsL.renderHeight;

			if (!wasPresenting) {

				rendererPixelRatio = renderer.getPixelRatio();
				rendererSize = renderer.getSize();

				renderer.setPixelRatio(1);
				renderer.setSize(eyeWidth * 2, eyeHeight, false);
			}
		} else if (wasPresenting) {

			renderer.setPixelRatio(rendererPixelRatio);
			renderer.setSize(rendererSize.width, rendererSize.height, rendererUpdateStyle);
		}
	}

	window.addEventListener('vrdisplaypresentchange', onVRDisplayPresentChange, false);

	this.setFullScreen = function (boolean) {

		return new Promise(function (resolve, reject) {

			if (vrDisplay === undefined) {

				reject(new Error('No VR hardware found.'));
				return;
			}

			if (scope.isPresenting === boolean) {

				resolve();
				return;
			}

			if (boolean) {

				resolve(vrDisplay.requestPresent([{ source: canvas }]));
			} else {

				resolve(vrDisplay.exitPresent());
			}
		});
	};

	this.requestPresent = function () {

		return this.setFullScreen(true);
	};

	this.exitPresent = function () {

		return this.setFullScreen(false);
	};

	this.requestAnimationFrame = function (f) {

		if (vrDisplay !== undefined) {

			return vrDisplay.requestAnimationFrame(f);
		} else {

			return window.requestAnimationFrame(f);
		}
	};

	this.cancelAnimationFrame = function (h) {

		if (vrDisplay !== undefined) {

			vrDisplay.cancelAnimationFrame(h);
		} else {

			window.cancelAnimationFrame(h);
		}
	};

	this.submitFrame = function () {

		if (vrDisplay !== undefined && scope.isPresenting) {

			vrDisplay.submitFrame();
		}
	};

	this.autoSubmitFrame = true;

	// render

	var cameraL = new THREE.PerspectiveCamera();
	cameraL.layers.enable(1);

	var cameraR = new THREE.PerspectiveCamera();
	cameraR.layers.enable(2);

	this.render = function (scene, camera, renderTarget, forceClear) {

		if (vrDisplay && scope.isPresenting) {

			var autoUpdate = scene.autoUpdate;

			if (autoUpdate) {

				scene.updateMatrixWorld();
				scene.autoUpdate = false;
			}

			var eyeParamsL = vrDisplay.getEyeParameters('left');
			var eyeParamsR = vrDisplay.getEyeParameters('right');

			eyeTranslationL.fromArray(eyeParamsL.offset);
			eyeTranslationR.fromArray(eyeParamsR.offset);

			if (Array.isArray(scene)) {

				console.warn('THREE.VREffect.render() no longer supports arrays. Use object.layers instead.');
				scene = scene[0];
			}

			// When rendering we don't care what the recommended size is, only what the actual size
			// of the backbuffer is.
			var size = renderer.getSize();
			var layers = vrDisplay.getLayers();
			var leftBounds;
			var rightBounds;

			if (layers.length) {

				var layer = layers[0];

				leftBounds = layer.leftBounds !== null && layer.leftBounds.length === 4 ? layer.leftBounds : defaultLeftBounds;
				rightBounds = layer.rightBounds !== null && layer.rightBounds.length === 4 ? layer.rightBounds : defaultRightBounds;
			} else {

				leftBounds = defaultLeftBounds;
				rightBounds = defaultRightBounds;
			}

			renderRectL = {
				x: Math.round(size.width * leftBounds[0]),
				y: Math.round(size.height * leftBounds[1]),
				width: Math.round(size.width * leftBounds[2]),
				height: Math.round(size.height * leftBounds[3])
			};
			renderRectR = {
				x: Math.round(size.width * rightBounds[0]),
				y: Math.round(size.height * rightBounds[1]),
				width: Math.round(size.width * rightBounds[2]),
				height: Math.round(size.height * rightBounds[3])
			};

			if (renderTarget) {

				renderer.setRenderTarget(renderTarget);
				renderTarget.scissorTest = true;
			} else {

				renderer.setRenderTarget(null);
				renderer.setScissorTest(true);
			}

			if (renderer.autoClear || forceClear) renderer.clear();

			if (camera.parent === null) camera.updateMatrixWorld();

			camera.matrixWorld.decompose(cameraL.position, cameraL.quaternion, cameraL.scale);
			camera.matrixWorld.decompose(cameraR.position, cameraR.quaternion, cameraR.scale);

			var scale = this.scale;
			cameraL.translateOnAxis(eyeTranslationL, scale);
			cameraR.translateOnAxis(eyeTranslationR, scale);

			if (vrDisplay.getFrameData) {

				vrDisplay.depthNear = camera.near;
				vrDisplay.depthFar = camera.far;

				vrDisplay.getFrameData(frameData);

				cameraL.projectionMatrix.elements = frameData.leftProjectionMatrix;
				cameraR.projectionMatrix.elements = frameData.rightProjectionMatrix;
			} else {

				cameraL.projectionMatrix = fovToProjection(eyeParamsL.fieldOfView, true, camera.near, camera.far);
				cameraR.projectionMatrix = fovToProjection(eyeParamsR.fieldOfView, true, camera.near, camera.far);
			}

			// render left eye
			if (renderTarget) {

				renderTarget.viewport.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height);
				renderTarget.scissor.set(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height);
			} else {

				renderer.setViewport(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height);
				renderer.setScissor(renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height);
			}
			renderer.render(scene, cameraL, renderTarget, forceClear);

			// render right eye
			if (renderTarget) {

				renderTarget.viewport.set(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height);
				renderTarget.scissor.set(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height);
			} else {

				renderer.setViewport(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height);
				renderer.setScissor(renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height);
			}
			renderer.render(scene, cameraR, renderTarget, forceClear);

			if (renderTarget) {

				renderTarget.viewport.set(0, 0, size.width, size.height);
				renderTarget.scissor.set(0, 0, size.width, size.height);
				renderTarget.scissorTest = false;
				renderer.setRenderTarget(null);
			} else {

				renderer.setViewport(0, 0, size.width, size.height);
				renderer.setScissorTest(false);
			}

			if (autoUpdate) {

				scene.autoUpdate = true;
			}

			if (scope.autoSubmitFrame) {

				scope.submitFrame();
			}

			return;
		}

		// Regular render mode if not HMD

		renderer.render(scene, camera, renderTarget, forceClear);
	};

	this.dispose = function () {

		window.removeEventListener('vrdisplaypresentchange', onVRDisplayPresentChange, false);
	};

	//

	function fovToNDCScaleOffset(fov) {

		var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
		var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
		var pyscale = 2.0 / (fov.upTan + fov.downTan);
		var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
		return { scale: [pxscale, pyscale], offset: [pxoffset, pyoffset] };
	}

	function fovPortToProjection(fov, rightHanded, zNear, zFar) {

		rightHanded = rightHanded === undefined ? true : rightHanded;
		zNear = zNear === undefined ? 0.01 : zNear;
		zFar = zFar === undefined ? 10000.0 : zFar;

		var handednessScale = rightHanded ? -1.0 : 1.0;

		// start with an identity matrix
		var mobj = new THREE.Matrix4();
		var m = mobj.elements;

		// and with scale/offset info for normalized device coords
		var scaleAndOffset = fovToNDCScaleOffset(fov);

		// X result, map clip edges to [-w,+w]
		m[0 * 4 + 0] = scaleAndOffset.scale[0];
		m[0 * 4 + 1] = 0.0;
		m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
		m[0 * 4 + 3] = 0.0;

		// Y result, map clip edges to [-w,+w]
		// Y offset is negated because this proj matrix transforms from world coords with Y=up,
		// but the NDC scaling has Y=down (thanks D3D?)
		m[1 * 4 + 0] = 0.0;
		m[1 * 4 + 1] = scaleAndOffset.scale[1];
		m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
		m[1 * 4 + 3] = 0.0;

		// Z result (up to the app)
		m[2 * 4 + 0] = 0.0;
		m[2 * 4 + 1] = 0.0;
		m[2 * 4 + 2] = zFar / (zNear - zFar) * -handednessScale;
		m[2 * 4 + 3] = zFar * zNear / (zNear - zFar);

		// W result (= Z in)
		m[3 * 4 + 0] = 0.0;
		m[3 * 4 + 1] = 0.0;
		m[3 * 4 + 2] = handednessScale;
		m[3 * 4 + 3] = 0.0;

		mobj.transpose();

		return mobj;
	}

	function fovToProjection(fov, rightHanded, zNear, zFar) {

		var DEG2RAD = Math.PI / 180.0;

		var fovPort = {
			upTan: Math.tan(fov.upDegrees * DEG2RAD),
			downTan: Math.tan(fov.downDegrees * DEG2RAD),
			leftTan: Math.tan(fov.leftDegrees * DEG2RAD),
			rightTan: Math.tan(fov.rightDegrees * DEG2RAD)
		};

		return fovPortToProjection(fovPort, rightHanded, zNear, zFar);
	}
};

/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 * @author halvves / https://github.com/halvves (i only es6 moduled it)
 */

class VRControls$1 {
  constructor(camera, onError) {
    this.camera = camera;
    this.vrDisplay;
    this.vrDisplays;
    this.standingMatrix = new Matrix4();
    this.frameData = null;

    if ('VRFrameData' in window) {
      this.frameData = new VRFrameData();
    }

    if (navigator.getVRDisplays) {
      navigator
        .getVRDisplays()
        .then((displays) => {
          this.vrDisplays = displays;
          if (displays.length > 0) {
            this.vrDisplay = displays[0];
          } else {
            if (onError) onError('VR input not available.');
          }
        })
        .catch(() => {
          console.warn('VRControls: Unable to get VR Displays');
        });
    }

    // the Rift SDK returns the position in meters
    // this scale factor allows the user to define how meters
    // are converted to scene units.
    this.scale = 1;

    // If true will use "standing space" coordinate system where y=0 is the
    // floor and x=0, z=0 is the center of the room.
    this.standing = false;

    // Distance from the users eyes to the floor in meters. Used when
    // standing=true but the VRDisplay doesn't provide stageParameters.
    this.userHeight = 1.6;
  }

  getVRDisplay() {
    return this.vrDisplay;
  };

  setVRDisplay(value) {
    this.vrDisplay = value;
  };

  getVRDisplays() {
    console.warn('VRControls: getVRDisplays() is being deprecated.');
    return this.vrDisplays;
  };

  getStandingMatrix() {
    return this.standingMatrix;
  };

  update() {
    const camera = this.camera;

    if (this.vrDisplay) {
      let pose;
      if (this.vrDisplay.getFrameData) {
        this.vrDisplay.getFrameData(this.frameData);
        pose = this.frameData.pose;
      } else if (this.vrDisplay.getPose) {
        pose = this.vrDisplay.getPose();
      }
      if (pose.orientation !== null) {
        camera.quaternion.fromArray(pose.orientation);
      }
      if (pose.position !== null) {
        camera.position.fromArray(pose.position);
      } else {
        camera.position.set(0, 0, 0);
      }
      if (this.standing) {
        if (this.vrDisplay.stageParameters) {
          camera.updateMatrix();
          this.standingMatrix.fromArray(this.vrDisplay.stageParameters.sittingToStandingTransform);
          camera.applyMatrix(this.standingMatrix);
        } else {
          camera.position.setY(camera.position.y + this.userHeight);
        }
      }
      camera.position.multiplyScalar(this.scale);
    }
  };

  dispose() {
    this.vrDisplay = null;
  };
}

/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */

var WEBVR = {

	isAvailable: function isAvailable() {

		console.warn('WEBVR: isAvailable() is being deprecated. Use .checkAvailability() instead.');
		return navigator.getVRDisplays !== undefined;
	},

	checkAvailability: function checkAvailability() {

		return new Promise(function (resolve, reject) {

			if (navigator.getVRDisplays !== undefined) {

				navigator.getVRDisplays().then(function (displays) {

					if (displays.length === 0) {

						reject('WebVR supported, but no VRDisplays found.');
					} else {

						resolve();
					}
				});
			} else {

				reject('Your browser does not support WebVR. See <a href="https://webvr.info">webvr.info</a> for assistance.');
			}
		});
	},

	getVRDisplay: function getVRDisplay(onDisplay) {

		if ('getVRDisplays' in navigator) {

			navigator.getVRDisplays().then(function (displays) {
				onDisplay(displays[0]);
			});
		}
	},

	getMessage: function getMessage() {

		console.warn('WEBVR: getMessage() is being deprecated. Use .getMessageContainer( message ) instead.');

		var message;

		if (navigator.getVRDisplays) {

			navigator.getVRDisplays().then(function (displays) {

				if (displays.length === 0) message = 'WebVR supported, but no VRDisplays found.';
			});
		} else {

			message = 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.';
		}

		if (message !== undefined) {

			var container = document.createElement('div');
			container.style.position = 'absolute';
			container.style.left = '0';
			container.style.top = '0';
			container.style.right = '0';
			container.style.zIndex = '999';
			container.align = 'center';

			var error = document.createElement('div');
			error.style.fontFamily = 'sans-serif';
			error.style.fontSize = '16px';
			error.style.fontStyle = 'normal';
			error.style.lineHeight = '26px';
			error.style.backgroundColor = '#fff';
			error.style.color = '#000';
			error.style.padding = '10px 20px';
			error.style.margin = '50px';
			error.style.display = 'inline-block';
			error.innerHTML = message;
			container.appendChild(error);

			return container;
		}
	},

	getMessageContainer: function getMessageContainer(message) {

		var container = document.createElement('div');
		container.style.position = 'absolute';
		container.style.left = '0';
		container.style.top = '0';
		container.style.right = '0';
		container.style.zIndex = '999';
		container.align = 'center';

		var error = document.createElement('div');
		error.style.fontFamily = 'sans-serif';
		error.style.fontSize = '16px';
		error.style.fontStyle = 'normal';
		error.style.lineHeight = '26px';
		error.style.backgroundColor = '#fff';
		error.style.color = '#000';
		error.style.padding = '10px 20px';
		error.style.margin = '50px';
		error.style.display = 'inline-block';
		error.innerHTML = message;
		container.appendChild(error);

		return container;
	},

	getButton: function getButton(display, canvas) {

		if ('VREffect' in THREE && display instanceof THREE.VREffect) {

			console.error('WebVR.getButton() now expects a VRDisplay.');
			return document.createElement('button');
		}

		var button = document.createElement('button');
		button.style.position = 'absolute';
		button.style.left = 'calc(50% - 50px)';
		button.style.bottom = '20px';
		button.style.width = '100px';
		button.style.border = '0';
		button.style.padding = '8px';
		button.style.cursor = 'pointer';
		button.style.backgroundColor = '#000';
		button.style.color = '#fff';
		button.style.fontFamily = 'sans-serif';
		button.style.fontSize = '13px';
		button.style.fontStyle = 'normal';
		button.style.textAlign = 'center';
		button.style.zIndex = '999';

		if (display) {

			button.textContent = 'ENTER VR';
			button.onclick = function () {

				display.isPresenting ? display.exitPresent() : display.requestPresent([{ source: canvas }]);
			};

			window.addEventListener('vrdisplaypresentchange', function () {

				button.textContent = display.isPresenting ? 'EXIT VR' : 'ENTER VR';
			}, false);
		} else {

			button.textContent = 'NO VR DISPLAY';
		}

		return button;
	}

};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var VRModule = function () {
  function VRModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, VRModule);

    this.params = Object.assign(params, {
      message: true,
      button: true
    });

    this.scene = null;
    this.camera = null;
    this.effect = null;
  }

  createClass(VRModule, [{
    key: 'manager',
    value: function manager(_manager) {
      var _this = this;

      _manager.define('vr');

      var rendering = _manager.use('rendering');
      var renderer = _manager.get('renderer');

      var resize = _manager.use('resize');

      this.effect = new VREffect(renderer);

      this.scene = _manager.get('scene');
      this.camera = _manager.get('camera');

      rendering.effect(this.effect);

      // TODO: Fix resize.

      resize.addCallback(function (width, height) {
        _this.effect.setSize(+width, +height);
      });

      // WEBVR
      var _params = this.params,
          message = _params.message,
          button = _params.button;


      if (message) WEBVR.checkAvailability().catch(function (message) {
        document.body.appendChild(WEBVR.getMessageContainer(message));
      });

      if (button) WEBVR.getVRDisplay(function (display) {
        document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
      });
    }
  }]);
  return VRModule;
}();

var VRControls = function (_ControlsModule) {
  inherits(VRControls, _ControlsModule);

  function VRControls(_ref) {
    var object = _ref.object,
        onError = _ref.onError,
        intensity = _ref.intensity;
    classCallCheck(this, VRControls);

    var controls = new VRControls$1(object.native, onError);

    controls.standing = true;
    controls.scale = intensity;

    return possibleConstructorReturn(this, (VRControls.__proto__ || Object.getPrototypeOf(VRControls)).call(this, { controls: controls }));
  }

  return VRControls;
}(ControlsModule);

export { VRModule, VRControls };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9WUkVmZmVjdC5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL25vZGVfbW9kdWxlcy90aHJlZS12cmNvbnRyb2xzLW1vZHVsZS9zcmMvdnItY29udHJvbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9XZWJWUi5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL1ZSS2l0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciBkbWFyY29zIC8gaHR0cHM6Ly9naXRodWIuY29tL2RtYXJjb3NcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqXG4gKiBXZWJWUiBTcGVjOiBodHRwOi8vbW96dnIuZ2l0aHViLmlvL3dlYnZyLXNwZWMvd2VidnIuaHRtbFxuICpcbiAqIEZpcmVmb3g6IGh0dHA6Ly9tb3p2ci5jb20vZG93bmxvYWRzL1xuICogQ2hyb21pdW06IGh0dHBzOi8vd2VidnIuaW5mby9nZXQtY2hyb21lXG4gKlxuICovXG5cbmV4cG9ydCBjb25zdCBWUkVmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIsIG9uRXJyb3IgKSB7XG5cblx0dmFyIHZyRGlzcGxheSwgdnJEaXNwbGF5cztcblx0dmFyIGV5ZVRyYW5zbGF0aW9uTCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciBleWVUcmFuc2xhdGlvblIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgcmVuZGVyUmVjdEwsIHJlbmRlclJlY3RSO1xuXG5cdHZhciBmcmFtZURhdGEgPSBudWxsO1xuXG5cdGlmICggJ1ZSRnJhbWVEYXRhJyBpbiB3aW5kb3cgKSB7XG5cblx0XHRmcmFtZURhdGEgPSBuZXcgVlJGcmFtZURhdGEoKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZ290VlJEaXNwbGF5cyggZGlzcGxheXMgKSB7XG5cblx0XHR2ckRpc3BsYXlzID0gZGlzcGxheXM7XG5cblx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdHZyRGlzcGxheSA9IGRpc3BsYXlzWyAwIF07XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIG9uRXJyb3IgKSBvbkVycm9yKCAnSE1EIG5vdCBhdmFpbGFibGUnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgKSB7XG5cblx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGdvdFZSRGlzcGxheXMgKS5jYXRjaCAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IFVuYWJsZSB0byBnZXQgVlIgRGlzcGxheXMnICk7XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8vXG5cblx0dGhpcy5pc1ByZXNlbnRpbmcgPSBmYWxzZTtcblx0dGhpcy5zY2FsZSA9IDE7XG5cblx0dmFyIHNjb3BlID0gdGhpcztcblxuXHR2YXIgcmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXHR2YXIgcmVuZGVyZXJVcGRhdGVTdHlsZSA9IGZhbHNlO1xuXHR2YXIgcmVuZGVyZXJQaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHZyRGlzcGxheTtcblxuXHR9O1xuXG5cdHRoaXMuc2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHZyRGlzcGxheSA9IHZhbHVlO1xuXG5cdH07XG5cblx0dGhpcy5nZXRWUkRpc3BsYXlzID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IGdldFZSRGlzcGxheXMoKSBpcyBiZWluZyBkZXByZWNhdGVkLicgKTtcblx0XHRyZXR1cm4gdnJEaXNwbGF5cztcblxuXHR9O1xuXG5cdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCwgdXBkYXRlU3R5bGUgKSB7XG5cblx0XHRyZW5kZXJlclNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcblx0XHRyZW5kZXJlclVwZGF0ZVN0eWxlID0gdXBkYXRlU3R5bGU7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCBleWVQYXJhbXNMLnJlbmRlcldpZHRoICogMiwgZXllUGFyYW1zTC5yZW5kZXJIZWlnaHQsIGZhbHNlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHQvLyBmdWxsc2NyZWVuXG5cblx0dmFyIGNhbnZhcyA9IHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cdHZhciByZXF1ZXN0RnVsbHNjcmVlbjtcblx0dmFyIGV4aXRGdWxsc2NyZWVuO1xuXHR2YXIgZnVsbHNjcmVlbkVsZW1lbnQ7XG5cdHZhciBkZWZhdWx0TGVmdEJvdW5kcyA9IFsgMC4wLCAwLjAsIDAuNSwgMS4wIF07XG5cdHZhciBkZWZhdWx0UmlnaHRCb3VuZHMgPSBbIDAuNSwgMC4wLCAwLjUsIDEuMCBdO1xuXG5cdGZ1bmN0aW9uIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSgpIHtcblxuXHRcdHZhciB3YXNQcmVzZW50aW5nID0gc2NvcGUuaXNQcmVzZW50aW5nO1xuXHRcdHNjb3BlLmlzUHJlc2VudGluZyA9IHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICYmIHZyRGlzcGxheS5pc1ByZXNlbnRpbmc7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllV2lkdGggPSBleWVQYXJhbXNMLnJlbmRlcldpZHRoO1xuXHRcdFx0dmFyIGV5ZUhlaWdodCA9IGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0O1xuXG5cdFx0XHRpZiAoICF3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblx0XHRcdFx0cmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIDEgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllV2lkdGggKiAyLCBleWVIZWlnaHQsIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHdhc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHJlbmRlcmVyUGl4ZWxSYXRpbyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggcmVuZGVyZXJTaXplLndpZHRoLCByZW5kZXJlclNpemUuaGVpZ2h0LCByZW5kZXJlclVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSwgZmFsc2UgKTtcblxuXHR0aGlzLnNldEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoIGJvb2xlYW4gKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uICggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJlamVjdCggbmV3IEVycm9yKCAnTm8gVlIgaGFyZHdhcmUgZm91bmQuJyApICk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyA9PT0gYm9vbGVhbiApIHtcblxuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LnJlcXVlc3RQcmVzZW50KCBbIHsgc291cmNlOiBjYW52YXMgfSBdICkgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZXNvbHZlKCB2ckRpc3BsYXkuZXhpdFByZXNlbnQoKSApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RQcmVzZW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnVsbFNjcmVlbiggdHJ1ZSApO1xuXG5cdH07XG5cblx0dGhpcy5leGl0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIGZhbHNlICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggZiApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHJldHVybiB2ckRpc3BsYXkucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggaCApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCBoICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLnN1Ym1pdEZyYW1lID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5zdWJtaXRGcmFtZSgpO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5hdXRvU3VibWl0RnJhbWUgPSB0cnVlO1xuXG5cdC8vIHJlbmRlclxuXG5cdHZhciBjYW1lcmFMID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYUwubGF5ZXJzLmVuYWJsZSggMSApO1xuXG5cdHZhciBjYW1lcmFSID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYVIubGF5ZXJzLmVuYWJsZSggMiApO1xuXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBhdXRvVXBkYXRlID0gc2NlbmUuYXV0b1VwZGF0ZTtcblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZXllUGFyYW1zTCA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAnbGVmdCcgKTtcblx0XHRcdHZhciBleWVQYXJhbXNSID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdyaWdodCcgKTtcblxuXHRcdFx0ZXllVHJhbnNsYXRpb25MLmZyb21BcnJheSggZXllUGFyYW1zTC5vZmZzZXQgKTtcblx0XHRcdGV5ZVRyYW5zbGF0aW9uUi5mcm9tQXJyYXkoIGV5ZVBhcmFtc1Iub2Zmc2V0ICk7XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggc2NlbmUgKSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WUkVmZmVjdC5yZW5kZXIoKSBubyBsb25nZXIgc3VwcG9ydHMgYXJyYXlzLiBVc2Ugb2JqZWN0LmxheWVycyBpbnN0ZWFkLicgKTtcblx0XHRcdFx0c2NlbmUgPSBzY2VuZVsgMCBdO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIFdoZW4gcmVuZGVyaW5nIHdlIGRvbid0IGNhcmUgd2hhdCB0aGUgcmVjb21tZW5kZWQgc2l6ZSBpcywgb25seSB3aGF0IHRoZSBhY3R1YWwgc2l6ZVxuXHRcdFx0Ly8gb2YgdGhlIGJhY2tidWZmZXIgaXMuXG5cdFx0XHR2YXIgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0XHRcdHZhciBsYXllcnMgPSB2ckRpc3BsYXkuZ2V0TGF5ZXJzKCk7XG5cdFx0XHR2YXIgbGVmdEJvdW5kcztcblx0XHRcdHZhciByaWdodEJvdW5kcztcblxuXHRcdFx0aWYgKCBsYXllcnMubGVuZ3RoICkge1xuXG5cdFx0XHRcdHZhciBsYXllciA9IGxheWVyc1sgMCBdO1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBsYXllci5sZWZ0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLmxlZnRCb3VuZHMubGVuZ3RoID09PSA0ID8gbGF5ZXIubGVmdEJvdW5kcyA6IGRlZmF1bHRMZWZ0Qm91bmRzO1xuXHRcdFx0XHRyaWdodEJvdW5kcyA9IGxheWVyLnJpZ2h0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLnJpZ2h0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLnJpZ2h0Qm91bmRzIDogZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBkZWZhdWx0UmlnaHRCb3VuZHM7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyUmVjdEwgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiBsZWZ0Qm91bmRzWyAxIF0gKSxcblx0XHRcdFx0d2lkdGg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cdFx0XHRyZW5kZXJSZWN0UiA9IHtcblx0XHRcdFx0eDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogcmlnaHRCb3VuZHNbIDIgXSApLFxuXHRcdFx0XHRoZWlnaHQ6IE1hdGgucm91bmQoc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCB0cnVlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgfHwgZm9yY2VDbGVhciApIHJlbmRlcmVyLmNsZWFyKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gbnVsbCApIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFMLnBvc2l0aW9uLCBjYW1lcmFMLnF1YXRlcm5pb24sIGNhbWVyYUwuc2NhbGUgKTtcblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIGNhbWVyYVIucG9zaXRpb24sIGNhbWVyYVIucXVhdGVybmlvbiwgY2FtZXJhUi5zY2FsZSApO1xuXG5cdFx0XHR2YXIgc2NhbGUgPSB0aGlzLnNjYWxlO1xuXHRcdFx0Y2FtZXJhTC50cmFuc2xhdGVPbkF4aXMoIGV5ZVRyYW5zbGF0aW9uTCwgc2NhbGUgKTtcblx0XHRcdGNhbWVyYVIudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvblIsIHNjYWxlICk7XG5cblx0XHRcdGlmICggdnJEaXNwbGF5LmdldEZyYW1lRGF0YSApIHtcblxuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhOZWFyID0gY2FtZXJhLm5lYXI7XG5cdFx0XHRcdHZyRGlzcGxheS5kZXB0aEZhciA9IGNhbWVyYS5mYXI7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmdldEZyYW1lRGF0YSggZnJhbWVEYXRhICk7XG5cblx0XHRcdFx0Y2FtZXJhTC5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLmxlZnRQcm9qZWN0aW9uTWF0cml4O1xuXHRcdFx0XHRjYW1lcmFSLnByb2plY3Rpb25NYXRyaXguZWxlbWVudHMgPSBmcmFtZURhdGEucmlnaHRQcm9qZWN0aW9uTWF0cml4O1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zTC5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4ID0gZm92VG9Qcm9qZWN0aW9uKCBleWVQYXJhbXNSLmZpZWxkT2ZWaWV3LCB0cnVlLCBjYW1lcmEubmVhciwgY2FtZXJhLmZhciApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbmRlciBsZWZ0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYUwsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHQvLyByZW5kZXIgcmlnaHQgZXllXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3IoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fVxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhUiwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3JUZXN0ID0gZmFsc2U7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggZmFsc2UgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGF1dG9VcGRhdGUgKSB7XG5cblx0XHRcdFx0c2NlbmUuYXV0b1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5hdXRvU3VibWl0RnJhbWUgKSB7XG5cblx0XHRcdFx0c2NvcGUuc3VibWl0RnJhbWUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHQvLyBSZWd1bGFyIHJlbmRlciBtb2RlIGlmIG5vdCBITURcblxuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0fTtcblxuXHR0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0fTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApIHtcblxuXHRcdHZhciBweHNjYWxlID0gMi4wIC8gKCBmb3YubGVmdFRhbiArIGZvdi5yaWdodFRhbiApO1xuXHRcdHZhciBweG9mZnNldCA9ICggZm92LmxlZnRUYW4gLSBmb3YucmlnaHRUYW4gKSAqIHB4c2NhbGUgKiAwLjU7XG5cdFx0dmFyIHB5c2NhbGUgPSAyLjAgLyAoIGZvdi51cFRhbiArIGZvdi5kb3duVGFuICk7XG5cdFx0dmFyIHB5b2Zmc2V0ID0gKCBmb3YudXBUYW4gLSBmb3YuZG93blRhbiApICogcHlzY2FsZSAqIDAuNTtcblx0XHRyZXR1cm4geyBzY2FsZTogWyBweHNjYWxlLCBweXNjYWxlIF0sIG9mZnNldDogWyBweG9mZnNldCwgcHlvZmZzZXQgXSB9O1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuXHRcdHJpZ2h0SGFuZGVkID0gcmlnaHRIYW5kZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByaWdodEhhbmRlZDtcblx0XHR6TmVhciA9IHpOZWFyID09PSB1bmRlZmluZWQgPyAwLjAxIDogek5lYXI7XG5cdFx0ekZhciA9IHpGYXIgPT09IHVuZGVmaW5lZCA/IDEwMDAwLjAgOiB6RmFyO1xuXG5cdFx0dmFyIGhhbmRlZG5lc3NTY2FsZSA9IHJpZ2h0SGFuZGVkID8gLSAxLjAgOiAxLjA7XG5cblx0XHQvLyBzdGFydCB3aXRoIGFuIGlkZW50aXR5IG1hdHJpeFxuXHRcdHZhciBtb2JqID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblx0XHR2YXIgbSA9IG1vYmouZWxlbWVudHM7XG5cblx0XHQvLyBhbmQgd2l0aCBzY2FsZS9vZmZzZXQgaW5mbyBmb3Igbm9ybWFsaXplZCBkZXZpY2UgY29vcmRzXG5cdFx0dmFyIHNjYWxlQW5kT2Zmc2V0ID0gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICk7XG5cblx0XHQvLyBYIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuXHRcdG1bIDAgKiA0ICsgMCBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDAgXTtcblx0XHRtWyAwICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAwICogNCArIDIgXSA9IHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMCBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDAgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWSByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHQvLyBZIG9mZnNldCBpcyBuZWdhdGVkIGJlY2F1c2UgdGhpcyBwcm9qIG1hdHJpeCB0cmFuc2Zvcm1zIGZyb20gd29ybGQgY29vcmRzIHdpdGggWT11cCxcblx0XHQvLyBidXQgdGhlIE5EQyBzY2FsaW5nIGhhcyBZPWRvd24gKHRoYW5rcyBEM0Q/KVxuXHRcdG1bIDEgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDEgKiA0ICsgMSBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDEgXTtcblx0XHRtWyAxICogNCArIDIgXSA9IC0gc2NhbGVBbmRPZmZzZXQub2Zmc2V0WyAxIF0gKiBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMSAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHQvLyBaIHJlc3VsdCAodXAgdG8gdGhlIGFwcClcblx0XHRtWyAyICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDIgXSA9IHpGYXIgLyAoIHpOZWFyIC0gekZhciApICogLSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMiAqIDQgKyAzIF0gPSAoIHpGYXIgKiB6TmVhciApIC8gKCB6TmVhciAtIHpGYXIgKTtcblxuXHRcdC8vIFcgcmVzdWx0ICg9IFogaW4pXG5cdFx0bVsgMyAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAyIF0gPSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMyAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHRtb2JqLnRyYW5zcG9zZSgpO1xuXG5cdFx0cmV0dXJuIG1vYmo7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGZvdlRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHR2YXIgREVHMlJBRCA9IE1hdGguUEkgLyAxODAuMDtcblxuXHRcdHZhciBmb3ZQb3J0ID0ge1xuXHRcdFx0dXBUYW46IE1hdGgudGFuKCBmb3YudXBEZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0ZG93blRhbjogTWF0aC50YW4oIGZvdi5kb3duRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGxlZnRUYW46IE1hdGgudGFuKCBmb3YubGVmdERlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRyaWdodFRhbjogTWF0aC50YW4oIGZvdi5yaWdodERlZ3JlZXMgKiBERUcyUkFEIClcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdlBvcnQsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApO1xuXG5cdH1cblxufTtcbiIsImltcG9ydCB7TWF0cml4NH0gZnJvbSAndGhyZWUnO1xuXG4gICAgLyoqXG4gKiBAYXV0aG9yIGRtYXJjb3MgLyBodHRwczovL2dpdGh1Yi5jb20vZG1hcmNvc1xuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICogQGF1dGhvciBoYWx2dmVzIC8gaHR0cHM6Ly9naXRodWIuY29tL2hhbHZ2ZXMgKGkgb25seSBlczYgbW9kdWxlZCBpdClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNvbnRyb2xzIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhLCBvbkVycm9yKSB7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy52ckRpc3BsYXk7XG4gICAgdGhpcy52ckRpc3BsYXlzO1xuICAgIHRoaXMuc3RhbmRpbmdNYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuICAgIHRoaXMuZnJhbWVEYXRhID0gbnVsbDtcblxuICAgIGlmICgnVlJGcmFtZURhdGEnIGluIHdpbmRvdykge1xuICAgICAgdGhpcy5mcmFtZURhdGEgPSBuZXcgVlJGcmFtZURhdGEoKTtcbiAgICB9XG5cbiAgICBpZiAobmF2aWdhdG9yLmdldFZSRGlzcGxheXMpIHtcbiAgICAgIG5hdmlnYXRvclxuICAgICAgICAuZ2V0VlJEaXNwbGF5cygpXG4gICAgICAgIC50aGVuKChkaXNwbGF5cykgPT4ge1xuICAgICAgICAgIHRoaXMudnJEaXNwbGF5cyA9IGRpc3BsYXlzO1xuICAgICAgICAgIGlmIChkaXNwbGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnZyRGlzcGxheSA9IGRpc3BsYXlzWzBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob25FcnJvcikgb25FcnJvcignVlIgaW5wdXQgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUkNvbnRyb2xzOiBVbmFibGUgdG8gZ2V0IFZSIERpc3BsYXlzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRoZSBSaWZ0IFNESyByZXR1cm5zIHRoZSBwb3NpdGlvbiBpbiBtZXRlcnNcbiAgICAvLyB0aGlzIHNjYWxlIGZhY3RvciBhbGxvd3MgdGhlIHVzZXIgdG8gZGVmaW5lIGhvdyBtZXRlcnNcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHNjZW5lIHVuaXRzLlxuICAgIHRoaXMuc2NhbGUgPSAxO1xuXG4gICAgLy8gSWYgdHJ1ZSB3aWxsIHVzZSBcInN0YW5kaW5nIHNwYWNlXCIgY29vcmRpbmF0ZSBzeXN0ZW0gd2hlcmUgeT0wIGlzIHRoZVxuICAgIC8vIGZsb29yIGFuZCB4PTAsIHo9MCBpcyB0aGUgY2VudGVyIG9mIHRoZSByb29tLlxuICAgIHRoaXMuc3RhbmRpbmcgPSBmYWxzZTtcblxuICAgIC8vIERpc3RhbmNlIGZyb20gdGhlIHVzZXJzIGV5ZXMgdG8gdGhlIGZsb29yIGluIG1ldGVycy4gVXNlZCB3aGVuXG4gICAgLy8gc3RhbmRpbmc9dHJ1ZSBidXQgdGhlIFZSRGlzcGxheSBkb2Vzbid0IHByb3ZpZGUgc3RhZ2VQYXJhbWV0ZXJzLlxuICAgIHRoaXMudXNlckhlaWdodCA9IDEuNjtcbiAgfVxuXG4gIGdldFZSRGlzcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy52ckRpc3BsYXk7XG4gIH07XG5cbiAgc2V0VlJEaXNwbGF5KHZhbHVlKSB7XG4gICAgdGhpcy52ckRpc3BsYXkgPSB2YWx1ZTtcbiAgfTtcblxuICBnZXRWUkRpc3BsYXlzKCkge1xuICAgIGNvbnNvbGUud2FybignVlJDb250cm9sczogZ2V0VlJEaXNwbGF5cygpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuJyk7XG4gICAgcmV0dXJuIHRoaXMudnJEaXNwbGF5cztcbiAgfTtcblxuICBnZXRTdGFuZGluZ01hdHJpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFuZGluZ01hdHJpeDtcbiAgfTtcblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XG5cbiAgICBpZiAodGhpcy52ckRpc3BsYXkpIHtcbiAgICAgIGxldCBwb3NlO1xuICAgICAgaWYgKHRoaXMudnJEaXNwbGF5LmdldEZyYW1lRGF0YSkge1xuICAgICAgICB0aGlzLnZyRGlzcGxheS5nZXRGcmFtZURhdGEodGhpcy5mcmFtZURhdGEpO1xuICAgICAgICBwb3NlID0gdGhpcy5mcmFtZURhdGEucG9zZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52ckRpc3BsYXkuZ2V0UG9zZSkge1xuICAgICAgICBwb3NlID0gdGhpcy52ckRpc3BsYXkuZ2V0UG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2Uub3JpZW50YXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgY2FtZXJhLnF1YXRlcm5pb24uZnJvbUFycmF5KHBvc2Uub3JpZW50YXRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2UucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmZyb21BcnJheShwb3NlLnBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGFuZGluZykge1xuICAgICAgICBpZiAodGhpcy52ckRpc3BsYXkuc3RhZ2VQYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgY2FtZXJhLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICAgIHRoaXMuc3RhbmRpbmdNYXRyaXguZnJvbUFycmF5KHRoaXMudnJEaXNwbGF5LnN0YWdlUGFyYW1ldGVycy5zaXR0aW5nVG9TdGFuZGluZ1RyYW5zZm9ybSk7XG4gICAgICAgICAgY2FtZXJhLmFwcGx5TWF0cml4KHRoaXMuc3RhbmRpbmdNYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXRZKGNhbWVyYS5wb3NpdGlvbi55ICsgdGhpcy51c2VySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FtZXJhLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKHRoaXMuc2NhbGUpO1xuICAgIH1cbiAgfTtcblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMudnJEaXNwbGF5ID0gbnVsbDtcbiAgfTtcbn07XG4iLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgTXVnZW44NyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9NdWdlbjg3XG4gKlxuICogQmFzZWQgb24gQHRvamlybydzIHZyLXNhbXBsZXMtdXRpbHMuanNcbiAqL1xuXG5leHBvcnQgY29uc3QgV0VCVlIgPSB7XG5cblx0aXNBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBpc0F2YWlsYWJsZSgpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSAuY2hlY2tBdmFpbGFiaWxpdHkoKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZDtcblxuXHR9LFxuXG5cdGNoZWNrQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG5cblx0XHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdFx0XHRcdFx0cmVqZWN0KCAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlamVjdCggJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHBzOi8vd2VidnIuaW5mb1wiPndlYnZyLmluZm88L2E+IGZvciBhc3Npc3RhbmNlLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH0sXG5cblx0Z2V0VlJEaXNwbGF5OiBmdW5jdGlvbiAoIG9uRGlzcGxheSApIHtcblxuXHRcdGlmICggJ2dldFZSRGlzcGxheXMnIGluIG5hdmlnYXRvciApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKVxuXHRcdFx0XHQudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblx0XHRcdFx0XHRvbkRpc3BsYXkoIGRpc3BsYXlzWyAwIF0gKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnV0VCVlI6IGdldE1lc3NhZ2UoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmdldE1lc3NhZ2VDb250YWluZXIoIG1lc3NhZ2UgKSBpbnN0ZWFkLicgKTtcblxuXHRcdHZhciBtZXNzYWdlO1xuXG5cdFx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdGlmICggZGlzcGxheXMubGVuZ3RoID09PSAwICkgbWVzc2FnZSA9ICdXZWJWUiBzdXBwb3J0ZWQsIGJ1dCBubyBWUkRpc3BsYXlzIGZvdW5kLic7XG5cblx0XHRcdH0gKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG1lc3NhZ2UgPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViVlIuIFNlZSA8YSBocmVmPVwiaHR0cDovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBtZXNzYWdlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnOTk5Jztcblx0XHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0XHRlcnJvci5zdHlsZS5saW5lSGVpZ2h0ID0gJzI2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0XHRlcnJvci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0XHRlcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZUNvbnRhaW5lcjogZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0Y29udGFpbmVyLmFsaWduID0gJ2NlbnRlcic7XG5cblx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdGVycm9yLnN0eWxlLm1hcmdpbiA9ICc1MHB4Jztcblx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGVycm9yICk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdH0sXG5cblx0Z2V0QnV0dG9uOiBmdW5jdGlvbiAoIGRpc3BsYXksIGNhbnZhcyApIHtcblxuXHRcdGlmICggJ1ZSRWZmZWN0JyBpbiBUSFJFRSAmJiBkaXNwbGF5IGluc3RhbmNlb2YgVEhSRUUuVlJFZmZlY3QgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdXZWJWUi5nZXRCdXR0b24oKSBub3cgZXhwZWN0cyBhIFZSRGlzcGxheS4nICk7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblxuXHRcdH1cblxuXHRcdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXHRcdGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0YnV0dG9uLnN0eWxlLmxlZnQgPSAnY2FsYyg1MCUgLSA1MHB4KSc7XG5cdFx0YnV0dG9uLnN0eWxlLmJvdHRvbSA9ICcyMHB4Jztcblx0XHRidXR0b24uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMCc7XG5cdFx0YnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnOHB4Jztcblx0XHRidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cdFx0YnV0dG9uLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRidXR0b24uc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0YnV0dG9uLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS56SW5kZXggPSAnOTk5JztcblxuXHRcdGlmICggZGlzcGxheSApIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ0VOVEVSIFZSJztcblx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGRpc3BsYXkuaXNQcmVzZW50aW5nID8gZGlzcGxheS5leGl0UHJlc2VudCgpIDogZGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gZGlzcGxheS5pc1ByZXNlbnRpbmcgPyAnRVhJVCBWUicgOiAnRU5URVIgVlInO1xuXG5cdFx0XHR9LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ05PIFZSIERJU1BMQVknO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbjtcblxuXHR9XG5cbn07XG4iLCJpbXBvcnQge0xvb3AsIENvbnRyb2xzTW9kdWxlfSBmcm9tICd3aHMnO1xuXG5pbXBvcnQge1ZSRWZmZWN0fSBmcm9tICcuL3ZyL1ZSRWZmZWN0JztcbmltcG9ydCBWUkNvbnRyb2xzTmF0aXZlIGZyb20gJ3RocmVlLXZyY29udHJvbHMtbW9kdWxlJztcbmltcG9ydCB7V0VCVlJ9IGZyb20gJy4vdnIvV2ViVlInO1xuXG5leHBvcnQgY2xhc3MgVlJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcbiAgICAgIG1lc3NhZ2U6IHRydWUsXG4gICAgICBidXR0b246IHRydWVcbiAgICB9KTtcblxuICAgIHRoaXMuc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICB0aGlzLmVmZmVjdCA9IG51bGw7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgndnInKTtcblxuICAgIGNvbnN0IHJlbmRlcmluZyA9IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKTtcbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuXG4gICAgY29uc3QgcmVzaXplID0gbWFuYWdlci51c2UoJ3Jlc2l6ZScpO1xuXG4gICAgdGhpcy5lZmZlY3QgPSBuZXcgVlJFZmZlY3QocmVuZGVyZXIpO1xuXG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgcmVuZGVyaW5nLmVmZmVjdCh0aGlzLmVmZmVjdCk7XG5cbiAgICAvLyBUT0RPOiBGaXggcmVzaXplLlxuXG4gICAgcmVzaXplLmFkZENhbGxiYWNrKCh3aWR0aCwgaGVpZ2h0KSA9PiB7XG4gICAgICB0aGlzLmVmZmVjdC5zZXRTaXplKCt3aWR0aCwgK2hlaWdodCk7XG4gICAgfSk7XG5cbiAgICAvLyBXRUJWUlxuICAgIGNvbnN0IHttZXNzYWdlLCBidXR0b259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICBpZiAobWVzc2FnZSkgV0VCVlIuY2hlY2tBdmFpbGFiaWxpdHkoKS5jYXRjaChtZXNzYWdlID0+IHtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoV0VCVlIuZ2V0TWVzc2FnZUNvbnRhaW5lcihtZXNzYWdlKSk7XG5cdFx0fSk7XG5cbiAgICBpZiAoYnV0dG9uKSBXRUJWUi5nZXRWUkRpc3BsYXkoZGlzcGxheSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFdFQlZSLmdldEJ1dHRvbihkaXNwbGF5LCByZW5kZXJlci5kb21FbGVtZW50KSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHtvYmplY3QsIG9uRXJyb3IsIGludGVuc2l0eX0pIHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBWUkNvbnRyb2xzTmF0aXZlKG9iamVjdC5uYXRpdmUsIG9uRXJyb3IpO1xuXG4gICAgY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgIGNvbnRyb2xzLnNjYWxlID0gaW50ZW5zaXR5O1xuXG4gICAgc3VwZXIoe2NvbnRyb2xzfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJWUkVmZmVjdCIsInJlbmRlcmVyIiwib25FcnJvciIsInZyRGlzcGxheSIsInZyRGlzcGxheXMiLCJleWVUcmFuc2xhdGlvbkwiLCJUSFJFRSIsIlZlY3RvcjMiLCJleWVUcmFuc2xhdGlvblIiLCJyZW5kZXJSZWN0TCIsInJlbmRlclJlY3RSIiwiZnJhbWVEYXRhIiwid2luZG93IiwiVlJGcmFtZURhdGEiLCJnb3RWUkRpc3BsYXlzIiwiZGlzcGxheXMiLCJsZW5ndGgiLCJuYXZpZ2F0b3IiLCJnZXRWUkRpc3BsYXlzIiwidGhlbiIsImNhdGNoIiwid2FybiIsImlzUHJlc2VudGluZyIsInNjYWxlIiwic2NvcGUiLCJyZW5kZXJlclNpemUiLCJnZXRTaXplIiwicmVuZGVyZXJVcGRhdGVTdHlsZSIsInJlbmRlcmVyUGl4ZWxSYXRpbyIsImdldFBpeGVsUmF0aW8iLCJnZXRWUkRpc3BsYXkiLCJzZXRWUkRpc3BsYXkiLCJ2YWx1ZSIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsInVwZGF0ZVN0eWxlIiwiZXllUGFyYW1zTCIsImdldEV5ZVBhcmFtZXRlcnMiLCJzZXRQaXhlbFJhdGlvIiwicmVuZGVyV2lkdGgiLCJyZW5kZXJIZWlnaHQiLCJjYW52YXMiLCJkb21FbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50IiwiZGVmYXVsdExlZnRCb3VuZHMiLCJkZWZhdWx0UmlnaHRCb3VuZHMiLCJvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UiLCJ3YXNQcmVzZW50aW5nIiwidW5kZWZpbmVkIiwiZXllV2lkdGgiLCJleWVIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RnVsbFNjcmVlbiIsImJvb2xlYW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwicmVxdWVzdFByZXNlbnQiLCJzb3VyY2UiLCJleGl0UHJlc2VudCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImgiLCJzdWJtaXRGcmFtZSIsImF1dG9TdWJtaXRGcmFtZSIsImNhbWVyYUwiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsImxheWVycyIsImVuYWJsZSIsImNhbWVyYVIiLCJyZW5kZXIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlclRhcmdldCIsImZvcmNlQ2xlYXIiLCJhdXRvVXBkYXRlIiwidXBkYXRlTWF0cml4V29ybGQiLCJleWVQYXJhbXNSIiwiZnJvbUFycmF5Iiwib2Zmc2V0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2l6ZSIsImdldExheWVycyIsImxlZnRCb3VuZHMiLCJyaWdodEJvdW5kcyIsImxheWVyIiwiTWF0aCIsInJvdW5kIiwic2V0UmVuZGVyVGFyZ2V0Iiwic2Npc3NvclRlc3QiLCJzZXRTY2lzc29yVGVzdCIsImF1dG9DbGVhciIsImNsZWFyIiwicGFyZW50IiwibWF0cml4V29ybGQiLCJkZWNvbXBvc2UiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJ0cmFuc2xhdGVPbkF4aXMiLCJnZXRGcmFtZURhdGEiLCJkZXB0aE5lYXIiLCJuZWFyIiwiZGVwdGhGYXIiLCJmYXIiLCJwcm9qZWN0aW9uTWF0cml4IiwiZWxlbWVudHMiLCJsZWZ0UHJvamVjdGlvbk1hdHJpeCIsInJpZ2h0UHJvamVjdGlvbk1hdHJpeCIsImZvdlRvUHJvamVjdGlvbiIsImZpZWxkT2ZWaWV3Iiwidmlld3BvcnQiLCJzZXQiLCJ4IiwieSIsInNjaXNzb3IiLCJzZXRWaWV3cG9ydCIsInNldFNjaXNzb3IiLCJkaXNwb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZvdlRvTkRDU2NhbGVPZmZzZXQiLCJmb3YiLCJweHNjYWxlIiwibGVmdFRhbiIsInJpZ2h0VGFuIiwicHhvZmZzZXQiLCJweXNjYWxlIiwidXBUYW4iLCJkb3duVGFuIiwicHlvZmZzZXQiLCJmb3ZQb3J0VG9Qcm9qZWN0aW9uIiwicmlnaHRIYW5kZWQiLCJ6TmVhciIsInpGYXIiLCJoYW5kZWRuZXNzU2NhbGUiLCJtb2JqIiwiTWF0cml4NCIsIm0iLCJzY2FsZUFuZE9mZnNldCIsInRyYW5zcG9zZSIsIkRFRzJSQUQiLCJQSSIsImZvdlBvcnQiLCJ0YW4iLCJ1cERlZ3JlZXMiLCJkb3duRGVncmVlcyIsImxlZnREZWdyZWVzIiwicmlnaHREZWdyZWVzIiwiVlJDb250cm9scyIsIldFQlZSIiwib25EaXNwbGF5IiwibWVzc2FnZSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiekluZGV4IiwiYWxpZ24iLCJlcnJvciIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRTdHlsZSIsImxpbmVIZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInBhZGRpbmciLCJtYXJnaW4iLCJkaXNwbGF5IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJib3R0b20iLCJib3JkZXIiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0Q29udGVudCIsIm9uY2xpY2siLCJWUk1vZHVsZSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImVmZmVjdCIsIm1hbmFnZXIiLCJkZWZpbmUiLCJyZW5kZXJpbmciLCJ1c2UiLCJnZXQiLCJyZXNpemUiLCJhZGRDYWxsYmFjayIsImNoZWNrQXZhaWxhYmlsaXR5IiwiYm9keSIsImdldE1lc3NhZ2VDb250YWluZXIiLCJnZXRCdXR0b24iLCJvYmplY3QiLCJpbnRlbnNpdHkiLCJjb250cm9scyIsIlZSQ29udHJvbHNOYXRpdmUiLCJuYXRpdmUiLCJzdGFuZGluZyIsIkNvbnRyb2xzTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7O0FBV0EsQUFBTyxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBV0MsUUFBWCxFQUFxQkMsT0FBckIsRUFBK0I7O0tBRWxEQyxTQUFKLEVBQWVDLFVBQWY7S0FDSUMsa0JBQWtCLElBQUlDLE1BQU1D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
