/* Built for whs v2.1.8-vrfix.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('whs'), require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'whs', 'three'], factory) :
	(factory((global.VRKit = global.VRKit || {}),global.WHS,global.THREE));
}(this, (function (exports,whs,three) { 'use strict';

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
	var eyeTranslationL = new three.Vector3();
	var eyeTranslationR = new three.Vector3();
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

	var cameraL = new three.PerspectiveCamera();
	cameraL.layers.enable(1);

	var cameraR = new three.PerspectiveCamera();
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
		var mobj = new three.Matrix4();
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
    this.standingMatrix = new three.Matrix4();
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

      if (three.REVISION > 86) console.warn('Please use VRModule2 for Three.js ^0.87.0 (r87)');

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
      console.log(three.REVISION);
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
}(whs.ControlsModule);

exports.WEBVR = WEBVR;
exports.VRModule = VRModule;
exports.VR2Module = VR2Module;
exports.VRControls = VRControls;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1ZSRWZmZWN0LmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvbm9kZV9tb2R1bGVzL3RocmVlLXZyY29udHJvbHMtbW9kdWxlL3NyYy92ci1jb250cm9scy5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1dlYlZSLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvVlJLaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIGRtYXJjb3MgLyBodHRwczovL2dpdGh1Yi5jb20vZG1hcmNvc1xuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICpcbiAqIFdlYlZSIFNwZWM6IGh0dHA6Ly9tb3p2ci5naXRodWIuaW8vd2VidnItc3BlYy93ZWJ2ci5odG1sXG4gKlxuICogRmlyZWZveDogaHR0cDovL21venZyLmNvbS9kb3dubG9hZHMvXG4gKiBDaHJvbWl1bTogaHR0cHM6Ly93ZWJ2ci5pbmZvL2dldC1jaHJvbWVcbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgVmVjdG9yMyxcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE1hdHJpeDRcbn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY29uc3QgVlJFZmZlY3QgPSBmdW5jdGlvbiAoIHJlbmRlcmVyLCBvbkVycm9yICkge1xuXG5cdHZhciB2ckRpc3BsYXksIHZyRGlzcGxheXM7XG5cdHZhciBleWVUcmFuc2xhdGlvbkwgPSBuZXcgVmVjdG9yMygpO1xuXHR2YXIgZXllVHJhbnNsYXRpb25SID0gbmV3IFZlY3RvcjMoKTtcblx0dmFyIHJlbmRlclJlY3RMLCByZW5kZXJSZWN0UjtcblxuXHR2YXIgZnJhbWVEYXRhID0gbnVsbDtcblxuXHRpZiAoICdWUkZyYW1lRGF0YScgaW4gd2luZG93ICkge1xuXG5cdFx0ZnJhbWVEYXRhID0gbmV3IFZSRnJhbWVEYXRhKCk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGdvdFZSRGlzcGxheXMoIGRpc3BsYXlzICkge1xuXG5cdFx0dnJEaXNwbGF5cyA9IGRpc3BsYXlzO1xuXG5cdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHR2ckRpc3BsYXkgPSBkaXNwbGF5c1sgMCBdO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCBvbkVycm9yICkgb25FcnJvciggJ0hNRCBub3QgYXZhaWxhYmxlJyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICkge1xuXG5cdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBnb3RWUkRpc3BsYXlzICkuY2F0Y2ggKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBVbmFibGUgdG8gZ2V0IFZSIERpc3BsYXlzJyApO1xuXG5cdFx0fSApO1xuXG5cdH1cblxuXHQvL1xuXG5cdHRoaXMuaXNQcmVzZW50aW5nID0gZmFsc2U7XG5cdHRoaXMuc2NhbGUgPSAxO1xuXG5cdHZhciBzY29wZSA9IHRoaXM7XG5cblx0dmFyIHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0dmFyIHJlbmRlcmVyVXBkYXRlU3R5bGUgPSBmYWxzZTtcblx0dmFyIHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblxuXHR0aGlzLmdldFZSRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB2ckRpc3BsYXk7XG5cblx0fTtcblxuXHR0aGlzLnNldFZSRGlzcGxheSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR2ckRpc3BsYXkgPSB2YWx1ZTtcblxuXHR9O1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5cyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBnZXRWUkRpc3BsYXlzKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4nICk7XG5cdFx0cmV0dXJuIHZyRGlzcGxheXM7XG5cblx0fTtcblxuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICkge1xuXG5cdFx0cmVuZGVyZXJTaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XG5cdFx0cmVuZGVyZXJVcGRhdGVTdHlsZSA9IHVwZGF0ZVN0eWxlO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggMSApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllUGFyYW1zTC5yZW5kZXJXaWR0aCAqIDIsIGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggcmVuZGVyZXJQaXhlbFJhdGlvICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0LCB1cGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0Ly8gZnVsbHNjcmVlblxuXG5cdHZhciBjYW52YXMgPSByZW5kZXJlci5kb21FbGVtZW50O1xuXHR2YXIgcmVxdWVzdEZ1bGxzY3JlZW47XG5cdHZhciBleGl0RnVsbHNjcmVlbjtcblx0dmFyIGZ1bGxzY3JlZW5FbGVtZW50O1xuXHR2YXIgZGVmYXVsdExlZnRCb3VuZHMgPSBbIDAuMCwgMC4wLCAwLjUsIDEuMCBdO1xuXHR2YXIgZGVmYXVsdFJpZ2h0Qm91bmRzID0gWyAwLjUsIDAuMCwgMC41LCAxLjAgXTtcblxuXHRmdW5jdGlvbiBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UoKSB7XG5cblx0XHR2YXIgd2FzUHJlc2VudGluZyA9IHNjb3BlLmlzUHJlc2VudGluZztcblx0XHRzY29wZS5pc1ByZXNlbnRpbmcgPSB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiB2ckRpc3BsYXkuaXNQcmVzZW50aW5nO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0dmFyIGV5ZVdpZHRoID0gZXllUGFyYW1zTC5yZW5kZXJXaWR0aDtcblx0XHRcdHZhciBleWVIZWlnaHQgPSBleWVQYXJhbXNMLnJlbmRlckhlaWdodDtcblxuXHRcdFx0aWYgKCAhd2FzUHJlc2VudGluZyApIHtcblxuXHRcdFx0XHRyZW5kZXJlclBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XG5cdFx0XHRcdHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNpemUoIGV5ZVdpZHRoICogMiwgZXllSGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCB3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHJlbmRlcmVyU2l6ZS53aWR0aCwgcmVuZGVyZXJTaXplLmhlaWdodCwgcmVuZGVyZXJVcGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0dGhpcy5zZXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCBib29sZWFuICkge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiAoIHJlc29sdmUsIHJlamVjdCApIHtcblxuXHRcdFx0aWYgKCB2ckRpc3BsYXkgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZWplY3QoIG5ldyBFcnJvciggJ05vIFZSIGhhcmR3YXJlIGZvdW5kLicgKSApO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgPT09IGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBib29sZWFuICkge1xuXG5cdFx0XHRcdHJlc29sdmUoIHZyRGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LmV4aXRQcmVzZW50KCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIHRydWUgKTtcblxuXHR9O1xuXG5cdHRoaXMuZXhpdFByZXNlbnQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGdWxsU2NyZWVuKCBmYWxzZSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGYgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRyZXR1cm4gdnJEaXNwbGF5LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGYgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGggKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIGggKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5zdWJtaXRGcmFtZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuc3VibWl0RnJhbWUoKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuYXV0b1N1Ym1pdEZyYW1lID0gdHJ1ZTtcblxuXHQvLyByZW5kZXJcblxuXHR2YXIgY2FtZXJhTCA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFMLmxheWVycy5lbmFibGUoIDEgKTtcblxuXHR2YXIgY2FtZXJhUiA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFSLmxheWVycy5lbmFibGUoIDIgKTtcblxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2YXIgYXV0b1VwZGF0ZSA9IHNjZW5lLmF1dG9VcGRhdGU7XG5cblx0XHRcdGlmICggYXV0b1VwZGF0ZSApIHtcblxuXHRcdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdFx0XHRzY2VuZS5hdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllUGFyYW1zUiA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAncmlnaHQnICk7XG5cblx0XHRcdGV5ZVRyYW5zbGF0aW9uTC5mcm9tQXJyYXkoIGV5ZVBhcmFtc0wub2Zmc2V0ICk7XG5cdFx0XHRleWVUcmFuc2xhdGlvblIuZnJvbUFycmF5KCBleWVQYXJhbXNSLm9mZnNldCApO1xuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHNjZW5lICkgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3QucmVuZGVyKCkgbm8gbG9uZ2VyIHN1cHBvcnRzIGFycmF5cy4gVXNlIG9iamVjdC5sYXllcnMgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHNjZW5lID0gc2NlbmVbIDAgXTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBXaGVuIHJlbmRlcmluZyB3ZSBkb24ndCBjYXJlIHdoYXQgdGhlIHJlY29tbWVuZGVkIHNpemUgaXMsIG9ubHkgd2hhdCB0aGUgYWN0dWFsIHNpemVcblx0XHRcdC8vIG9mIHRoZSBiYWNrYnVmZmVyIGlzLlxuXHRcdFx0dmFyIHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG5cdFx0XHR2YXIgbGF5ZXJzID0gdnJEaXNwbGF5LmdldExheWVycygpO1xuXHRcdFx0dmFyIGxlZnRCb3VuZHM7XG5cdFx0XHR2YXIgcmlnaHRCb3VuZHM7XG5cblx0XHRcdGlmICggbGF5ZXJzLmxlbmd0aCApIHtcblxuXHRcdFx0XHR2YXIgbGF5ZXIgPSBsYXllcnNbIDAgXTtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gbGF5ZXIubGVmdEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5sZWZ0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLmxlZnRCb3VuZHMgOiBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBsYXllci5yaWdodEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5yaWdodEJvdW5kcy5sZW5ndGggPT09IDQgPyBsYXllci5yaWdodEJvdW5kcyA6IGRlZmF1bHRSaWdodEJvdW5kcztcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gZGVmYXVsdExlZnRCb3VuZHM7XG5cdFx0XHRcdHJpZ2h0Qm91bmRzID0gZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlclJlY3RMID0ge1xuXHRcdFx0XHR4OiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMiBdICksXG5cdFx0XHRcdGhlaWdodDogTWF0aC5yb3VuZChzaXplLmhlaWdodCAqIGxlZnRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXHRcdFx0cmVuZGVyUmVjdFIgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiByaWdodEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDEgXSApLFxuXHRcdFx0XHR3aWR0aDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3NvclRlc3QgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggdHJ1ZSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggcmVuZGVyZXIuYXV0b0NsZWFyIHx8IGZvcmNlQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggY2FtZXJhTC5wb3NpdGlvbiwgY2FtZXJhTC5xdWF0ZXJuaW9uLCBjYW1lcmFMLnNjYWxlICk7XG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFSLnBvc2l0aW9uLCBjYW1lcmFSLnF1YXRlcm5pb24sIGNhbWVyYVIuc2NhbGUgKTtcblxuXHRcdFx0dmFyIHNjYWxlID0gdGhpcy5zY2FsZTtcblx0XHRcdGNhbWVyYUwudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvbkwsIHNjYWxlICk7XG5cdFx0XHRjYW1lcmFSLnRyYW5zbGF0ZU9uQXhpcyggZXllVHJhbnNsYXRpb25SLCBzY2FsZSApO1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheS5nZXRGcmFtZURhdGEgKSB7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmRlcHRoTmVhciA9IGNhbWVyYS5uZWFyO1xuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhGYXIgPSBjYW1lcmEuZmFyO1xuXG5cdFx0XHRcdHZyRGlzcGxheS5nZXRGcmFtZURhdGEoIGZyYW1lRGF0YSApO1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeC5lbGVtZW50cyA9IGZyYW1lRGF0YS5sZWZ0UHJvamVjdGlvbk1hdHJpeDtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLnJpZ2h0UHJvamVjdGlvbk1hdHJpeDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjYW1lcmFMLnByb2plY3Rpb25NYXRyaXggPSBmb3ZUb1Byb2plY3Rpb24oIGV5ZVBhcmFtc0wuZmllbGRPZlZpZXcsIHRydWUsIGNhbWVyYS5uZWFyLCBjYW1lcmEuZmFyICk7XG5cdFx0XHRcdGNhbWVyYVIucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zUi5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW5kZXIgbGVmdCBleWVcblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvciggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXG5cdFx0XHR9XG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmFMLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKTtcblxuXHRcdFx0Ly8gcmVuZGVyIHJpZ2h0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYVIsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IGZhbHNlO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvclRlc3QoIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUuYXV0b1N1Ym1pdEZyYW1lICkge1xuXG5cdFx0XHRcdHNjb3BlLnN1Ym1pdEZyYW1lKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0Ly8gUmVndWxhciByZW5kZXIgbW9kZSBpZiBub3QgSE1EXG5cblx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdH07XG5cblx0dGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgb25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlLCBmYWxzZSApO1xuXG5cdH07XG5cblx0Ly9cblxuXHRmdW5jdGlvbiBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKSB7XG5cblx0XHR2YXIgcHhzY2FsZSA9IDIuMCAvICggZm92LmxlZnRUYW4gKyBmb3YucmlnaHRUYW4gKTtcblx0XHR2YXIgcHhvZmZzZXQgPSAoIGZvdi5sZWZ0VGFuIC0gZm92LnJpZ2h0VGFuICkgKiBweHNjYWxlICogMC41O1xuXHRcdHZhciBweXNjYWxlID0gMi4wIC8gKCBmb3YudXBUYW4gKyBmb3YuZG93blRhbiApO1xuXHRcdHZhciBweW9mZnNldCA9ICggZm92LnVwVGFuIC0gZm92LmRvd25UYW4gKSAqIHB5c2NhbGUgKiAwLjU7XG5cdFx0cmV0dXJuIHsgc2NhbGU6IFsgcHhzY2FsZSwgcHlzY2FsZSBdLCBvZmZzZXQ6IFsgcHhvZmZzZXQsIHB5b2Zmc2V0IF0gfTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZm92UG9ydFRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHRyaWdodEhhbmRlZCA9IHJpZ2h0SGFuZGVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogcmlnaHRIYW5kZWQ7XG5cdFx0ek5lYXIgPSB6TmVhciA9PT0gdW5kZWZpbmVkID8gMC4wMSA6IHpOZWFyO1xuXHRcdHpGYXIgPSB6RmFyID09PSB1bmRlZmluZWQgPyAxMDAwMC4wIDogekZhcjtcblxuXHRcdHZhciBoYW5kZWRuZXNzU2NhbGUgPSByaWdodEhhbmRlZCA/IC0gMS4wIDogMS4wO1xuXG5cdFx0Ly8gc3RhcnQgd2l0aCBhbiBpZGVudGl0eSBtYXRyaXhcblx0XHR2YXIgbW9iaiA9IG5ldyBNYXRyaXg0KCk7XG5cdFx0dmFyIG0gPSBtb2JqLmVsZW1lbnRzO1xuXG5cdFx0Ly8gYW5kIHdpdGggc2NhbGUvb2Zmc2V0IGluZm8gZm9yIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3Jkc1xuXHRcdHZhciBzY2FsZUFuZE9mZnNldCA9IGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApO1xuXG5cdFx0Ly8gWCByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHRtWyAwICogNCArIDAgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAwIF07XG5cdFx0bVsgMCAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMCAqIDQgKyAyIF0gPSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbIDAgXSAqIGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAwICogNCArIDMgXSA9IDAuMDtcblxuXHRcdC8vIFkgcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG5cdFx0Ly8gWSBvZmZzZXQgaXMgbmVnYXRlZCBiZWNhdXNlIHRoaXMgcHJvaiBtYXRyaXggdHJhbnNmb3JtcyBmcm9tIHdvcmxkIGNvb3JkcyB3aXRoIFk9dXAsXG5cdFx0Ly8gYnV0IHRoZSBOREMgc2NhbGluZyBoYXMgWT1kb3duICh0aGFua3MgRDNEPylcblx0XHRtWyAxICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAxICogNCArIDEgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAxIF07XG5cdFx0bVsgMSAqIDQgKyAyIF0gPSAtIHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMSBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDEgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWiByZXN1bHQgKHVwIHRvIHRoZSBhcHApXG5cdFx0bVsgMiAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAyIF0gPSB6RmFyIC8gKCB6TmVhciAtIHpGYXIgKSAqIC0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDIgKiA0ICsgMyBdID0gKCB6RmFyICogek5lYXIgKSAvICggek5lYXIgLSB6RmFyICk7XG5cblx0XHQvLyBXIHJlc3VsdCAoPSBaIGluKVxuXHRcdG1bIDMgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMSBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMiBdID0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDMgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0bW9iai50cmFuc3Bvc2UoKTtcblxuXHRcdHJldHVybiBtb2JqO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG5cdFx0dmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cblx0XHR2YXIgZm92UG9ydCA9IHtcblx0XHRcdHVwVGFuOiBNYXRoLnRhbiggZm92LnVwRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGRvd25UYW46IE1hdGgudGFuKCBmb3YuZG93bkRlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRsZWZ0VGFuOiBNYXRoLnRhbiggZm92LmxlZnREZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0cmlnaHRUYW46IE1hdGgudGFuKCBmb3YucmlnaHREZWdyZWVzICogREVHMlJBRCApXG5cdFx0fTtcblxuXHRcdHJldHVybiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3ZQb3J0LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKTtcblxuXHR9XG5cbn07XG4iLCJpbXBvcnQge01hdHJpeDR9IGZyb20gJ3RocmVlJztcblxuICAgIC8qKlxuICogQGF1dGhvciBkbWFyY29zIC8gaHR0cHM6Ly9naXRodWIuY29tL2RtYXJjb3NcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgaGFsdnZlcyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9oYWx2dmVzIChpIG9ubHkgZXM2IG1vZHVsZWQgaXQpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVlJDb250cm9scyB7XG4gIGNvbnN0cnVjdG9yKGNhbWVyYSwgb25FcnJvcikge1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMudnJEaXNwbGF5O1xuICAgIHRoaXMudnJEaXNwbGF5cztcbiAgICB0aGlzLnN0YW5kaW5nTWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcbiAgICB0aGlzLmZyYW1lRGF0YSA9IG51bGw7XG5cbiAgICBpZiAoJ1ZSRnJhbWVEYXRhJyBpbiB3aW5kb3cpIHtcbiAgICAgIHRoaXMuZnJhbWVEYXRhID0gbmV3IFZSRnJhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgaWYgKG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKSB7XG4gICAgICBuYXZpZ2F0b3JcbiAgICAgICAgLmdldFZSRGlzcGxheXMoKVxuICAgICAgICAudGhlbigoZGlzcGxheXMpID0+IHtcbiAgICAgICAgICB0aGlzLnZyRGlzcGxheXMgPSBkaXNwbGF5cztcbiAgICAgICAgICBpZiAoZGlzcGxheXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy52ckRpc3BsYXkgPSBkaXNwbGF5c1swXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9uRXJyb3IpIG9uRXJyb3IoJ1ZSIGlucHV0IG5vdCBhdmFpbGFibGUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJDb250cm9sczogVW5hYmxlIHRvIGdldCBWUiBEaXNwbGF5cycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGUgUmlmdCBTREsgcmV0dXJucyB0aGUgcG9zaXRpb24gaW4gbWV0ZXJzXG4gICAgLy8gdGhpcyBzY2FsZSBmYWN0b3IgYWxsb3dzIHRoZSB1c2VyIHRvIGRlZmluZSBob3cgbWV0ZXJzXG4gICAgLy8gYXJlIGNvbnZlcnRlZCB0byBzY2VuZSB1bml0cy5cbiAgICB0aGlzLnNjYWxlID0gMTtcblxuICAgIC8vIElmIHRydWUgd2lsbCB1c2UgXCJzdGFuZGluZyBzcGFjZVwiIGNvb3JkaW5hdGUgc3lzdGVtIHdoZXJlIHk9MCBpcyB0aGVcbiAgICAvLyBmbG9vciBhbmQgeD0wLCB6PTAgaXMgdGhlIGNlbnRlciBvZiB0aGUgcm9vbS5cbiAgICB0aGlzLnN0YW5kaW5nID0gZmFsc2U7XG5cbiAgICAvLyBEaXN0YW5jZSBmcm9tIHRoZSB1c2VycyBleWVzIHRvIHRoZSBmbG9vciBpbiBtZXRlcnMuIFVzZWQgd2hlblxuICAgIC8vIHN0YW5kaW5nPXRydWUgYnV0IHRoZSBWUkRpc3BsYXkgZG9lc24ndCBwcm92aWRlIHN0YWdlUGFyYW1ldGVycy5cbiAgICB0aGlzLnVzZXJIZWlnaHQgPSAxLjY7XG4gIH1cblxuICBnZXRWUkRpc3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudnJEaXNwbGF5O1xuICB9O1xuXG4gIHNldFZSRGlzcGxheSh2YWx1ZSkge1xuICAgIHRoaXMudnJEaXNwbGF5ID0gdmFsdWU7XG4gIH07XG5cbiAgZ2V0VlJEaXNwbGF5cygpIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSQ29udHJvbHM6IGdldFZSRGlzcGxheXMoKSBpcyBiZWluZyBkZXByZWNhdGVkLicpO1xuICAgIHJldHVybiB0aGlzLnZyRGlzcGxheXM7XG4gIH07XG5cbiAgZ2V0U3RhbmRpbmdNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhbmRpbmdNYXRyaXg7XG4gIH07XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xuXG4gICAgaWYgKHRoaXMudnJEaXNwbGF5KSB7XG4gICAgICBsZXQgcG9zZTtcbiAgICAgIGlmICh0aGlzLnZyRGlzcGxheS5nZXRGcmFtZURhdGEpIHtcbiAgICAgICAgdGhpcy52ckRpc3BsYXkuZ2V0RnJhbWVEYXRhKHRoaXMuZnJhbWVEYXRhKTtcbiAgICAgICAgcG9zZSA9IHRoaXMuZnJhbWVEYXRhLnBvc2U7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudnJEaXNwbGF5LmdldFBvc2UpIHtcbiAgICAgICAgcG9zZSA9IHRoaXMudnJEaXNwbGF5LmdldFBvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NlLm9yaWVudGF0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIGNhbWVyYS5xdWF0ZXJuaW9uLmZyb21BcnJheShwb3NlLm9yaWVudGF0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NlLnBvc2l0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5mcm9tQXJyYXkocG9zZS5wb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3RhbmRpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMudnJEaXNwbGF5LnN0YWdlUGFyYW1ldGVycykge1xuICAgICAgICAgIGNhbWVyYS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgICB0aGlzLnN0YW5kaW5nTWF0cml4LmZyb21BcnJheSh0aGlzLnZyRGlzcGxheS5zdGFnZVBhcmFtZXRlcnMuc2l0dGluZ1RvU3RhbmRpbmdUcmFuc2Zvcm0pO1xuICAgICAgICAgIGNhbWVyYS5hcHBseU1hdHJpeCh0aGlzLnN0YW5kaW5nTWF0cml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYW1lcmEucG9zaXRpb24uc2V0WShjYW1lcmEucG9zaXRpb24ueSArIHRoaXMudXNlckhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbWVyYS5wb3NpdGlvbi5tdWx0aXBseVNjYWxhcih0aGlzLnNjYWxlKTtcbiAgICB9XG4gIH07XG5cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLnZyRGlzcGxheSA9IG51bGw7XG4gIH07XG59O1xuIiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tXG4gKiBAYXV0aG9yIE11Z2VuODcgLyBodHRwczovL2dpdGh1Yi5jb20vTXVnZW44N1xuICpcbiAqIEJhc2VkIG9uIEB0b2ppcm8ncyB2ci1zYW1wbGVzLXV0aWxzLmpzXG4gKi9cblxuZXhwb3J0IGNvbnN0IFdFQlZSID0ge1xuXG5cdGlzQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdXRUJWUjogaXNBdmFpbGFibGUoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmNoZWNrQXZhaWxhYmlsaXR5KCkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICE9PSB1bmRlZmluZWQ7XG5cblx0fSxcblxuXHRjaGVja0F2YWlsYWJpbGl0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG5cdFx0XHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPT09IDAgKSB7XG5cblx0XHRcdFx0XHRcdHJlamVjdCggJ1dlYlZSIHN1cHBvcnRlZCwgYnV0IG5vIFZSRGlzcGxheXMgZm91bmQuJyApO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZWplY3QoICdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJWUi4gU2VlIDxhIGhyZWY9XCJodHRwczovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9LFxuXG5cdGdldFZSRGlzcGxheTogZnVuY3Rpb24gKCBvbkRpc3BsYXkgKSB7XG5cblx0XHRpZiAoICdnZXRWUkRpc3BsYXlzJyBpbiBuYXZpZ2F0b3IgKSB7XG5cblx0XHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKClcblx0XHRcdFx0LnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cdFx0XHRcdFx0b25EaXNwbGF5KCBkaXNwbGF5c1sgMCBdICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBnZXRNZXNzYWdlKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4gVXNlIC5nZXRNZXNzYWdlQ29udGFpbmVyKCBtZXNzYWdlICkgaW5zdGVhZC4nICk7XG5cblx0XHR2YXIgbWVzc2FnZTtcblxuXHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgKSB7XG5cblx0XHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKCkudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblxuXHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIG1lc3NhZ2UgPSAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nO1xuXG5cdFx0XHR9ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRtZXNzYWdlID0gJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHA6Ly93ZWJ2ci5pbmZvXCI+d2VidnIuaW5mbzwvYT4gZm9yIGFzc2lzdGFuY2UuJztcblxuXHRcdH1cblxuXHRcdGlmICggbWVzc2FnZSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS50b3AgPSAnMCc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUucmlnaHQgPSAnMCc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0XHRjb250YWluZXIuYWxpZ24gPSAnY2VudGVyJztcblxuXHRcdFx0dmFyIGVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0XHRlcnJvci5zdHlsZS5mb250U2l6ZSA9ICcxNnB4Jztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRcdGVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblx0XHRcdGVycm9yLnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUubWFyZ2luID0gJzUwcHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXHRcdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZXJyb3IgKTtcblxuXHRcdFx0cmV0dXJuIGNvbnRhaW5lcjtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldE1lc3NhZ2VDb250YWluZXI6IGZ1bmN0aW9uICggbWVzc2FnZSApIHtcblxuXHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMCc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUucmlnaHQgPSAnMCc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5OTknO1xuXHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0dmFyIGVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRlcnJvci5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdGVycm9yLnN0eWxlLmxpbmVIZWlnaHQgPSAnMjZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdGVycm9yLnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdGVycm9yLnN0eWxlLnBhZGRpbmcgPSAnMTBweCAyMHB4Jztcblx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXHRcdGVycm9yLmlubmVySFRNTCA9IG1lc3NhZ2U7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcblxuXHR9LFxuXG5cdGdldEJ1dHRvbjogZnVuY3Rpb24gKCBkaXNwbGF5LCBjYW52YXMgKSB7XG5cblx0XHRpZiAoICdWUkVmZmVjdCcgaW4gVEhSRUUgJiYgZGlzcGxheSBpbnN0YW5jZW9mIFRIUkVFLlZSRWZmZWN0ICkge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCAnV2ViVlIuZ2V0QnV0dG9uKCkgbm93IGV4cGVjdHMgYSBWUkRpc3BsYXkuJyApO1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdidXR0b24nICk7XG5cblx0XHR9XG5cblx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblx0XHRidXR0b24uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdGJ1dHRvbi5zdHlsZS5sZWZ0ID0gJ2NhbGMoNTAlIC0gNTBweCknO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3R0b20gPSAnMjBweCc7XG5cdFx0YnV0dG9uLnN0eWxlLndpZHRoID0gJzEwMHB4Jztcblx0XHRidXR0b24uc3R5bGUuYm9yZGVyID0gJzAnO1xuXHRcdGJ1dHRvbi5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG5cdFx0YnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuXHRcdGJ1dHRvbi5zdHlsZS5jb2xvciA9ICcjZmZmJztcblx0XHRidXR0b24uc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRidXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG5cdFx0YnV0dG9uLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdGJ1dHRvbi5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcblx0XHRidXR0b24uc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cblx0XHRpZiAoIGRpc3BsYXkgKSB7XG5cblx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdFTlRFUiBWUic7XG5cdFx0XHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRkaXNwbGF5LmlzUHJlc2VudGluZyA/IGRpc3BsYXkuZXhpdFByZXNlbnQoKSA6IGRpc3BsYXkucmVxdWVzdFByZXNlbnQoIFsgeyBzb3VyY2U6IGNhbnZhcyB9IF0gKTtcblxuXHRcdFx0fTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9IGRpc3BsYXkuaXNQcmVzZW50aW5nID8gJ0VYSVQgVlInIDogJ0VOVEVSIFZSJztcblxuXHRcdFx0fSwgZmFsc2UgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdOTyBWUiBESVNQTEFZJztcblxuXHRcdH1cblxuXHRcdHJldHVybiBidXR0b247XG5cblx0fVxuXG59O1xuIiwiaW1wb3J0IHtMb29wLCBDb250cm9sc01vZHVsZSwgQ2FtZXJhQ29tcG9uZW50fSBmcm9tICd3aHMnO1xuaW1wb3J0IHtSRVZJU0lPTn0gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge1ZSRWZmZWN0fSBmcm9tICcuL3ZyL1ZSRWZmZWN0JztcbmltcG9ydCBWUkNvbnRyb2xzTmF0aXZlIGZyb20gJ3RocmVlLXZyY29udHJvbHMtbW9kdWxlJztcbmltcG9ydCB7V0VCVlJ9IGZyb20gJy4vdnIvV2ViVlInO1xuXG5leHBvcnQge1xuICBXRUJWUlxufTtcblxuZXhwb3J0IGNsYXNzIFZSTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7XG4gICAgICBtZXNzYWdlOiB0cnVlLFxuICAgICAgYnV0dG9uOiB0cnVlXG4gICAgfSk7XG5cbiAgICB0aGlzLnNjZW5lID0gbnVsbDtcbiAgICB0aGlzLmNhbWVyYSA9IG51bGw7XG4gICAgdGhpcy5lZmZlY3QgPSBudWxsO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3ZyJyk7XG5cbiAgICBpZiAoUkVWSVNJT04gPiA4NikgY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIFZSTW9kdWxlMiBmb3IgVGhyZWUuanMgXjAuODcuMCAocjg3KScpO1xuXG4gICAgY29uc3QgcmVuZGVyaW5nID0gbWFuYWdlci51c2UoJ3JlbmRlcmluZycpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG5cbiAgICBjb25zdCByZXNpemUgPSBtYW5hZ2VyLnVzZSgncmVzaXplJyk7XG5cbiAgICB0aGlzLmVmZmVjdCA9IG5ldyBWUkVmZmVjdChyZW5kZXJlcik7XG5cbiAgICB0aGlzLnNjZW5lID0gbWFuYWdlci5nZXQoJ3NjZW5lJyk7XG4gICAgdGhpcy5jYW1lcmEgPSBtYW5hZ2VyLmdldCgnY2FtZXJhJyk7XG5cbiAgICByZW5kZXJpbmcuZWZmZWN0KHRoaXMuZWZmZWN0KTtcblxuICAgIC8vIFRPRE86IEZpeCByZXNpemUuXG5cbiAgICByZXNpemUuYWRkQ2FsbGJhY2soKHdpZHRoLCBoZWlnaHQpID0+IHtcbiAgICAgIHRoaXMuZWZmZWN0LnNldFNpemUoK3dpZHRoLCAraGVpZ2h0KTtcbiAgICB9KTtcblxuICAgIC8vIFdFQlZSXG4gICAgY29uc3Qge21lc3NhZ2UsIGJ1dHRvbn0gPSB0aGlzLnBhcmFtcztcblxuICAgIGlmIChtZXNzYWdlKSBXRUJWUi5jaGVja0F2YWlsYWJpbGl0eSgpLmNhdGNoKG1lc3NhZ2UgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChXRUJWUi5nZXRNZXNzYWdlQ29udGFpbmVyKG1lc3NhZ2UpKTtcblx0XHR9KTtcblxuICAgIGlmIChidXR0b24pIFdFQlZSLmdldFZSRGlzcGxheShkaXNwbGF5ID0+IHtcbiAgICAgIGNvbnN0IHZyYnRuID0gV0VCVlIuZ2V0QnV0dG9uKGRpc3BsYXksIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgdnJidG4uY2xhc3NOYW1lID0gJ3ZyLWJ0bic7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodnJidG4pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUjJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRpc3BsYXkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IFdFQlZSLmdldFZSRGlzcGxheShkaXNwbGF5ID0+IHJlc29sdmUoZGlzcGxheSkpKTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCd2cicpO1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcbiAgICByZW5kZXJlci52ci5lbmFibGVkID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhSRVZJU0lPTik7XG4gICAgY29uc29sZS5sb2coMSk7XG5cbiAgICB0aGlzLmRpc3BsYXkudGhlbihkaXNwbGF5ID0+IHtcbiAgICAgIHJlbmRlcmVyLnZyLnNldERldmljZShkaXNwbGF5KTtcblxuICAgICAgY29uc3QgdnJidG4gPSBXRUJWUi5nZXRCdXR0b24oZGlzcGxheSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICB2cmJ0bi5jbGFzc05hbWUgPSAndnItYnRuJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2cmJ0bik7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHtvYmplY3QsIG9uRXJyb3IsIGludGVuc2l0eX0pIHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBWUkNvbnRyb2xzTmF0aXZlKG9iamVjdC5uYXRpdmUsIG9uRXJyb3IpO1xuXG4gICAgY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgIGNvbnRyb2xzLnNjYWxlID0gaW50ZW5zaXR5O1xuXG4gICAgc3VwZXIoe2NvbnRyb2xzfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJWUkVmZmVjdCIsInJlbmRlcmVyIiwib25FcnJvciIsInZyRGlzcGxheSIsInZyRGlzcGxheXMiLCJleWVUcmFuc2xhdGlvbkwiLCJWZWN0b3IzIiwiZXllVHJhbnNsYXRpb25SIiwicmVuZGVyUmVjdEwiLCJyZW5kZXJSZWN0UiIsImZyYW1lRGF0YSIsIndpbmRvdyIsIlZSRnJhbWVEYXRhIiwiZ290VlJEaXNwbGF5cyIsImRpc3BsYXlzIiwibGVuZ3RoIiwibmF2aWdhdG9yIiwiZ2V0VlJEaXNwbGF5cyIsInRoZW4iLCJjYXRjaCIsIndhcm4iLCJpc1ByZXNlbnRpbmciLCJzY2FsZSIsInNjb3BlIiwicmVuZGVyZXJTaXplIiwiZ2V0U2l6ZSIsInJlbmRlcmVyVXBkYXRlU3R5bGUiLCJyZW5kZXJlclBpeGVsUmF0aW8iLCJnZXRQaXhlbFJhdGlvIiwiZ2V0VlJEaXNwbGF5Iiwic2V0VlJEaXNwbGF5IiwidmFsdWUiLCJzZXRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJ1cGRhdGVTdHlsZSIsImV5ZVBhcmFtc0wiLCJnZXRFeWVQYXJhbWV0ZXJzIiwic2V0UGl4ZWxSYXRpbyIsInJlbmRlcldpZHRoIiwicmVuZGVySGVpZ2h0IiwiY2FudmFzIiwiZG9tRWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxzY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsImRlZmF1bHRMZWZ0Qm91bmRzIiwiZGVmYXVsdFJpZ2h0Qm91bmRzIiwib25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlIiwid2FzUHJlc2VudGluZyIsInVuZGVmaW5lZCIsImV5ZVdpZHRoIiwiZXllSGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEZ1bGxTY3JlZW4iLCJib29sZWFuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsInJlcXVlc3RQcmVzZW50Iiwic291cmNlIiwiZXhpdFByZXNlbnQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJoIiwic3VibWl0RnJhbWUiLCJhdXRvU3VibWl0RnJhbWUiLCJjYW1lcmFMIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJsYXllcnMiLCJlbmFibGUiLCJjYW1lcmFSIiwicmVuZGVyIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJUYXJnZXQiLCJmb3JjZUNsZWFyIiwiYXV0b1VwZGF0ZSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwiZXllUGFyYW1zUiIsImZyb21BcnJheSIsIm9mZnNldCIsIkFycmF5IiwiaXNBcnJheSIsInNpemUiLCJnZXRMYXllcnMiLCJsZWZ0Qm91bmRzIiwicmlnaHRCb3VuZHMiLCJsYXllciIsIk1hdGgiLCJyb3VuZCIsInNldFJlbmRlclRhcmdldCIsInNjaXNzb3JUZXN0Iiwic2V0U2Npc3NvclRlc3QiLCJhdXRvQ2xlYXIiLCJjbGVhciIsInBhcmVudCIsIm1hdHJpeFdvcmxkIiwiZGVjb21wb3NlIiwicG9zaXRpb24iLCJxdWF0ZXJuaW9uIiwidHJhbnNsYXRlT25BeGlzIiwiZ2V0RnJhbWVEYXRhIiwiZGVwdGhOZWFyIiwibmVhciIsImRlcHRoRmFyIiwiZmFyIiwicHJvamVjdGlvbk1hdHJpeCIsImVsZW1lbnRzIiwibGVmdFByb2plY3Rpb25NYXRyaXgiLCJyaWdodFByb2plY3Rpb25NYXRyaXgiLCJmb3ZUb1Byb2plY3Rpb24iLCJmaWVsZE9mVmlldyIsInZpZXdwb3J0Iiwic2V0IiwieCIsInkiLCJzY2lzc29yIiwic2V0Vmlld3BvcnQiLCJzZXRTY2lzc29yIiwiZGlzcG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb3ZUb05EQ1NjYWxlT2Zmc2V0IiwiZm92IiwicHhzY2FsZSIsImxlZnRUYW4iLCJyaWdodFRhbiIsInB4b2Zmc2V0IiwicHlzY2FsZSIsInVwVGFuIiwiZG93blRhbiIsInB5b2Zmc2V0IiwiZm92UG9ydFRvUHJvamVjdGlvbiIsInJpZ2h0SGFuZGVkIiwiek5lYXIiLCJ6RmFyIiwiaGFuZGVkbmVzc1NjYWxlIiwibW9iaiIsIk1hdHJpeDQiLCJtIiwic2NhbGVBbmRPZmZzZXQiLCJ0cmFuc3Bvc2UiLCJERUcyUkFEIiwiUEkiLCJmb3ZQb3J0IiwidGFuIiwidXBEZWdyZWVzIiwiZG93bkRlZ3JlZXMiLCJsZWZ0RGVncmVlcyIsInJpZ2h0RGVncmVlcyIsIlZSQ29udHJvbHMiLCJXRUJWUiIsIm9uRGlzcGxheSIsIm1lc3NhZ2UiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImxlZnQiLCJ0b3AiLCJyaWdodCIsInpJbmRleCIsImFsaWduIiwiZXJyb3IiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJmb250U3R5bGUiLCJsaW5lSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJwYWRkaW5nIiwibWFyZ2luIiwiZGlzcGxheSIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiVEhSRUUiLCJidXR0b24iLCJib3R0b20iLCJib3JkZXIiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0Q29udGVudCIsIm9uY2xpY2siLCJWUk1vZHVsZSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImVmZmVjdCIsIm1hbmFnZXIiLCJkZWZpbmUiLCJSRVZJU0lPTiIsImNvbnNvbGUiLCJyZW5kZXJpbmciLCJ1c2UiLCJnZXQiLCJyZXNpemUiLCJhZGRDYWxsYmFjayIsImNoZWNrQXZhaWxhYmlsaXR5IiwiYm9keSIsImdldE1lc3NhZ2VDb250YWluZXIiLCJ2cmJ0biIsImdldEJ1dHRvbiIsImNsYXNzTmFtZSIsIlZSMk1vZHVsZSIsInZyIiwiZW5hYmxlZCIsImxvZyIsInNldERldmljZSIsIm9iamVjdCIsImludGVuc2l0eSIsImNvbnRyb2xzIiwiVlJDb250cm9sc05hdGl2ZSIsIm5hdGl2ZSIsInN0YW5kaW5nIiwiQ29udHJvbHNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFXQSxBQU1PLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFXQyxRQUFYLEVBQXFCQyxPQUFyQixFQUErQjs7S0FFbERDLFNBQUosRUFBZUMsVUFB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
