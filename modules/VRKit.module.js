/* Built for whs v2.1.8-vrfix.1 */
import { ControlsModule } from 'whs';
import { Matrix4, REVISION } from 'three';

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

      if (REVISION > 86) console.warn('Please use VRModule2 for Three.js ^0.87.0 (r87)');

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
        var vrbtn = WEBVR.getButton(display, renderer.domElement);
        vrbtn.className = 'vr-btn';

        document.body.appendChild(vrbtn);
      });
    }
  }]);
  return VRModule;
}();

var VR2Module = function () {
  function VR2Module() {
    classCallCheck(this, VR2Module);

    this.display = new Promise(function (resolve) {
      return WEBVR.getVRDisplay(function (display) {
        return resolve(display);
      });
    });
  }

  createClass(VR2Module, [{
    key: 'manager',
    value: function manager(_manager2) {
      _manager2.define('vr');

      var renderer = _manager2.get('renderer');
      renderer.vr.enabled = true;
      console.log(REVISION);
      console.log(1);

      this.display.then(function (display) {
        renderer.vr.setDevice(display);

        var vrbtn = WEBVR.getButton(display, renderer.domElement);
        vrbtn.className = 'vr-btn';

        document.body.appendChild(vrbtn);
      });
    }
  }]);
  return VR2Module;
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

export { WEBVR, VRModule, VR2Module, VRControls };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9WUkVmZmVjdC5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL25vZGVfbW9kdWxlcy90aHJlZS12cmNvbnRyb2xzLW1vZHVsZS9zcmMvdnItY29udHJvbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9XZWJWUi5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL1ZSS2l0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciBkbWFyY29zIC8gaHR0cHM6Ly9naXRodWIuY29tL2RtYXJjb3NcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqXG4gKiBXZWJWUiBTcGVjOiBodHRwOi8vbW96dnIuZ2l0aHViLmlvL3dlYnZyLXNwZWMvd2VidnIuaHRtbFxuICpcbiAqIEZpcmVmb3g6IGh0dHA6Ly9tb3p2ci5jb20vZG93bmxvYWRzL1xuICogQ2hyb21pdW06IGh0dHBzOi8vd2VidnIuaW5mby9nZXQtY2hyb21lXG4gKlxuICovXG5cbmV4cG9ydCBjb25zdCBWUkVmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIsIG9uRXJyb3IgKSB7XG5cblx0dmFyIHZyRGlzcGxheSwgdnJEaXNwbGF5cztcblx0dmFyIGV5ZVRyYW5zbGF0aW9uTCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciBleWVUcmFuc2xhdGlvblIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgcmVuZGVyUmVjdEwsIHJlbmRlclJlY3RSO1xuXG5cdHZhciBmcmFtZURhdGEgPSBudWxsO1xuXG5cdGlmICggJ1ZSRnJhbWVEYXRhJyBpbiB3aW5kb3cgKSB7XG5cblx0XHRmcmFtZURhdGEgPSBuZXcgVlJGcmFtZURhdGEoKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZ290VlJEaXNwbGF5cyggZGlzcGxheXMgKSB7XG5cblx0XHR2ckRpc3BsYXlzID0gZGlzcGxheXM7XG5cblx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdHZyRGlzcGxheSA9IGRpc3BsYXlzWyAwIF07XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIG9uRXJyb3IgKSBvbkVycm9yKCAnSE1EIG5vdCBhdmFpbGFibGUnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgKSB7XG5cblx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGdvdFZSRGlzcGxheXMgKS5jYXRjaCAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IFVuYWJsZSB0byBnZXQgVlIgRGlzcGxheXMnICk7XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8vXG5cblx0dGhpcy5pc1ByZXNlbnRpbmcgPSBmYWxzZTtcblx0dGhpcy5zY2FsZSA9IDE7XG5cblx0dmFyIHNjb3BlID0gdGhpcztcblxuXHR2YXIgcmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXHR2YXIgcmVuZGVyZXJVcGRhdGVTdHlsZSA9IGZhbHNlO1xuXHR2YXIgcmVuZGVyZXJQaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHZyRGlzcGxheTtcblxuXHR9O1xuXG5cdHRoaXMuc2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHZyRGlzcGxheSA9IHZhbHVlO1xuXG5cdH07XG5cblx0dGhpcy5nZXRWUkRpc3BsYXlzID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IGdldFZSRGlzcGxheXMoKSBpcyBiZWluZyBkZXByZWNhdGVkLicgKTtcblx0XHRyZXR1cm4gdnJEaXNwbGF5cztcblxuXHR9O1xuXG5cdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCwgdXBkYXRlU3R5bGUgKSB7XG5cblx0XHRyZW5kZXJlclNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcblx0XHRyZW5kZXJlclVwZGF0ZVN0eWxlID0gdXBkYXRlU3R5bGU7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCBleWVQYXJhbXNMLnJlbmRlcldpZHRoICogMiwgZXllUGFyYW1zTC5yZW5kZXJIZWlnaHQsIGZhbHNlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHQvLyBmdWxsc2NyZWVuXG5cblx0dmFyIGNhbnZhcyA9IHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cdHZhciByZXF1ZXN0RnVsbHNjcmVlbjtcblx0dmFyIGV4aXRGdWxsc2NyZWVuO1xuXHR2YXIgZnVsbHNjcmVlbkVsZW1lbnQ7XG5cdHZhciBkZWZhdWx0TGVmdEJvdW5kcyA9IFsgMC4wLCAwLjAsIDAuNSwgMS4wIF07XG5cdHZhciBkZWZhdWx0UmlnaHRCb3VuZHMgPSBbIDAuNSwgMC4wLCAwLjUsIDEuMCBdO1xuXG5cdGZ1bmN0aW9uIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSgpIHtcblxuXHRcdHZhciB3YXNQcmVzZW50aW5nID0gc2NvcGUuaXNQcmVzZW50aW5nO1xuXHRcdHNjb3BlLmlzUHJlc2VudGluZyA9IHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICYmIHZyRGlzcGxheS5pc1ByZXNlbnRpbmc7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllV2lkdGggPSBleWVQYXJhbXNMLnJlbmRlcldpZHRoO1xuXHRcdFx0dmFyIGV5ZUhlaWdodCA9IGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0O1xuXG5cdFx0XHRpZiAoICF3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblx0XHRcdFx0cmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIDEgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllV2lkdGggKiAyLCBleWVIZWlnaHQsIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHdhc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHJlbmRlcmVyUGl4ZWxSYXRpbyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggcmVuZGVyZXJTaXplLndpZHRoLCByZW5kZXJlclNpemUuaGVpZ2h0LCByZW5kZXJlclVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSwgZmFsc2UgKTtcblxuXHR0aGlzLnNldEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoIGJvb2xlYW4gKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uICggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJlamVjdCggbmV3IEVycm9yKCAnTm8gVlIgaGFyZHdhcmUgZm91bmQuJyApICk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyA9PT0gYm9vbGVhbiApIHtcblxuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LnJlcXVlc3RQcmVzZW50KCBbIHsgc291cmNlOiBjYW52YXMgfSBdICkgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZXNvbHZlKCB2ckRpc3BsYXkuZXhpdFByZXNlbnQoKSApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RQcmVzZW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnVsbFNjcmVlbiggdHJ1ZSApO1xuXG5cdH07XG5cblx0dGhpcy5leGl0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIGZhbHNlICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggZiApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHJldHVybiB2ckRpc3BsYXkucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggaCApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCBoICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLnN1Ym1pdEZyYW1lID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5zdWJtaXRGcmFtZSgpO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5hdXRvU3VibWl0RnJhbWUgPSB0cnVlO1xuXG5cdC8vIHJlbmRlclxuXG5cdHZhciBjYW1lcmFMID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYUwubGF5ZXJzLmVuYWJsZSggMSApO1xuXG5cdHZhciBjYW1lcmFSID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYVIubGF5ZXJzLmVuYWJsZSggMiApO1xuXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBhdXRvVXBkYXRlID0gc2NlbmUuYXV0b1VwZGF0ZTtcblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZXllUGFyYW1zTCA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAnbGVmdCcgKTtcblx0XHRcdHZhciBleWVQYXJhbXNSID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdyaWdodCcgKTtcblxuXHRcdFx0ZXllVHJhbnNsYXRpb25MLmZyb21BcnJheSggZXllUGFyYW1zTC5vZmZzZXQgKTtcblx0XHRcdGV5ZVRyYW5zbGF0aW9uUi5mcm9tQXJyYXkoIGV5ZVBhcmFtc1Iub2Zmc2V0ICk7XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggc2NlbmUgKSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WUkVmZmVjdC5yZW5kZXIoKSBubyBsb25nZXIgc3VwcG9ydHMgYXJyYXlzLiBVc2Ugb2JqZWN0LmxheWVycyBpbnN0ZWFkLicgKTtcblx0XHRcdFx0c2NlbmUgPSBzY2VuZVsgMCBdO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIFdoZW4gcmVuZGVyaW5nIHdlIGRvbid0IGNhcmUgd2hhdCB0aGUgcmVjb21tZW5kZWQgc2l6ZSBpcywgb25seSB3aGF0IHRoZSBhY3R1YWwgc2l6ZVxuXHRcdFx0Ly8gb2YgdGhlIGJhY2tidWZmZXIgaXMuXG5cdFx0XHR2YXIgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0XHRcdHZhciBsYXllcnMgPSB2ckRpc3BsYXkuZ2V0TGF5ZXJzKCk7XG5cdFx0XHR2YXIgbGVmdEJvdW5kcztcblx0XHRcdHZhciByaWdodEJvdW5kcztcblxuXHRcdFx0aWYgKCBsYXllcnMubGVuZ3RoICkge1xuXG5cdFx0XHRcdHZhciBsYXllciA9IGxheWVyc1sgMCBdO1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBsYXllci5sZWZ0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLmxlZnRCb3VuZHMubGVuZ3RoID09PSA0ID8gbGF5ZXIubGVmdEJvdW5kcyA6IGRlZmF1bHRMZWZ0Qm91bmRzO1xuXHRcdFx0XHRyaWdodEJvdW5kcyA9IGxheWVyLnJpZ2h0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLnJpZ2h0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLnJpZ2h0Qm91bmRzIDogZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBkZWZhdWx0UmlnaHRCb3VuZHM7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyUmVjdEwgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiBsZWZ0Qm91bmRzWyAxIF0gKSxcblx0XHRcdFx0d2lkdGg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cdFx0XHRyZW5kZXJSZWN0UiA9IHtcblx0XHRcdFx0eDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogcmlnaHRCb3VuZHNbIDIgXSApLFxuXHRcdFx0XHRoZWlnaHQ6IE1hdGgucm91bmQoc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCB0cnVlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgfHwgZm9yY2VDbGVhciApIHJlbmRlcmVyLmNsZWFyKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gbnVsbCApIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFMLnBvc2l0aW9uLCBjYW1lcmFMLnF1YXRlcm5pb24sIGNhbWVyYUwuc2NhbGUgKTtcblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIGNhbWVyYVIucG9zaXRpb24sIGNhbWVyYVIucXVhdGVybmlvbiwgY2FtZXJhUi5zY2FsZSApO1xuXG5cdFx0XHR2YXIgc2NhbGUgPSB0aGlzLnNjYWxlO1xuXHRcdFx0Y2FtZXJhTC50cmFuc2xhdGVPbkF4aXMoIGV5ZVRyYW5zbGF0aW9uTCwgc2NhbGUgKTtcblx0XHRcdGNhbWVyYVIudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvblIsIHNjYWxlICk7XG5cblx0XHRcdGlmICggdnJEaXNwbGF5LmdldEZyYW1lRGF0YSApIHtcblxuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhOZWFyID0gY2FtZXJhLm5lYXI7XG5cdFx0XHRcdHZyRGlzcGxheS5kZXB0aEZhciA9IGNhbWVyYS5mYXI7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmdldEZyYW1lRGF0YSggZnJhbWVEYXRhICk7XG5cblx0XHRcdFx0Y2FtZXJhTC5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLmxlZnRQcm9qZWN0aW9uTWF0cml4O1xuXHRcdFx0XHRjYW1lcmFSLnByb2plY3Rpb25NYXRyaXguZWxlbWVudHMgPSBmcmFtZURhdGEucmlnaHRQcm9qZWN0aW9uTWF0cml4O1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zTC5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4ID0gZm92VG9Qcm9qZWN0aW9uKCBleWVQYXJhbXNSLmZpZWxkT2ZWaWV3LCB0cnVlLCBjYW1lcmEubmVhciwgY2FtZXJhLmZhciApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbmRlciBsZWZ0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYUwsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHQvLyByZW5kZXIgcmlnaHQgZXllXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3IoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fVxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhUiwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3JUZXN0ID0gZmFsc2U7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggZmFsc2UgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGF1dG9VcGRhdGUgKSB7XG5cblx0XHRcdFx0c2NlbmUuYXV0b1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5hdXRvU3VibWl0RnJhbWUgKSB7XG5cblx0XHRcdFx0c2NvcGUuc3VibWl0RnJhbWUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHQvLyBSZWd1bGFyIHJlbmRlciBtb2RlIGlmIG5vdCBITURcblxuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0fTtcblxuXHR0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0fTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApIHtcblxuXHRcdHZhciBweHNjYWxlID0gMi4wIC8gKCBmb3YubGVmdFRhbiArIGZvdi5yaWdodFRhbiApO1xuXHRcdHZhciBweG9mZnNldCA9ICggZm92LmxlZnRUYW4gLSBmb3YucmlnaHRUYW4gKSAqIHB4c2NhbGUgKiAwLjU7XG5cdFx0dmFyIHB5c2NhbGUgPSAyLjAgLyAoIGZvdi51cFRhbiArIGZvdi5kb3duVGFuICk7XG5cdFx0dmFyIHB5b2Zmc2V0ID0gKCBmb3YudXBUYW4gLSBmb3YuZG93blRhbiApICogcHlzY2FsZSAqIDAuNTtcblx0XHRyZXR1cm4geyBzY2FsZTogWyBweHNjYWxlLCBweXNjYWxlIF0sIG9mZnNldDogWyBweG9mZnNldCwgcHlvZmZzZXQgXSB9O1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuXHRcdHJpZ2h0SGFuZGVkID0gcmlnaHRIYW5kZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByaWdodEhhbmRlZDtcblx0XHR6TmVhciA9IHpOZWFyID09PSB1bmRlZmluZWQgPyAwLjAxIDogek5lYXI7XG5cdFx0ekZhciA9IHpGYXIgPT09IHVuZGVmaW5lZCA/IDEwMDAwLjAgOiB6RmFyO1xuXG5cdFx0dmFyIGhhbmRlZG5lc3NTY2FsZSA9IHJpZ2h0SGFuZGVkID8gLSAxLjAgOiAxLjA7XG5cblx0XHQvLyBzdGFydCB3aXRoIGFuIGlkZW50aXR5IG1hdHJpeFxuXHRcdHZhciBtb2JqID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblx0XHR2YXIgbSA9IG1vYmouZWxlbWVudHM7XG5cblx0XHQvLyBhbmQgd2l0aCBzY2FsZS9vZmZzZXQgaW5mbyBmb3Igbm9ybWFsaXplZCBkZXZpY2UgY29vcmRzXG5cdFx0dmFyIHNjYWxlQW5kT2Zmc2V0ID0gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICk7XG5cblx0XHQvLyBYIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuXHRcdG1bIDAgKiA0ICsgMCBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDAgXTtcblx0XHRtWyAwICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAwICogNCArIDIgXSA9IHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMCBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDAgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWSByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHQvLyBZIG9mZnNldCBpcyBuZWdhdGVkIGJlY2F1c2UgdGhpcyBwcm9qIG1hdHJpeCB0cmFuc2Zvcm1zIGZyb20gd29ybGQgY29vcmRzIHdpdGggWT11cCxcblx0XHQvLyBidXQgdGhlIE5EQyBzY2FsaW5nIGhhcyBZPWRvd24gKHRoYW5rcyBEM0Q/KVxuXHRcdG1bIDEgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDEgKiA0ICsgMSBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDEgXTtcblx0XHRtWyAxICogNCArIDIgXSA9IC0gc2NhbGVBbmRPZmZzZXQub2Zmc2V0WyAxIF0gKiBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMSAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHQvLyBaIHJlc3VsdCAodXAgdG8gdGhlIGFwcClcblx0XHRtWyAyICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDIgXSA9IHpGYXIgLyAoIHpOZWFyIC0gekZhciApICogLSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMiAqIDQgKyAzIF0gPSAoIHpGYXIgKiB6TmVhciApIC8gKCB6TmVhciAtIHpGYXIgKTtcblxuXHRcdC8vIFcgcmVzdWx0ICg9IFogaW4pXG5cdFx0bVsgMyAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAyIF0gPSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMyAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHRtb2JqLnRyYW5zcG9zZSgpO1xuXG5cdFx0cmV0dXJuIG1vYmo7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGZvdlRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHR2YXIgREVHMlJBRCA9IE1hdGguUEkgLyAxODAuMDtcblxuXHRcdHZhciBmb3ZQb3J0ID0ge1xuXHRcdFx0dXBUYW46IE1hdGgudGFuKCBmb3YudXBEZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0ZG93blRhbjogTWF0aC50YW4oIGZvdi5kb3duRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGxlZnRUYW46IE1hdGgudGFuKCBmb3YubGVmdERlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRyaWdodFRhbjogTWF0aC50YW4oIGZvdi5yaWdodERlZ3JlZXMgKiBERUcyUkFEIClcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdlBvcnQsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApO1xuXG5cdH1cblxufTtcbiIsImltcG9ydCB7TWF0cml4NH0gZnJvbSAndGhyZWUnO1xuXG4gICAgLyoqXG4gKiBAYXV0aG9yIGRtYXJjb3MgLyBodHRwczovL2dpdGh1Yi5jb20vZG1hcmNvc1xuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICogQGF1dGhvciBoYWx2dmVzIC8gaHR0cHM6Ly9naXRodWIuY29tL2hhbHZ2ZXMgKGkgb25seSBlczYgbW9kdWxlZCBpdClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNvbnRyb2xzIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhLCBvbkVycm9yKSB7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy52ckRpc3BsYXk7XG4gICAgdGhpcy52ckRpc3BsYXlzO1xuICAgIHRoaXMuc3RhbmRpbmdNYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuICAgIHRoaXMuZnJhbWVEYXRhID0gbnVsbDtcblxuICAgIGlmICgnVlJGcmFtZURhdGEnIGluIHdpbmRvdykge1xuICAgICAgdGhpcy5mcmFtZURhdGEgPSBuZXcgVlJGcmFtZURhdGEoKTtcbiAgICB9XG5cbiAgICBpZiAobmF2aWdhdG9yLmdldFZSRGlzcGxheXMpIHtcbiAgICAgIG5hdmlnYXRvclxuICAgICAgICAuZ2V0VlJEaXNwbGF5cygpXG4gICAgICAgIC50aGVuKChkaXNwbGF5cykgPT4ge1xuICAgICAgICAgIHRoaXMudnJEaXNwbGF5cyA9IGRpc3BsYXlzO1xuICAgICAgICAgIGlmIChkaXNwbGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnZyRGlzcGxheSA9IGRpc3BsYXlzWzBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob25FcnJvcikgb25FcnJvcignVlIgaW5wdXQgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUkNvbnRyb2xzOiBVbmFibGUgdG8gZ2V0IFZSIERpc3BsYXlzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRoZSBSaWZ0IFNESyByZXR1cm5zIHRoZSBwb3NpdGlvbiBpbiBtZXRlcnNcbiAgICAvLyB0aGlzIHNjYWxlIGZhY3RvciBhbGxvd3MgdGhlIHVzZXIgdG8gZGVmaW5lIGhvdyBtZXRlcnNcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHNjZW5lIHVuaXRzLlxuICAgIHRoaXMuc2NhbGUgPSAxO1xuXG4gICAgLy8gSWYgdHJ1ZSB3aWxsIHVzZSBcInN0YW5kaW5nIHNwYWNlXCIgY29vcmRpbmF0ZSBzeXN0ZW0gd2hlcmUgeT0wIGlzIHRoZVxuICAgIC8vIGZsb29yIGFuZCB4PTAsIHo9MCBpcyB0aGUgY2VudGVyIG9mIHRoZSByb29tLlxuICAgIHRoaXMuc3RhbmRpbmcgPSBmYWxzZTtcblxuICAgIC8vIERpc3RhbmNlIGZyb20gdGhlIHVzZXJzIGV5ZXMgdG8gdGhlIGZsb29yIGluIG1ldGVycy4gVXNlZCB3aGVuXG4gICAgLy8gc3RhbmRpbmc9dHJ1ZSBidXQgdGhlIFZSRGlzcGxheSBkb2Vzbid0IHByb3ZpZGUgc3RhZ2VQYXJhbWV0ZXJzLlxuICAgIHRoaXMudXNlckhlaWdodCA9IDEuNjtcbiAgfVxuXG4gIGdldFZSRGlzcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy52ckRpc3BsYXk7XG4gIH07XG5cbiAgc2V0VlJEaXNwbGF5KHZhbHVlKSB7XG4gICAgdGhpcy52ckRpc3BsYXkgPSB2YWx1ZTtcbiAgfTtcblxuICBnZXRWUkRpc3BsYXlzKCkge1xuICAgIGNvbnNvbGUud2FybignVlJDb250cm9sczogZ2V0VlJEaXNwbGF5cygpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuJyk7XG4gICAgcmV0dXJuIHRoaXMudnJEaXNwbGF5cztcbiAgfTtcblxuICBnZXRTdGFuZGluZ01hdHJpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFuZGluZ01hdHJpeDtcbiAgfTtcblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgY2FtZXJhID0gdGhpcy5jYW1lcmE7XG5cbiAgICBpZiAodGhpcy52ckRpc3BsYXkpIHtcbiAgICAgIGxldCBwb3NlO1xuICAgICAgaWYgKHRoaXMudnJEaXNwbGF5LmdldEZyYW1lRGF0YSkge1xuICAgICAgICB0aGlzLnZyRGlzcGxheS5nZXRGcmFtZURhdGEodGhpcy5mcmFtZURhdGEpO1xuICAgICAgICBwb3NlID0gdGhpcy5mcmFtZURhdGEucG9zZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52ckRpc3BsYXkuZ2V0UG9zZSkge1xuICAgICAgICBwb3NlID0gdGhpcy52ckRpc3BsYXkuZ2V0UG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2Uub3JpZW50YXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgY2FtZXJhLnF1YXRlcm5pb24uZnJvbUFycmF5KHBvc2Uub3JpZW50YXRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2UucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmZyb21BcnJheShwb3NlLnBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGFuZGluZykge1xuICAgICAgICBpZiAodGhpcy52ckRpc3BsYXkuc3RhZ2VQYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgY2FtZXJhLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICAgIHRoaXMuc3RhbmRpbmdNYXRyaXguZnJvbUFycmF5KHRoaXMudnJEaXNwbGF5LnN0YWdlUGFyYW1ldGVycy5zaXR0aW5nVG9TdGFuZGluZ1RyYW5zZm9ybSk7XG4gICAgICAgICAgY2FtZXJhLmFwcGx5TWF0cml4KHRoaXMuc3RhbmRpbmdNYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXRZKGNhbWVyYS5wb3NpdGlvbi55ICsgdGhpcy51c2VySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FtZXJhLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKHRoaXMuc2NhbGUpO1xuICAgIH1cbiAgfTtcblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMudnJEaXNwbGF5ID0gbnVsbDtcbiAgfTtcbn07XG4iLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgTXVnZW44NyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9NdWdlbjg3XG4gKlxuICogQmFzZWQgb24gQHRvamlybydzIHZyLXNhbXBsZXMtdXRpbHMuanNcbiAqL1xuXG5leHBvcnQgY29uc3QgV0VCVlIgPSB7XG5cblx0aXNBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBpc0F2YWlsYWJsZSgpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSAuY2hlY2tBdmFpbGFiaWxpdHkoKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZDtcblxuXHR9LFxuXG5cdGNoZWNrQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG5cblx0XHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdFx0XHRcdFx0cmVqZWN0KCAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlamVjdCggJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHBzOi8vd2VidnIuaW5mb1wiPndlYnZyLmluZm88L2E+IGZvciBhc3Npc3RhbmNlLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH0sXG5cblx0Z2V0VlJEaXNwbGF5OiBmdW5jdGlvbiAoIG9uRGlzcGxheSApIHtcblxuXHRcdGlmICggJ2dldFZSRGlzcGxheXMnIGluIG5hdmlnYXRvciApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKVxuXHRcdFx0XHQudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblx0XHRcdFx0XHRvbkRpc3BsYXkoIGRpc3BsYXlzWyAwIF0gKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnV0VCVlI6IGdldE1lc3NhZ2UoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmdldE1lc3NhZ2VDb250YWluZXIoIG1lc3NhZ2UgKSBpbnN0ZWFkLicgKTtcblxuXHRcdHZhciBtZXNzYWdlO1xuXG5cdFx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdGlmICggZGlzcGxheXMubGVuZ3RoID09PSAwICkgbWVzc2FnZSA9ICdXZWJWUiBzdXBwb3J0ZWQsIGJ1dCBubyBWUkRpc3BsYXlzIGZvdW5kLic7XG5cblx0XHRcdH0gKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG1lc3NhZ2UgPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViVlIuIFNlZSA8YSBocmVmPVwiaHR0cDovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBtZXNzYWdlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnOTk5Jztcblx0XHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0XHRlcnJvci5zdHlsZS5saW5lSGVpZ2h0ID0gJzI2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0XHRlcnJvci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0XHRlcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZUNvbnRhaW5lcjogZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0Y29udGFpbmVyLmFsaWduID0gJ2NlbnRlcic7XG5cblx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdGVycm9yLnN0eWxlLm1hcmdpbiA9ICc1MHB4Jztcblx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGVycm9yICk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdH0sXG5cblx0Z2V0QnV0dG9uOiBmdW5jdGlvbiAoIGRpc3BsYXksIGNhbnZhcyApIHtcblxuXHRcdGlmICggJ1ZSRWZmZWN0JyBpbiBUSFJFRSAmJiBkaXNwbGF5IGluc3RhbmNlb2YgVEhSRUUuVlJFZmZlY3QgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdXZWJWUi5nZXRCdXR0b24oKSBub3cgZXhwZWN0cyBhIFZSRGlzcGxheS4nICk7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblxuXHRcdH1cblxuXHRcdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXHRcdGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0YnV0dG9uLnN0eWxlLmxlZnQgPSAnY2FsYyg1MCUgLSA1MHB4KSc7XG5cdFx0YnV0dG9uLnN0eWxlLmJvdHRvbSA9ICcyMHB4Jztcblx0XHRidXR0b24uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMCc7XG5cdFx0YnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnOHB4Jztcblx0XHRidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cdFx0YnV0dG9uLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRidXR0b24uc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0YnV0dG9uLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS56SW5kZXggPSAnOTk5JztcblxuXHRcdGlmICggZGlzcGxheSApIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ0VOVEVSIFZSJztcblx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGRpc3BsYXkuaXNQcmVzZW50aW5nID8gZGlzcGxheS5leGl0UHJlc2VudCgpIDogZGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gZGlzcGxheS5pc1ByZXNlbnRpbmcgPyAnRVhJVCBWUicgOiAnRU5URVIgVlInO1xuXG5cdFx0XHR9LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ05PIFZSIERJU1BMQVknO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbjtcblxuXHR9XG5cbn07XG4iLCJpbXBvcnQge0xvb3AsIENvbnRyb2xzTW9kdWxlLCBDYW1lcmFDb21wb25lbnR9IGZyb20gJ3docyc7XG5pbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7VlJFZmZlY3R9IGZyb20gJy4vdnIvVlJFZmZlY3QnO1xuaW1wb3J0IFZSQ29udHJvbHNOYXRpdmUgZnJvbSAndGhyZWUtdnJjb250cm9scy1tb2R1bGUnO1xuaW1wb3J0IHtXRUJWUn0gZnJvbSAnLi92ci9XZWJWUic7XG5cbmV4cG9ydCB7XG4gIFdFQlZSXG59O1xuXG5leHBvcnQgY2xhc3MgVlJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcbiAgICAgIG1lc3NhZ2U6IHRydWUsXG4gICAgICBidXR0b246IHRydWVcbiAgICB9KTtcblxuICAgIHRoaXMuc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICB0aGlzLmVmZmVjdCA9IG51bGw7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgndnInKTtcblxuICAgIGlmIChSRVZJU0lPTiA+IDg2KSBjb25zb2xlLndhcm4oJ1BsZWFzZSB1c2UgVlJNb2R1bGUyIGZvciBUaHJlZS5qcyBeMC44Ny4wIChyODcpJyk7XG5cbiAgICBjb25zdCByZW5kZXJpbmcgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJyk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcblxuICAgIGNvbnN0IHJlc2l6ZSA9IG1hbmFnZXIudXNlKCdyZXNpemUnKTtcblxuICAgIHRoaXMuZWZmZWN0ID0gbmV3IFZSRWZmZWN0KHJlbmRlcmVyKTtcblxuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHJlbmRlcmluZy5lZmZlY3QodGhpcy5lZmZlY3QpO1xuXG4gICAgLy8gVE9ETzogRml4IHJlc2l6ZS5cblxuICAgIHJlc2l6ZS5hZGRDYWxsYmFjaygod2lkdGgsIGhlaWdodCkgPT4ge1xuICAgICAgdGhpcy5lZmZlY3Quc2V0U2l6ZSgrd2lkdGgsICtoZWlnaHQpO1xuICAgIH0pO1xuXG4gICAgLy8gV0VCVlJcbiAgICBjb25zdCB7bWVzc2FnZSwgYnV0dG9ufSA9IHRoaXMucGFyYW1zO1xuXG4gICAgaWYgKG1lc3NhZ2UpIFdFQlZSLmNoZWNrQXZhaWxhYmlsaXR5KCkuY2F0Y2gobWVzc2FnZSA9PiB7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFdFQlZSLmdldE1lc3NhZ2VDb250YWluZXIobWVzc2FnZSkpO1xuXHRcdH0pO1xuXG4gICAgaWYgKGJ1dHRvbikgV0VCVlIuZ2V0VlJEaXNwbGF5KGRpc3BsYXkgPT4ge1xuICAgICAgY29uc3QgdnJidG4gPSBXRUJWUi5nZXRCdXR0b24oZGlzcGxheSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICB2cmJ0bi5jbGFzc05hbWUgPSAndnItYnRuJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2cmJ0bik7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSMk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlzcGxheSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gV0VCVlIuZ2V0VlJEaXNwbGF5KGRpc3BsYXkgPT4gcmVzb2x2ZShkaXNwbGF5KSkpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3ZyJyk7XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHJlbmRlcmVyLnZyLmVuYWJsZWQgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKFJFVklTSU9OKTtcbiAgICBjb25zb2xlLmxvZygxKTtcblxuICAgIHRoaXMuZGlzcGxheS50aGVuKGRpc3BsYXkgPT4ge1xuICAgICAgcmVuZGVyZXIudnIuc2V0RGV2aWNlKGRpc3BsYXkpO1xuXG4gICAgICBjb25zdCB2cmJ0biA9IFdFQlZSLmdldEJ1dHRvbihkaXNwbGF5LCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgIHZyYnRuLmNsYXNzTmFtZSA9ICd2ci1idG4nO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZyYnRuKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVlJDb250cm9scyBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3Ioe29iamVjdCwgb25FcnJvciwgaW50ZW5zaXR5fSkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IFZSQ29udHJvbHNOYXRpdmUob2JqZWN0Lm5hdGl2ZSwgb25FcnJvcik7XG5cbiAgICBjb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgY29udHJvbHMuc2NhbGUgPSBpbnRlbnNpdHk7XG5cbiAgICBzdXBlcih7Y29udHJvbHN9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlZSRWZmZWN0IiwicmVuZGVyZXIiLCJvbkVycm9yIiwidnJEaXNwbGF5IiwidnJEaXNwbGF5cyIsImV5ZVRyYW5zbGF0aW9uTCIsIlRIUkVFIiwiVmVjdG9yMyIsImV5ZVRyYW5zbGF0aW9uUiIsInJlbmRlclJlY3RMIiwicmVuZGVyUmVjdFIiLCJmcmFtZURhdGEiLCJ3aW5kb3ciLCJWUkZyYW1lRGF0YSIsImdvdFZSRGlzcGxheXMiLCJkaXNwbGF5cyIsImxlbmd0aCIsIm5hdmlnYXRvciIsImdldFZSRGlzcGxheXMiLCJ0aGVuIiwiY2F0Y2giLCJ3YXJuIiwiaXNQcmVzZW50aW5nIiwic2NhbGUiLCJzY29wZSIsInJlbmRlcmVyU2l6ZSIsImdldFNpemUiLCJyZW5kZXJlclVwZGF0ZVN0eWxlIiwicmVuZGVyZXJQaXhlbFJhdGlvIiwiZ2V0UGl4ZWxSYXRpbyIsImdldFZSRGlzcGxheSIsInNldFZSRGlzcGxheSIsInZhbHVlIiwic2V0U2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwidXBkYXRlU3R5bGUiLCJleWVQYXJhbXNMIiwiZ2V0RXllUGFyYW1ldGVycyIsInNldFBpeGVsUmF0aW8iLCJyZW5kZXJXaWR0aCIsInJlbmRlckhlaWdodCIsImNhbnZhcyIsImRvbUVsZW1lbnQiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsImV4aXRGdWxsc2NyZWVuIiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJkZWZhdWx0TGVmdEJvdW5kcyIsImRlZmF1bHRSaWdodEJvdW5kcyIsIm9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSIsIndhc1ByZXNlbnRpbmciLCJ1bmRlZmluZWQiLCJleWVXaWR0aCIsImV5ZUhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRGdWxsU2NyZWVuIiwiYm9vbGVhbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXF1ZXN0UHJlc2VudCIsInNvdXJjZSIsImV4aXRQcmVzZW50IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaCIsInN1Ym1pdEZyYW1lIiwiYXV0b1N1Ym1pdEZyYW1lIiwiY2FtZXJhTCIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwibGF5ZXJzIiwiZW5hYmxlIiwiY2FtZXJhUiIsInJlbmRlciIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyVGFyZ2V0IiwiZm9yY2VDbGVhciIsImF1dG9VcGRhdGUiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsImV5ZVBhcmFtc1IiLCJmcm9tQXJyYXkiLCJvZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJzaXplIiwiZ2V0TGF5ZXJzIiwibGVmdEJvdW5kcyIsInJpZ2h0Qm91bmRzIiwibGF5ZXIiLCJNYXRoIiwicm91bmQiLCJzZXRSZW5kZXJUYXJnZXQiLCJzY2lzc29yVGVzdCIsInNldFNjaXNzb3JUZXN0IiwiYXV0b0NsZWFyIiwiY2xlYXIiLCJwYXJlbnQiLCJtYXRyaXhXb3JsZCIsImRlY29tcG9zZSIsInBvc2l0aW9uIiwicXVhdGVybmlvbiIsInRyYW5zbGF0ZU9uQXhpcyIsImdldEZyYW1lRGF0YSIsImRlcHRoTmVhciIsIm5lYXIiLCJkZXB0aEZhciIsImZhciIsInByb2plY3Rpb25NYXRyaXgiLCJlbGVtZW50cyIsImxlZnRQcm9qZWN0aW9uTWF0cml4IiwicmlnaHRQcm9qZWN0aW9uTWF0cml4IiwiZm92VG9Qcm9qZWN0aW9uIiwiZmllbGRPZlZpZXciLCJ2aWV3cG9ydCIsInNldCIsIngiLCJ5Iiwic2Npc3NvciIsInNldFZpZXdwb3J0Iiwic2V0U2Npc3NvciIsImRpc3Bvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZm92VG9ORENTY2FsZU9mZnNldCIsImZvdiIsInB4c2NhbGUiLCJsZWZ0VGFuIiwicmlnaHRUYW4iLCJweG9mZnNldCIsInB5c2NhbGUiLCJ1cFRhbiIsImRvd25UYW4iLCJweW9mZnNldCIsImZvdlBvcnRUb1Byb2plY3Rpb24iLCJyaWdodEhhbmRlZCIsInpOZWFyIiwiekZhciIsImhhbmRlZG5lc3NTY2FsZSIsIm1vYmoiLCJNYXRyaXg0IiwibSIsInNjYWxlQW5kT2Zmc2V0IiwidHJhbnNwb3NlIiwiREVHMlJBRCIsIlBJIiwiZm92UG9ydCIsInRhbiIsInVwRGVncmVlcyIsImRvd25EZWdyZWVzIiwibGVmdERlZ3JlZXMiLCJyaWdodERlZ3JlZXMiLCJWUkNvbnRyb2xzIiwiV0VCVlIiLCJvbkRpc3BsYXkiLCJtZXNzYWdlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJ6SW5kZXgiLCJhbGlnbiIsImVycm9yIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwicGFkZGluZyIsIm1hcmdpbiIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImJ1dHRvbiIsImJvdHRvbSIsImJvcmRlciIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRDb250ZW50Iiwib25jbGljayIsIlZSTW9kdWxlIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiZWZmZWN0IiwibWFuYWdlciIsImRlZmluZSIsIlJFVklTSU9OIiwiY29uc29sZSIsInJlbmRlcmluZyIsInVzZSIsImdldCIsInJlc2l6ZSIsImFkZENhbGxiYWNrIiwiY2hlY2tBdmFpbGFiaWxpdHkiLCJib2R5IiwiZ2V0TWVzc2FnZUNvbnRhaW5lciIsInZyYnRuIiwiZ2V0QnV0dG9uIiwiY2xhc3NOYW1lIiwiVlIyTW9kdWxlIiwidnIiLCJlbmFibGVkIiwibG9nIiwic2V0RGV2aWNlIiwib2JqZWN0IiwiaW50ZW5zaXR5IiwiY29udHJvbHMiLCJWUkNvbnRyb2xzTmF0aXZlIiwibmF0aXZlIiwic3RhbmRpbmciLCJDb250cm9sc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7OztBQVdBLEFBQU8sSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVdDLFFBQVgsRUFBcUJDLE9BQXJCLEVBQStCOztLQUVsREMsU0FBSixFQUFlQyxVQUFmO0tBQ0lDLGtCQUFrQixJQUFJQyxNQUFNQyxPQUFWLEVBQXRCO0tB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
