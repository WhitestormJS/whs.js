/* Built for whs v2.1.9 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('whs'), require('three'), require('three-vrcontrols-module')) :
	typeof define === 'function' && define.amd ? define(['exports', 'whs', 'three', 'three-vrcontrols-module'], factory) :
	(factory((global.VRKit = global.VRKit || {}),global.WHS,global.THREE,global.VRControlsNative));
}(this, (function (exports,whs,three,VRControlsNative) { 'use strict';

VRControlsNative = VRControlsNative && 'default' in VRControlsNative ? VRControlsNative['default'] : VRControlsNative;

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

    var controls = new VRControlsNative(object.native, onError);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1ZSRWZmZWN0LmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvdnIvV2ViVlIuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9WUktpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgZG1hcmNvcyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9kbWFyY29zXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tXG4gKlxuICogV2ViVlIgU3BlYzogaHR0cDovL21venZyLmdpdGh1Yi5pby93ZWJ2ci1zcGVjL3dlYnZyLmh0bWxcbiAqXG4gKiBGaXJlZm94OiBodHRwOi8vbW96dnIuY29tL2Rvd25sb2Fkcy9cbiAqIENocm9taXVtOiBodHRwczovL3dlYnZyLmluZm8vZ2V0LWNocm9tZVxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBWZWN0b3IzLFxuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgTWF0cml4NFxufSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjb25zdCBWUkVmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIsIG9uRXJyb3IgKSB7XG5cblx0dmFyIHZyRGlzcGxheSwgdnJEaXNwbGF5cztcblx0dmFyIGV5ZVRyYW5zbGF0aW9uTCA9IG5ldyBWZWN0b3IzKCk7XG5cdHZhciBleWVUcmFuc2xhdGlvblIgPSBuZXcgVmVjdG9yMygpO1xuXHR2YXIgcmVuZGVyUmVjdEwsIHJlbmRlclJlY3RSO1xuXG5cdHZhciBmcmFtZURhdGEgPSBudWxsO1xuXG5cdGlmICggJ1ZSRnJhbWVEYXRhJyBpbiB3aW5kb3cgKSB7XG5cblx0XHRmcmFtZURhdGEgPSBuZXcgVlJGcmFtZURhdGEoKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZ290VlJEaXNwbGF5cyggZGlzcGxheXMgKSB7XG5cblx0XHR2ckRpc3BsYXlzID0gZGlzcGxheXM7XG5cblx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdHZyRGlzcGxheSA9IGRpc3BsYXlzWyAwIF07XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIG9uRXJyb3IgKSBvbkVycm9yKCAnSE1EIG5vdCBhdmFpbGFibGUnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgKSB7XG5cblx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGdvdFZSRGlzcGxheXMgKS5jYXRjaCAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IFVuYWJsZSB0byBnZXQgVlIgRGlzcGxheXMnICk7XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8vXG5cblx0dGhpcy5pc1ByZXNlbnRpbmcgPSBmYWxzZTtcblx0dGhpcy5zY2FsZSA9IDE7XG5cblx0dmFyIHNjb3BlID0gdGhpcztcblxuXHR2YXIgcmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXHR2YXIgcmVuZGVyZXJVcGRhdGVTdHlsZSA9IGZhbHNlO1xuXHR2YXIgcmVuZGVyZXJQaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHZyRGlzcGxheTtcblxuXHR9O1xuXG5cdHRoaXMuc2V0VlJEaXNwbGF5ID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHZyRGlzcGxheSA9IHZhbHVlO1xuXG5cdH07XG5cblx0dGhpcy5nZXRWUkRpc3BsYXlzID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3Q6IGdldFZSRGlzcGxheXMoKSBpcyBiZWluZyBkZXByZWNhdGVkLicgKTtcblx0XHRyZXR1cm4gdnJEaXNwbGF5cztcblxuXHR9O1xuXG5cdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCwgdXBkYXRlU3R5bGUgKSB7XG5cblx0XHRyZW5kZXJlclNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcblx0XHRyZW5kZXJlclVwZGF0ZVN0eWxlID0gdXBkYXRlU3R5bGU7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCBleWVQYXJhbXNMLnJlbmRlcldpZHRoICogMiwgZXllUGFyYW1zTC5yZW5kZXJIZWlnaHQsIGZhbHNlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHQvLyBmdWxsc2NyZWVuXG5cblx0dmFyIGNhbnZhcyA9IHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cdHZhciByZXF1ZXN0RnVsbHNjcmVlbjtcblx0dmFyIGV4aXRGdWxsc2NyZWVuO1xuXHR2YXIgZnVsbHNjcmVlbkVsZW1lbnQ7XG5cdHZhciBkZWZhdWx0TGVmdEJvdW5kcyA9IFsgMC4wLCAwLjAsIDAuNSwgMS4wIF07XG5cdHZhciBkZWZhdWx0UmlnaHRCb3VuZHMgPSBbIDAuNSwgMC4wLCAwLjUsIDEuMCBdO1xuXG5cdGZ1bmN0aW9uIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSgpIHtcblxuXHRcdHZhciB3YXNQcmVzZW50aW5nID0gc2NvcGUuaXNQcmVzZW50aW5nO1xuXHRcdHNjb3BlLmlzUHJlc2VudGluZyA9IHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICYmIHZyRGlzcGxheS5pc1ByZXNlbnRpbmc7XG5cblx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllV2lkdGggPSBleWVQYXJhbXNMLnJlbmRlcldpZHRoO1xuXHRcdFx0dmFyIGV5ZUhlaWdodCA9IGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0O1xuXG5cdFx0XHRpZiAoICF3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblx0XHRcdFx0cmVuZGVyZXJTaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIDEgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllV2lkdGggKiAyLCBleWVIZWlnaHQsIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHdhc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHJlbmRlcmVyUGl4ZWxSYXRpbyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggcmVuZGVyZXJTaXplLndpZHRoLCByZW5kZXJlclNpemUuaGVpZ2h0LCByZW5kZXJlclVwZGF0ZVN0eWxlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSwgZmFsc2UgKTtcblxuXHR0aGlzLnNldEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoIGJvb2xlYW4gKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uICggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJlamVjdCggbmV3IEVycm9yKCAnTm8gVlIgaGFyZHdhcmUgZm91bmQuJyApICk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLmlzUHJlc2VudGluZyA9PT0gYm9vbGVhbiApIHtcblxuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LnJlcXVlc3RQcmVzZW50KCBbIHsgc291cmNlOiBjYW52YXMgfSBdICkgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZXNvbHZlKCB2ckRpc3BsYXkuZXhpdFByZXNlbnQoKSApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RQcmVzZW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnVsbFNjcmVlbiggdHJ1ZSApO1xuXG5cdH07XG5cblx0dGhpcy5leGl0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIGZhbHNlICk7XG5cblx0fTtcblxuXHR0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggZiApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHJldHVybiB2ckRpc3BsYXkucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICggaCApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCBoICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLnN1Ym1pdEZyYW1lID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZyRGlzcGxheS5zdWJtaXRGcmFtZSgpO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5hdXRvU3VibWl0RnJhbWUgPSB0cnVlO1xuXG5cdC8vIHJlbmRlclxuXG5cdHZhciBjYW1lcmFMID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYUwubGF5ZXJzLmVuYWJsZSggMSApO1xuXG5cdHZhciBjYW1lcmFSID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYVIubGF5ZXJzLmVuYWJsZSggMiApO1xuXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAmJiBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBhdXRvVXBkYXRlID0gc2NlbmUuYXV0b1VwZGF0ZTtcblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZXllUGFyYW1zTCA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAnbGVmdCcgKTtcblx0XHRcdHZhciBleWVQYXJhbXNSID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdyaWdodCcgKTtcblxuXHRcdFx0ZXllVHJhbnNsYXRpb25MLmZyb21BcnJheSggZXllUGFyYW1zTC5vZmZzZXQgKTtcblx0XHRcdGV5ZVRyYW5zbGF0aW9uUi5mcm9tQXJyYXkoIGV5ZVBhcmFtc1Iub2Zmc2V0ICk7XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggc2NlbmUgKSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WUkVmZmVjdC5yZW5kZXIoKSBubyBsb25nZXIgc3VwcG9ydHMgYXJyYXlzLiBVc2Ugb2JqZWN0LmxheWVycyBpbnN0ZWFkLicgKTtcblx0XHRcdFx0c2NlbmUgPSBzY2VuZVsgMCBdO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIFdoZW4gcmVuZGVyaW5nIHdlIGRvbid0IGNhcmUgd2hhdCB0aGUgcmVjb21tZW5kZWQgc2l6ZSBpcywgb25seSB3aGF0IHRoZSBhY3R1YWwgc2l6ZVxuXHRcdFx0Ly8gb2YgdGhlIGJhY2tidWZmZXIgaXMuXG5cdFx0XHR2YXIgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0XHRcdHZhciBsYXllcnMgPSB2ckRpc3BsYXkuZ2V0TGF5ZXJzKCk7XG5cdFx0XHR2YXIgbGVmdEJvdW5kcztcblx0XHRcdHZhciByaWdodEJvdW5kcztcblxuXHRcdFx0aWYgKCBsYXllcnMubGVuZ3RoICkge1xuXG5cdFx0XHRcdHZhciBsYXllciA9IGxheWVyc1sgMCBdO1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBsYXllci5sZWZ0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLmxlZnRCb3VuZHMubGVuZ3RoID09PSA0ID8gbGF5ZXIubGVmdEJvdW5kcyA6IGRlZmF1bHRMZWZ0Qm91bmRzO1xuXHRcdFx0XHRyaWdodEJvdW5kcyA9IGxheWVyLnJpZ2h0Qm91bmRzICE9PSBudWxsICYmIGxheWVyLnJpZ2h0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLnJpZ2h0Qm91bmRzIDogZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGxlZnRCb3VuZHMgPSBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBkZWZhdWx0UmlnaHRCb3VuZHM7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyUmVjdEwgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiBsZWZ0Qm91bmRzWyAxIF0gKSxcblx0XHRcdFx0d2lkdGg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiBsZWZ0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cdFx0XHRyZW5kZXJSZWN0UiA9IHtcblx0XHRcdFx0eDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAwIF0gKSxcblx0XHRcdFx0eTogTWF0aC5yb3VuZCggc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogcmlnaHRCb3VuZHNbIDIgXSApLFxuXHRcdFx0XHRoZWlnaHQ6IE1hdGgucm91bmQoc2l6ZS5oZWlnaHQgKiByaWdodEJvdW5kc1sgMyBdIClcblx0XHRcdH07XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCB0cnVlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgfHwgZm9yY2VDbGVhciApIHJlbmRlcmVyLmNsZWFyKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gbnVsbCApIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFMLnBvc2l0aW9uLCBjYW1lcmFMLnF1YXRlcm5pb24sIGNhbWVyYUwuc2NhbGUgKTtcblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIGNhbWVyYVIucG9zaXRpb24sIGNhbWVyYVIucXVhdGVybmlvbiwgY2FtZXJhUi5zY2FsZSApO1xuXG5cdFx0XHR2YXIgc2NhbGUgPSB0aGlzLnNjYWxlO1xuXHRcdFx0Y2FtZXJhTC50cmFuc2xhdGVPbkF4aXMoIGV5ZVRyYW5zbGF0aW9uTCwgc2NhbGUgKTtcblx0XHRcdGNhbWVyYVIudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvblIsIHNjYWxlICk7XG5cblx0XHRcdGlmICggdnJEaXNwbGF5LmdldEZyYW1lRGF0YSApIHtcblxuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhOZWFyID0gY2FtZXJhLm5lYXI7XG5cdFx0XHRcdHZyRGlzcGxheS5kZXB0aEZhciA9IGNhbWVyYS5mYXI7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmdldEZyYW1lRGF0YSggZnJhbWVEYXRhICk7XG5cblx0XHRcdFx0Y2FtZXJhTC5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLmxlZnRQcm9qZWN0aW9uTWF0cml4O1xuXHRcdFx0XHRjYW1lcmFSLnByb2plY3Rpb25NYXRyaXguZWxlbWVudHMgPSBmcmFtZURhdGEucmlnaHRQcm9qZWN0aW9uTWF0cml4O1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zTC5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4ID0gZm92VG9Qcm9qZWN0aW9uKCBleWVQYXJhbXNSLmZpZWxkT2ZWaWV3LCB0cnVlLCBjYW1lcmEubmVhciwgY2FtZXJhLmZhciApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbmRlciBsZWZ0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYUwsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHQvLyByZW5kZXIgcmlnaHQgZXllXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3IoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fVxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhUiwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3JUZXN0ID0gZmFsc2U7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggZmFsc2UgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGF1dG9VcGRhdGUgKSB7XG5cblx0XHRcdFx0c2NlbmUuYXV0b1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5hdXRvU3VibWl0RnJhbWUgKSB7XG5cblx0XHRcdFx0c2NvcGUuc3VibWl0RnJhbWUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHQvLyBSZWd1bGFyIHJlbmRlciBtb2RlIGlmIG5vdCBITURcblxuXHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0fTtcblxuXHR0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0fTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApIHtcblxuXHRcdHZhciBweHNjYWxlID0gMi4wIC8gKCBmb3YubGVmdFRhbiArIGZvdi5yaWdodFRhbiApO1xuXHRcdHZhciBweG9mZnNldCA9ICggZm92LmxlZnRUYW4gLSBmb3YucmlnaHRUYW4gKSAqIHB4c2NhbGUgKiAwLjU7XG5cdFx0dmFyIHB5c2NhbGUgPSAyLjAgLyAoIGZvdi51cFRhbiArIGZvdi5kb3duVGFuICk7XG5cdFx0dmFyIHB5b2Zmc2V0ID0gKCBmb3YudXBUYW4gLSBmb3YuZG93blRhbiApICogcHlzY2FsZSAqIDAuNTtcblx0XHRyZXR1cm4geyBzY2FsZTogWyBweHNjYWxlLCBweXNjYWxlIF0sIG9mZnNldDogWyBweG9mZnNldCwgcHlvZmZzZXQgXSB9O1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuXHRcdHJpZ2h0SGFuZGVkID0gcmlnaHRIYW5kZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByaWdodEhhbmRlZDtcblx0XHR6TmVhciA9IHpOZWFyID09PSB1bmRlZmluZWQgPyAwLjAxIDogek5lYXI7XG5cdFx0ekZhciA9IHpGYXIgPT09IHVuZGVmaW5lZCA/IDEwMDAwLjAgOiB6RmFyO1xuXG5cdFx0dmFyIGhhbmRlZG5lc3NTY2FsZSA9IHJpZ2h0SGFuZGVkID8gLSAxLjAgOiAxLjA7XG5cblx0XHQvLyBzdGFydCB3aXRoIGFuIGlkZW50aXR5IG1hdHJpeFxuXHRcdHZhciBtb2JqID0gbmV3IE1hdHJpeDQoKTtcblx0XHR2YXIgbSA9IG1vYmouZWxlbWVudHM7XG5cblx0XHQvLyBhbmQgd2l0aCBzY2FsZS9vZmZzZXQgaW5mbyBmb3Igbm9ybWFsaXplZCBkZXZpY2UgY29vcmRzXG5cdFx0dmFyIHNjYWxlQW5kT2Zmc2V0ID0gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICk7XG5cblx0XHQvLyBYIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuXHRcdG1bIDAgKiA0ICsgMCBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDAgXTtcblx0XHRtWyAwICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAwICogNCArIDIgXSA9IHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMCBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDAgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWSByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHQvLyBZIG9mZnNldCBpcyBuZWdhdGVkIGJlY2F1c2UgdGhpcyBwcm9qIG1hdHJpeCB0cmFuc2Zvcm1zIGZyb20gd29ybGQgY29vcmRzIHdpdGggWT11cCxcblx0XHQvLyBidXQgdGhlIE5EQyBzY2FsaW5nIGhhcyBZPWRvd24gKHRoYW5rcyBEM0Q/KVxuXHRcdG1bIDEgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDEgKiA0ICsgMSBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbIDEgXTtcblx0XHRtWyAxICogNCArIDIgXSA9IC0gc2NhbGVBbmRPZmZzZXQub2Zmc2V0WyAxIF0gKiBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMSAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHQvLyBaIHJlc3VsdCAodXAgdG8gdGhlIGFwcClcblx0XHRtWyAyICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAyICogNCArIDIgXSA9IHpGYXIgLyAoIHpOZWFyIC0gekZhciApICogLSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMiAqIDQgKyAzIF0gPSAoIHpGYXIgKiB6TmVhciApIC8gKCB6TmVhciAtIHpGYXIgKTtcblxuXHRcdC8vIFcgcmVzdWx0ICg9IFogaW4pXG5cdFx0bVsgMyAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMyAqIDQgKyAyIF0gPSBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMyAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHRtb2JqLnRyYW5zcG9zZSgpO1xuXG5cdFx0cmV0dXJuIG1vYmo7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGZvdlRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHR2YXIgREVHMlJBRCA9IE1hdGguUEkgLyAxODAuMDtcblxuXHRcdHZhciBmb3ZQb3J0ID0ge1xuXHRcdFx0dXBUYW46IE1hdGgudGFuKCBmb3YudXBEZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0ZG93blRhbjogTWF0aC50YW4oIGZvdi5kb3duRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGxlZnRUYW46IE1hdGgudGFuKCBmb3YubGVmdERlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRyaWdodFRhbjogTWF0aC50YW4oIGZvdi5yaWdodERlZ3JlZXMgKiBERUcyUkFEIClcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdlBvcnQsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApO1xuXG5cdH1cblxufTtcbiIsIi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICogQGF1dGhvciBNdWdlbjg3IC8gaHR0cHM6Ly9naXRodWIuY29tL011Z2VuODdcbiAqXG4gKiBCYXNlZCBvbiBAdG9qaXJvJ3MgdnItc2FtcGxlcy11dGlscy5qc1xuICovXG5cbmV4cG9ydCBjb25zdCBXRUJWUiA9IHtcblxuXHRpc0F2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnV0VCVlI6IGlzQXZhaWxhYmxlKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4gVXNlIC5jaGVja0F2YWlsYWJpbGl0eSgpIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyAhPT0gdW5kZWZpbmVkO1xuXG5cdH0sXG5cblx0Y2hlY2tBdmFpbGFiaWxpdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24oIHJlc29sdmUsIHJlamVjdCApIHtcblxuXHRcdFx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKCkudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblxuXHRcdFx0XHRcdGlmICggZGlzcGxheXMubGVuZ3RoID09PSAwICkge1xuXG5cdFx0XHRcdFx0XHRyZWplY3QoICdXZWJWUiBzdXBwb3J0ZWQsIGJ1dCBubyBWUkRpc3BsYXlzIGZvdW5kLicgKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVqZWN0KCAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViVlIuIFNlZSA8YSBocmVmPVwiaHR0cHM6Ly93ZWJ2ci5pbmZvXCI+d2VidnIuaW5mbzwvYT4gZm9yIGFzc2lzdGFuY2UuJyApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fSxcblxuXHRnZXRWUkRpc3BsYXk6IGZ1bmN0aW9uICggb25EaXNwbGF5ICkge1xuXG5cdFx0aWYgKCAnZ2V0VlJEaXNwbGF5cycgaW4gbmF2aWdhdG9yICkge1xuXG5cdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpXG5cdFx0XHRcdC50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXHRcdFx0XHRcdG9uRGlzcGxheSggZGlzcGxheXNbIDAgXSApO1xuXHRcdFx0XHR9ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdXRUJWUjogZ2V0TWVzc2FnZSgpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSAuZ2V0TWVzc2FnZUNvbnRhaW5lciggbWVzc2FnZSApIGluc3RlYWQuJyApO1xuXG5cdFx0dmFyIG1lc3NhZ2U7XG5cblx0XHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICkge1xuXG5cdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cblx0XHRcdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPT09IDAgKSBtZXNzYWdlID0gJ1dlYlZSIHN1cHBvcnRlZCwgYnV0IG5vIFZSRGlzcGxheXMgZm91bmQuJztcblxuXHRcdFx0fSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bWVzc2FnZSA9ICdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJWUi4gU2VlIDxhIGhyZWY9XCJodHRwOi8vd2VidnIuaW5mb1wiPndlYnZyLmluZm88L2E+IGZvciBhc3Npc3RhbmNlLic7XG5cblx0XHR9XG5cblx0XHRpZiAoIG1lc3NhZ2UgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0XHRjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMCc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5OTknO1xuXHRcdFx0Y29udGFpbmVyLmFsaWduID0gJ2NlbnRlcic7XG5cblx0XHRcdHZhciBlcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0XHRlcnJvci5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5mb250U3R5bGUgPSAnbm9ybWFsJztcblx0XHRcdGVycm9yLnN0eWxlLmxpbmVIZWlnaHQgPSAnMjZweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cdFx0XHRlcnJvci5zdHlsZS5jb2xvciA9ICcjMDAwJztcblx0XHRcdGVycm9yLnN0eWxlLnBhZGRpbmcgPSAnMTBweCAyMHB4Jztcblx0XHRcdGVycm9yLnN0eWxlLm1hcmdpbiA9ICc1MHB4Jztcblx0XHRcdGVycm9yLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcblx0XHRcdGVycm9yLmlubmVySFRNTCA9IG1lc3NhZ2U7XG5cdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGVycm9yICk7XG5cblx0XHRcdHJldHVybiBjb250YWluZXI7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRNZXNzYWdlQ29udGFpbmVyOiBmdW5jdGlvbiAoIG1lc3NhZ2UgKSB7XG5cblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS50b3AgPSAnMCc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnOTk5Jztcblx0XHRjb250YWluZXIuYWxpZ24gPSAnY2VudGVyJztcblxuXHRcdHZhciBlcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRlcnJvci5zdHlsZS5mb250U2l6ZSA9ICcxNnB4Jztcblx0XHRlcnJvci5zdHlsZS5mb250U3R5bGUgPSAnbm9ybWFsJztcblx0XHRlcnJvci5zdHlsZS5saW5lSGVpZ2h0ID0gJzI2cHgnO1xuXHRcdGVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblx0XHRlcnJvci5zdHlsZS5jb2xvciA9ICcjMDAwJztcblx0XHRlcnJvci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG5cdFx0ZXJyb3Iuc3R5bGUubWFyZ2luID0gJzUwcHgnO1xuXHRcdGVycm9yLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcblx0XHRlcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZXJyb3IgKTtcblxuXHRcdHJldHVybiBjb250YWluZXI7XG5cblx0fSxcblxuXHRnZXRCdXR0b246IGZ1bmN0aW9uICggZGlzcGxheSwgY2FudmFzICkge1xuXG5cdFx0aWYgKCAnVlJFZmZlY3QnIGluIFRIUkVFICYmIGRpc3BsYXkgaW5zdGFuY2VvZiBUSFJFRS5WUkVmZmVjdCApIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggJ1dlYlZSLmdldEJ1dHRvbigpIG5vdyBleHBlY3RzIGEgVlJEaXNwbGF5LicgKTtcblx0XHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXG5cdFx0fVxuXG5cdFx0dmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdidXR0b24nICk7XG5cdFx0YnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRidXR0b24uc3R5bGUubGVmdCA9ICdjYWxjKDUwJSAtIDUwcHgpJztcblx0XHRidXR0b24uc3R5bGUuYm90dG9tID0gJzIwcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS53aWR0aCA9ICcxMDBweCc7XG5cdFx0YnV0dG9uLnN0eWxlLmJvcmRlciA9ICcwJztcblx0XHRidXR0b24uc3R5bGUucGFkZGluZyA9ICc4cHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0YnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcblx0XHRidXR0b24uc3R5bGUuY29sb3IgPSAnI2ZmZic7XG5cdFx0YnV0dG9uLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0YnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzEzcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250U3R5bGUgPSAnbm9ybWFsJztcblx0XHRidXR0b24uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG5cdFx0YnV0dG9uLnN0eWxlLnpJbmRleCA9ICc5OTknO1xuXG5cdFx0aWYgKCBkaXNwbGF5ICkge1xuXG5cdFx0XHRidXR0b24udGV4dENvbnRlbnQgPSAnRU5URVIgVlInO1xuXHRcdFx0YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0ZGlzcGxheS5pc1ByZXNlbnRpbmcgPyBkaXNwbGF5LmV4aXRQcmVzZW50KCkgOiBkaXNwbGF5LnJlcXVlc3RQcmVzZW50KCBbIHsgc291cmNlOiBjYW52YXMgfSBdICk7XG5cblx0XHRcdH07XG5cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRidXR0b24udGV4dENvbnRlbnQgPSBkaXNwbGF5LmlzUHJlc2VudGluZyA/ICdFWElUIFZSJyA6ICdFTlRFUiBWUic7XG5cblx0XHRcdH0sIGZhbHNlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRidXR0b24udGV4dENvbnRlbnQgPSAnTk8gVlIgRElTUExBWSc7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYnV0dG9uO1xuXG5cdH1cblxufTtcbiIsImltcG9ydCB7TG9vcCwgQ29udHJvbHNNb2R1bGUsIENhbWVyYUNvbXBvbmVudH0gZnJvbSAnd2hzJztcbmltcG9ydCB7UkVWSVNJT059IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHtWUkVmZmVjdH0gZnJvbSAnLi92ci9WUkVmZmVjdCc7XG5pbXBvcnQgVlJDb250cm9sc05hdGl2ZSBmcm9tICd0aHJlZS12cmNvbnRyb2xzLW1vZHVsZSc7XG5pbXBvcnQge1dFQlZSfSBmcm9tICcuL3ZyL1dlYlZSJztcblxuZXhwb3J0IHtcbiAgV0VCVlJcbn07XG5cbmV4cG9ydCBjbGFzcyBWUk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHBhcmFtcywge1xuICAgICAgbWVzc2FnZTogdHJ1ZSxcbiAgICAgIGJ1dHRvbjogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdGhpcy5zY2VuZSA9IG51bGw7XG4gICAgdGhpcy5jYW1lcmEgPSBudWxsO1xuICAgIHRoaXMuZWZmZWN0ID0gbnVsbDtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCd2cicpO1xuXG4gICAgaWYgKFJFVklTSU9OID4gODYpIGNvbnNvbGUud2FybignUGxlYXNlIHVzZSBWUk1vZHVsZTIgZm9yIFRocmVlLmpzIF4wLjg3LjAgKHI4NyknKTtcblxuICAgIGNvbnN0IHJlbmRlcmluZyA9IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKTtcbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuXG4gICAgY29uc3QgcmVzaXplID0gbWFuYWdlci51c2UoJ3Jlc2l6ZScpO1xuXG4gICAgdGhpcy5lZmZlY3QgPSBuZXcgVlJFZmZlY3QocmVuZGVyZXIpO1xuXG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgcmVuZGVyaW5nLmVmZmVjdCh0aGlzLmVmZmVjdCk7XG5cbiAgICAvLyBUT0RPOiBGaXggcmVzaXplLlxuXG4gICAgcmVzaXplLmFkZENhbGxiYWNrKCh3aWR0aCwgaGVpZ2h0KSA9PiB7XG4gICAgICB0aGlzLmVmZmVjdC5zZXRTaXplKCt3aWR0aCwgK2hlaWdodCk7XG4gICAgfSk7XG5cbiAgICAvLyBXRUJWUlxuICAgIGNvbnN0IHttZXNzYWdlLCBidXR0b259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICBpZiAobWVzc2FnZSkgV0VCVlIuY2hlY2tBdmFpbGFiaWxpdHkoKS5jYXRjaChtZXNzYWdlID0+IHtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoV0VCVlIuZ2V0TWVzc2FnZUNvbnRhaW5lcihtZXNzYWdlKSk7XG5cdFx0fSk7XG5cbiAgICBpZiAoYnV0dG9uKSBXRUJWUi5nZXRWUkRpc3BsYXkoZGlzcGxheSA9PiB7XG4gICAgICBjb25zdCB2cmJ0biA9IFdFQlZSLmdldEJ1dHRvbihkaXNwbGF5LCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgIHZyYnRuLmNsYXNzTmFtZSA9ICd2ci1idG4nO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZyYnRuKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVlIyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXNwbGF5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBXRUJWUi5nZXRWUkRpc3BsYXkoZGlzcGxheSA9PiByZXNvbHZlKGRpc3BsYXkpKSk7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgndnInKTtcblxuICAgIGNvbnN0IHJlbmRlcmVyID0gbWFuYWdlci5nZXQoJ3JlbmRlcmVyJyk7XG4gICAgcmVuZGVyZXIudnIuZW5hYmxlZCA9IHRydWU7XG4gICAgY29uc29sZS5sb2coUkVWSVNJT04pO1xuICAgIGNvbnNvbGUubG9nKDEpO1xuXG4gICAgdGhpcy5kaXNwbGF5LnRoZW4oZGlzcGxheSA9PiB7XG4gICAgICByZW5kZXJlci52ci5zZXREZXZpY2UoZGlzcGxheSk7XG5cbiAgICAgIGNvbnN0IHZyYnRuID0gV0VCVlIuZ2V0QnV0dG9uKGRpc3BsYXksIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgdnJidG4uY2xhc3NOYW1lID0gJ3ZyLWJ0bic7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodnJidG4pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUkNvbnRyb2xzIGV4dGVuZHMgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih7b2JqZWN0LCBvbkVycm9yLCBpbnRlbnNpdHl9KSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVlJDb250cm9sc05hdGl2ZShvYmplY3QubmF0aXZlLCBvbkVycm9yKTtcblxuICAgIGNvbnRyb2xzLnN0YW5kaW5nID0gdHJ1ZTtcbiAgICBjb250cm9scy5zY2FsZSA9IGludGVuc2l0eTtcblxuICAgIHN1cGVyKHtjb250cm9sc30pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVlJFZmZlY3QiLCJyZW5kZXJlciIsIm9uRXJyb3IiLCJ2ckRpc3BsYXkiLCJ2ckRpc3BsYXlzIiwiZXllVHJhbnNsYXRpb25MIiwiVmVjdG9yMyIsImV5ZVRyYW5zbGF0aW9uUiIsInJlbmRlclJlY3RMIiwicmVuZGVyUmVjdFIiLCJmcmFtZURhdGEiLCJ3aW5kb3ciLCJWUkZyYW1lRGF0YSIsImdvdFZSRGlzcGxheXMiLCJkaXNwbGF5cyIsImxlbmd0aCIsIm5hdmlnYXRvciIsImdldFZSRGlzcGxheXMiLCJ0aGVuIiwiY2F0Y2giLCJ3YXJuIiwiaXNQcmVzZW50aW5nIiwic2NhbGUiLCJzY29wZSIsInJlbmRlcmVyU2l6ZSIsImdldFNpemUiLCJyZW5kZXJlclVwZGF0ZVN0eWxlIiwicmVuZGVyZXJQaXhlbFJhdGlvIiwiZ2V0UGl4ZWxSYXRpbyIsImdldFZSRGlzcGxheSIsInNldFZSRGlzcGxheSIsInZhbHVlIiwic2V0U2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwidXBkYXRlU3R5bGUiLCJleWVQYXJhbXNMIiwiZ2V0RXllUGFyYW1ldGVycyIsInNldFBpeGVsUmF0aW8iLCJyZW5kZXJXaWR0aCIsInJlbmRlckhlaWdodCIsImNhbnZhcyIsImRvbUVsZW1lbnQiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsImV4aXRGdWxsc2NyZWVuIiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJkZWZhdWx0TGVmdEJvdW5kcyIsImRlZmF1bHRSaWdodEJvdW5kcyIsIm9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSIsIndhc1ByZXNlbnRpbmciLCJ1bmRlZmluZWQiLCJleWVXaWR0aCIsImV5ZUhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRGdWxsU2NyZWVuIiwiYm9vbGVhbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXF1ZXN0UHJlc2VudCIsInNvdXJjZSIsImV4aXRQcmVzZW50IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaCIsInN1Ym1pdEZyYW1lIiwiYXV0b1N1Ym1pdEZyYW1lIiwiY2FtZXJhTCIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwibGF5ZXJzIiwiZW5hYmxlIiwiY2FtZXJhUiIsInJlbmRlciIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyVGFyZ2V0IiwiZm9yY2VDbGVhciIsImF1dG9VcGRhdGUiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsImV5ZVBhcmFtc1IiLCJmcm9tQXJyYXkiLCJvZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJzaXplIiwiZ2V0TGF5ZXJzIiwibGVmdEJvdW5kcyIsInJpZ2h0Qm91bmRzIiwibGF5ZXIiLCJNYXRoIiwicm91bmQiLCJzZXRSZW5kZXJUYXJnZXQiLCJzY2lzc29yVGVzdCIsInNldFNjaXNzb3JUZXN0IiwiYXV0b0NsZWFyIiwiY2xlYXIiLCJwYXJlbnQiLCJtYXRyaXhXb3JsZCIsImRlY29tcG9zZSIsInBvc2l0aW9uIiwicXVhdGVybmlvbiIsInRyYW5zbGF0ZU9uQXhpcyIsImdldEZyYW1lRGF0YSIsImRlcHRoTmVhciIsIm5lYXIiLCJkZXB0aEZhciIsImZhciIsInByb2plY3Rpb25NYXRyaXgiLCJlbGVtZW50cyIsImxlZnRQcm9qZWN0aW9uTWF0cml4IiwicmlnaHRQcm9qZWN0aW9uTWF0cml4IiwiZm92VG9Qcm9qZWN0aW9uIiwiZmllbGRPZlZpZXciLCJ2aWV3cG9ydCIsInNldCIsIngiLCJ5Iiwic2Npc3NvciIsInNldFZpZXdwb3J0Iiwic2V0U2Npc3NvciIsImRpc3Bvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZm92VG9ORENTY2FsZU9mZnNldCIsImZvdiIsInB4c2NhbGUiLCJsZWZ0VGFuIiwicmlnaHRUYW4iLCJweG9mZnNldCIsInB5c2NhbGUiLCJ1cFRhbiIsImRvd25UYW4iLCJweW9mZnNldCIsImZvdlBvcnRUb1Byb2plY3Rpb24iLCJyaWdodEhhbmRlZCIsInpOZWFyIiwiekZhciIsImhhbmRlZG5lc3NTY2FsZSIsIm1vYmoiLCJNYXRyaXg0IiwibSIsInNjYWxlQW5kT2Zmc2V0IiwidHJhbnNwb3NlIiwiREVHMlJBRCIsIlBJIiwiZm92UG9ydCIsInRhbiIsInVwRGVncmVlcyIsImRvd25EZWdyZWVzIiwibGVmdERlZ3JlZXMiLCJyaWdodERlZ3JlZXMiLCJXRUJWUiIsIm9uRGlzcGxheSIsIm1lc3NhZ2UiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImxlZnQiLCJ0b3AiLCJyaWdodCIsInpJbmRleCIsImFsaWduIiwiZXJyb3IiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJmb250U3R5bGUiLCJsaW5lSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJwYWRkaW5nIiwibWFyZ2luIiwiZGlzcGxheSIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiVEhSRUUiLCJidXR0b24iLCJib3R0b20iLCJib3JkZXIiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0Q29udGVudCIsIm9uY2xpY2siLCJWUk1vZHVsZSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImVmZmVjdCIsIm1hbmFnZXIiLCJkZWZpbmUiLCJSRVZJU0lPTiIsImNvbnNvbGUiLCJyZW5kZXJpbmciLCJ1c2UiLCJnZXQiLCJyZXNpemUiLCJhZGRDYWxsYmFjayIsImNoZWNrQXZhaWxhYmlsaXR5IiwiYm9keSIsImdldE1lc3NhZ2VDb250YWluZXIiLCJ2cmJ0biIsImdldEJ1dHRvbiIsImNsYXNzTmFtZSIsIlZSMk1vZHVsZSIsInZyIiwiZW5hYmxlZCIsImxvZyIsInNldERldmljZSIsIlZSQ29udHJvbHMiLCJvYmplY3QiLCJpbnRlbnNpdHkiLCJjb250cm9scyIsIlZSQ29udHJvbHNOYXRpdmUiLCJuYXRpdmUiLCJzdGFuZGluZyIsIkNvbnRyb2xzTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFXQSxBQU1PLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFXQyxRQUFYLEVBQXFCQyxPQUFyQixFQUErQjs7S0FFbERDLFNBQUosRUFBZUMsVUFBZjtLQUNJQyxrQkFBa0IsSUFBSUMsYUFBSixFQUF0QjtLQUNJQyxrQkFBa0IsSUFBSUQsYUFBSixFQUF0QjtLQUNJRSxXQUFKLEVBQWlCQyxXQUFqQjs7S0FFSUMsWUFBWSxJQUFoQjs7S0FFSyxpQkFBaUJDLE1BQXRCLEVBQStCOztjQUVsQixJQUFJQyxXQUFKLEVBQVo7OztVQUlRQyxhQUFULENBQXdCQyxRQUF4QixFQUFtQzs7ZUFFckJBLFFBQWI7O01BRUtBLFNBQVNDLE1BQVQsR0FBa0IsQ0FBdkIsRUFBMkI7O2VB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
