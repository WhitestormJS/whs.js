/* Built for whs v2.1.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('whs'), require('three-vrcontrols-module')) :
	typeof define === 'function' && define.amd ? define(['exports', 'whs', 'three-vrcontrols-module'], factory) :
	(factory((global.VRKit = global.VRKit || {}),global.WHS,global.VRControlsNative));
}(this, (function (exports,whs,VRControlsNative) { 'use strict';

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

    var controls = new VRControlsNative(object.native, onError);

    controls.standing = true;
    controls.scale = intensity;

    return possibleConstructorReturn(this, (VRControls.__proto__ || Object.getPrototypeOf(VRControls)).call(this, { controls: controls }));
  }

  return VRControls;
}(whs.ControlsModule);

exports.VRModule = VRModule;
exports.VRControls = VRControls;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1ZSRWZmZWN0LmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvdnIvV2ViVlIuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9WUktpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgZG1hcmNvcyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9kbWFyY29zXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tXG4gKlxuICogV2ViVlIgU3BlYzogaHR0cDovL21venZyLmdpdGh1Yi5pby93ZWJ2ci1zcGVjL3dlYnZyLmh0bWxcbiAqXG4gKiBGaXJlZm94OiBodHRwOi8vbW96dnIuY29tL2Rvd25sb2Fkcy9cbiAqIENocm9taXVtOiBodHRwczovL3dlYnZyLmluZm8vZ2V0LWNocm9tZVxuICpcbiAqL1xuXG5leHBvcnQgY29uc3QgVlJFZmZlY3QgPSBmdW5jdGlvbiAoIHJlbmRlcmVyLCBvbkVycm9yICkge1xuXG5cdHZhciB2ckRpc3BsYXksIHZyRGlzcGxheXM7XG5cdHZhciBleWVUcmFuc2xhdGlvbkwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgZXllVHJhbnNsYXRpb25SID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dmFyIHJlbmRlclJlY3RMLCByZW5kZXJSZWN0UjtcblxuXHR2YXIgZnJhbWVEYXRhID0gbnVsbDtcblxuXHRpZiAoICdWUkZyYW1lRGF0YScgaW4gd2luZG93ICkge1xuXG5cdFx0ZnJhbWVEYXRhID0gbmV3IFZSRnJhbWVEYXRhKCk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGdvdFZSRGlzcGxheXMoIGRpc3BsYXlzICkge1xuXG5cdFx0dnJEaXNwbGF5cyA9IGRpc3BsYXlzO1xuXG5cdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHR2ckRpc3BsYXkgPSBkaXNwbGF5c1sgMCBdO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCBvbkVycm9yICkgb25FcnJvciggJ0hNRCBub3QgYXZhaWxhYmxlJyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICkge1xuXG5cdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBnb3RWUkRpc3BsYXlzICkuY2F0Y2ggKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBVbmFibGUgdG8gZ2V0IFZSIERpc3BsYXlzJyApO1xuXG5cdFx0fSApO1xuXG5cdH1cblxuXHQvL1xuXG5cdHRoaXMuaXNQcmVzZW50aW5nID0gZmFsc2U7XG5cdHRoaXMuc2NhbGUgPSAxO1xuXG5cdHZhciBzY29wZSA9IHRoaXM7XG5cblx0dmFyIHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0dmFyIHJlbmRlcmVyVXBkYXRlU3R5bGUgPSBmYWxzZTtcblx0dmFyIHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblxuXHR0aGlzLmdldFZSRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB2ckRpc3BsYXk7XG5cblx0fTtcblxuXHR0aGlzLnNldFZSRGlzcGxheSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR2ckRpc3BsYXkgPSB2YWx1ZTtcblxuXHR9O1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5cyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBnZXRWUkRpc3BsYXlzKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4nICk7XG5cdFx0cmV0dXJuIHZyRGlzcGxheXM7XG5cblx0fTtcblxuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICkge1xuXG5cdFx0cmVuZGVyZXJTaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XG5cdFx0cmVuZGVyZXJVcGRhdGVTdHlsZSA9IHVwZGF0ZVN0eWxlO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggMSApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllUGFyYW1zTC5yZW5kZXJXaWR0aCAqIDIsIGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggcmVuZGVyZXJQaXhlbFJhdGlvICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0LCB1cGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0Ly8gZnVsbHNjcmVlblxuXG5cdHZhciBjYW52YXMgPSByZW5kZXJlci5kb21FbGVtZW50O1xuXHR2YXIgcmVxdWVzdEZ1bGxzY3JlZW47XG5cdHZhciBleGl0RnVsbHNjcmVlbjtcblx0dmFyIGZ1bGxzY3JlZW5FbGVtZW50O1xuXHR2YXIgZGVmYXVsdExlZnRCb3VuZHMgPSBbIDAuMCwgMC4wLCAwLjUsIDEuMCBdO1xuXHR2YXIgZGVmYXVsdFJpZ2h0Qm91bmRzID0gWyAwLjUsIDAuMCwgMC41LCAxLjAgXTtcblxuXHRmdW5jdGlvbiBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UoKSB7XG5cblx0XHR2YXIgd2FzUHJlc2VudGluZyA9IHNjb3BlLmlzUHJlc2VudGluZztcblx0XHRzY29wZS5pc1ByZXNlbnRpbmcgPSB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiB2ckRpc3BsYXkuaXNQcmVzZW50aW5nO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0dmFyIGV5ZVdpZHRoID0gZXllUGFyYW1zTC5yZW5kZXJXaWR0aDtcblx0XHRcdHZhciBleWVIZWlnaHQgPSBleWVQYXJhbXNMLnJlbmRlckhlaWdodDtcblxuXHRcdFx0aWYgKCAhd2FzUHJlc2VudGluZyApIHtcblxuXHRcdFx0XHRyZW5kZXJlclBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XG5cdFx0XHRcdHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNpemUoIGV5ZVdpZHRoICogMiwgZXllSGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCB3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHJlbmRlcmVyU2l6ZS53aWR0aCwgcmVuZGVyZXJTaXplLmhlaWdodCwgcmVuZGVyZXJVcGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0dGhpcy5zZXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCBib29sZWFuICkge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiAoIHJlc29sdmUsIHJlamVjdCApIHtcblxuXHRcdFx0aWYgKCB2ckRpc3BsYXkgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZWplY3QoIG5ldyBFcnJvciggJ05vIFZSIGhhcmR3YXJlIGZvdW5kLicgKSApO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgPT09IGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBib29sZWFuICkge1xuXG5cdFx0XHRcdHJlc29sdmUoIHZyRGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LmV4aXRQcmVzZW50KCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIHRydWUgKTtcblxuXHR9O1xuXG5cdHRoaXMuZXhpdFByZXNlbnQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGdWxsU2NyZWVuKCBmYWxzZSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGYgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRyZXR1cm4gdnJEaXNwbGF5LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGYgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGggKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIGggKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5zdWJtaXRGcmFtZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuc3VibWl0RnJhbWUoKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuYXV0b1N1Ym1pdEZyYW1lID0gdHJ1ZTtcblxuXHQvLyByZW5kZXJcblxuXHR2YXIgY2FtZXJhTCA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFMLmxheWVycy5lbmFibGUoIDEgKTtcblxuXHR2YXIgY2FtZXJhUiA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFSLmxheWVycy5lbmFibGUoIDIgKTtcblxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2YXIgYXV0b1VwZGF0ZSA9IHNjZW5lLmF1dG9VcGRhdGU7XG5cblx0XHRcdGlmICggYXV0b1VwZGF0ZSApIHtcblxuXHRcdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdFx0XHRzY2VuZS5hdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllUGFyYW1zUiA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAncmlnaHQnICk7XG5cblx0XHRcdGV5ZVRyYW5zbGF0aW9uTC5mcm9tQXJyYXkoIGV5ZVBhcmFtc0wub2Zmc2V0ICk7XG5cdFx0XHRleWVUcmFuc2xhdGlvblIuZnJvbUFycmF5KCBleWVQYXJhbXNSLm9mZnNldCApO1xuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHNjZW5lICkgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3QucmVuZGVyKCkgbm8gbG9uZ2VyIHN1cHBvcnRzIGFycmF5cy4gVXNlIG9iamVjdC5sYXllcnMgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHNjZW5lID0gc2NlbmVbIDAgXTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBXaGVuIHJlbmRlcmluZyB3ZSBkb24ndCBjYXJlIHdoYXQgdGhlIHJlY29tbWVuZGVkIHNpemUgaXMsIG9ubHkgd2hhdCB0aGUgYWN0dWFsIHNpemVcblx0XHRcdC8vIG9mIHRoZSBiYWNrYnVmZmVyIGlzLlxuXHRcdFx0dmFyIHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG5cdFx0XHR2YXIgbGF5ZXJzID0gdnJEaXNwbGF5LmdldExheWVycygpO1xuXHRcdFx0dmFyIGxlZnRCb3VuZHM7XG5cdFx0XHR2YXIgcmlnaHRCb3VuZHM7XG5cblx0XHRcdGlmICggbGF5ZXJzLmxlbmd0aCApIHtcblxuXHRcdFx0XHR2YXIgbGF5ZXIgPSBsYXllcnNbIDAgXTtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gbGF5ZXIubGVmdEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5sZWZ0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLmxlZnRCb3VuZHMgOiBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBsYXllci5yaWdodEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5yaWdodEJvdW5kcy5sZW5ndGggPT09IDQgPyBsYXllci5yaWdodEJvdW5kcyA6IGRlZmF1bHRSaWdodEJvdW5kcztcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gZGVmYXVsdExlZnRCb3VuZHM7XG5cdFx0XHRcdHJpZ2h0Qm91bmRzID0gZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlclJlY3RMID0ge1xuXHRcdFx0XHR4OiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMiBdICksXG5cdFx0XHRcdGhlaWdodDogTWF0aC5yb3VuZChzaXplLmhlaWdodCAqIGxlZnRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXHRcdFx0cmVuZGVyUmVjdFIgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiByaWdodEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDEgXSApLFxuXHRcdFx0XHR3aWR0aDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3NvclRlc3QgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggdHJ1ZSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggcmVuZGVyZXIuYXV0b0NsZWFyIHx8IGZvcmNlQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggY2FtZXJhTC5wb3NpdGlvbiwgY2FtZXJhTC5xdWF0ZXJuaW9uLCBjYW1lcmFMLnNjYWxlICk7XG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFSLnBvc2l0aW9uLCBjYW1lcmFSLnF1YXRlcm5pb24sIGNhbWVyYVIuc2NhbGUgKTtcblxuXHRcdFx0dmFyIHNjYWxlID0gdGhpcy5zY2FsZTtcblx0XHRcdGNhbWVyYUwudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvbkwsIHNjYWxlICk7XG5cdFx0XHRjYW1lcmFSLnRyYW5zbGF0ZU9uQXhpcyggZXllVHJhbnNsYXRpb25SLCBzY2FsZSApO1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheS5nZXRGcmFtZURhdGEgKSB7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmRlcHRoTmVhciA9IGNhbWVyYS5uZWFyO1xuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhGYXIgPSBjYW1lcmEuZmFyO1xuXG5cdFx0XHRcdHZyRGlzcGxheS5nZXRGcmFtZURhdGEoIGZyYW1lRGF0YSApO1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeC5lbGVtZW50cyA9IGZyYW1lRGF0YS5sZWZ0UHJvamVjdGlvbk1hdHJpeDtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLnJpZ2h0UHJvamVjdGlvbk1hdHJpeDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjYW1lcmFMLnByb2plY3Rpb25NYXRyaXggPSBmb3ZUb1Byb2plY3Rpb24oIGV5ZVBhcmFtc0wuZmllbGRPZlZpZXcsIHRydWUsIGNhbWVyYS5uZWFyLCBjYW1lcmEuZmFyICk7XG5cdFx0XHRcdGNhbWVyYVIucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zUi5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW5kZXIgbGVmdCBleWVcblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvciggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXG5cdFx0XHR9XG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmFMLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKTtcblxuXHRcdFx0Ly8gcmVuZGVyIHJpZ2h0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYVIsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IGZhbHNlO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvclRlc3QoIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUuYXV0b1N1Ym1pdEZyYW1lICkge1xuXG5cdFx0XHRcdHNjb3BlLnN1Ym1pdEZyYW1lKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0Ly8gUmVndWxhciByZW5kZXIgbW9kZSBpZiBub3QgSE1EXG5cblx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdH07XG5cblx0dGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgb25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlLCBmYWxzZSApO1xuXG5cdH07XG5cblx0Ly9cblxuXHRmdW5jdGlvbiBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKSB7XG5cblx0XHR2YXIgcHhzY2FsZSA9IDIuMCAvICggZm92LmxlZnRUYW4gKyBmb3YucmlnaHRUYW4gKTtcblx0XHR2YXIgcHhvZmZzZXQgPSAoIGZvdi5sZWZ0VGFuIC0gZm92LnJpZ2h0VGFuICkgKiBweHNjYWxlICogMC41O1xuXHRcdHZhciBweXNjYWxlID0gMi4wIC8gKCBmb3YudXBUYW4gKyBmb3YuZG93blRhbiApO1xuXHRcdHZhciBweW9mZnNldCA9ICggZm92LnVwVGFuIC0gZm92LmRvd25UYW4gKSAqIHB5c2NhbGUgKiAwLjU7XG5cdFx0cmV0dXJuIHsgc2NhbGU6IFsgcHhzY2FsZSwgcHlzY2FsZSBdLCBvZmZzZXQ6IFsgcHhvZmZzZXQsIHB5b2Zmc2V0IF0gfTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZm92UG9ydFRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHRyaWdodEhhbmRlZCA9IHJpZ2h0SGFuZGVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogcmlnaHRIYW5kZWQ7XG5cdFx0ek5lYXIgPSB6TmVhciA9PT0gdW5kZWZpbmVkID8gMC4wMSA6IHpOZWFyO1xuXHRcdHpGYXIgPSB6RmFyID09PSB1bmRlZmluZWQgPyAxMDAwMC4wIDogekZhcjtcblxuXHRcdHZhciBoYW5kZWRuZXNzU2NhbGUgPSByaWdodEhhbmRlZCA/IC0gMS4wIDogMS4wO1xuXG5cdFx0Ly8gc3RhcnQgd2l0aCBhbiBpZGVudGl0eSBtYXRyaXhcblx0XHR2YXIgbW9iaiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cdFx0dmFyIG0gPSBtb2JqLmVsZW1lbnRzO1xuXG5cdFx0Ly8gYW5kIHdpdGggc2NhbGUvb2Zmc2V0IGluZm8gZm9yIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3Jkc1xuXHRcdHZhciBzY2FsZUFuZE9mZnNldCA9IGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApO1xuXG5cdFx0Ly8gWCByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHRtWyAwICogNCArIDAgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAwIF07XG5cdFx0bVsgMCAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMCAqIDQgKyAyIF0gPSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbIDAgXSAqIGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAwICogNCArIDMgXSA9IDAuMDtcblxuXHRcdC8vIFkgcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG5cdFx0Ly8gWSBvZmZzZXQgaXMgbmVnYXRlZCBiZWNhdXNlIHRoaXMgcHJvaiBtYXRyaXggdHJhbnNmb3JtcyBmcm9tIHdvcmxkIGNvb3JkcyB3aXRoIFk9dXAsXG5cdFx0Ly8gYnV0IHRoZSBOREMgc2NhbGluZyBoYXMgWT1kb3duICh0aGFua3MgRDNEPylcblx0XHRtWyAxICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAxICogNCArIDEgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAxIF07XG5cdFx0bVsgMSAqIDQgKyAyIF0gPSAtIHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMSBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDEgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWiByZXN1bHQgKHVwIHRvIHRoZSBhcHApXG5cdFx0bVsgMiAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAyIF0gPSB6RmFyIC8gKCB6TmVhciAtIHpGYXIgKSAqIC0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDIgKiA0ICsgMyBdID0gKCB6RmFyICogek5lYXIgKSAvICggek5lYXIgLSB6RmFyICk7XG5cblx0XHQvLyBXIHJlc3VsdCAoPSBaIGluKVxuXHRcdG1bIDMgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMSBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMiBdID0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDMgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0bW9iai50cmFuc3Bvc2UoKTtcblxuXHRcdHJldHVybiBtb2JqO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG5cdFx0dmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cblx0XHR2YXIgZm92UG9ydCA9IHtcblx0XHRcdHVwVGFuOiBNYXRoLnRhbiggZm92LnVwRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGRvd25UYW46IE1hdGgudGFuKCBmb3YuZG93bkRlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRsZWZ0VGFuOiBNYXRoLnRhbiggZm92LmxlZnREZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0cmlnaHRUYW46IE1hdGgudGFuKCBmb3YucmlnaHREZWdyZWVzICogREVHMlJBRCApXG5cdFx0fTtcblxuXHRcdHJldHVybiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3ZQb3J0LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKTtcblxuXHR9XG5cbn07XG4iLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgTXVnZW44NyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9NdWdlbjg3XG4gKlxuICogQmFzZWQgb24gQHRvamlybydzIHZyLXNhbXBsZXMtdXRpbHMuanNcbiAqL1xuXG5leHBvcnQgY29uc3QgV0VCVlIgPSB7XG5cblx0aXNBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBpc0F2YWlsYWJsZSgpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSAuY2hlY2tBdmFpbGFiaWxpdHkoKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZDtcblxuXHR9LFxuXG5cdGNoZWNrQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG5cblx0XHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdFx0XHRcdFx0cmVqZWN0KCAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlamVjdCggJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHBzOi8vd2VidnIuaW5mb1wiPndlYnZyLmluZm88L2E+IGZvciBhc3Npc3RhbmNlLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH0sXG5cblx0Z2V0VlJEaXNwbGF5OiBmdW5jdGlvbiAoIG9uRGlzcGxheSApIHtcblxuXHRcdGlmICggJ2dldFZSRGlzcGxheXMnIGluIG5hdmlnYXRvciApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKVxuXHRcdFx0XHQudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblx0XHRcdFx0XHRvbkRpc3BsYXkoIGRpc3BsYXlzWyAwIF0gKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnV0VCVlI6IGdldE1lc3NhZ2UoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmdldE1lc3NhZ2VDb250YWluZXIoIG1lc3NhZ2UgKSBpbnN0ZWFkLicgKTtcblxuXHRcdHZhciBtZXNzYWdlO1xuXG5cdFx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdGlmICggZGlzcGxheXMubGVuZ3RoID09PSAwICkgbWVzc2FnZSA9ICdXZWJWUiBzdXBwb3J0ZWQsIGJ1dCBubyBWUkRpc3BsYXlzIGZvdW5kLic7XG5cblx0XHRcdH0gKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG1lc3NhZ2UgPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViVlIuIFNlZSA8YSBocmVmPVwiaHR0cDovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBtZXNzYWdlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnOTk5Jztcblx0XHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0XHRlcnJvci5zdHlsZS5saW5lSGVpZ2h0ID0gJzI2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0XHRlcnJvci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0XHRlcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZUNvbnRhaW5lcjogZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0Y29udGFpbmVyLmFsaWduID0gJ2NlbnRlcic7XG5cblx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdGVycm9yLnN0eWxlLm1hcmdpbiA9ICc1MHB4Jztcblx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGVycm9yICk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdH0sXG5cblx0Z2V0QnV0dG9uOiBmdW5jdGlvbiAoIGRpc3BsYXksIGNhbnZhcyApIHtcblxuXHRcdGlmICggJ1ZSRWZmZWN0JyBpbiBUSFJFRSAmJiBkaXNwbGF5IGluc3RhbmNlb2YgVEhSRUUuVlJFZmZlY3QgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdXZWJWUi5nZXRCdXR0b24oKSBub3cgZXhwZWN0cyBhIFZSRGlzcGxheS4nICk7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblxuXHRcdH1cblxuXHRcdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXHRcdGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0YnV0dG9uLnN0eWxlLmxlZnQgPSAnY2FsYyg1MCUgLSA1MHB4KSc7XG5cdFx0YnV0dG9uLnN0eWxlLmJvdHRvbSA9ICcyMHB4Jztcblx0XHRidXR0b24uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMCc7XG5cdFx0YnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnOHB4Jztcblx0XHRidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cdFx0YnV0dG9uLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRidXR0b24uc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0YnV0dG9uLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS56SW5kZXggPSAnOTk5JztcblxuXHRcdGlmICggZGlzcGxheSApIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ0VOVEVSIFZSJztcblx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGRpc3BsYXkuaXNQcmVzZW50aW5nID8gZGlzcGxheS5leGl0UHJlc2VudCgpIDogZGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gZGlzcGxheS5pc1ByZXNlbnRpbmcgPyAnRVhJVCBWUicgOiAnRU5URVIgVlInO1xuXG5cdFx0XHR9LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ05PIFZSIERJU1BMQVknO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbjtcblxuXHR9XG5cbn07XG4iLCJpbXBvcnQge0xvb3AsIENvbnRyb2xzTW9kdWxlfSBmcm9tICd3aHMnO1xuXG5pbXBvcnQge1ZSRWZmZWN0fSBmcm9tICcuL3ZyL1ZSRWZmZWN0JztcbmltcG9ydCBWUkNvbnRyb2xzTmF0aXZlIGZyb20gJ3RocmVlLXZyY29udHJvbHMtbW9kdWxlJztcbmltcG9ydCB7V0VCVlJ9IGZyb20gJy4vdnIvV2ViVlInO1xuXG5leHBvcnQgY2xhc3MgVlJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcbiAgICAgIG1lc3NhZ2U6IHRydWUsXG4gICAgICBidXR0b246IHRydWVcbiAgICB9KTtcblxuICAgIHRoaXMuc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICB0aGlzLmVmZmVjdCA9IG51bGw7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgndnInKTtcblxuICAgIGNvbnN0IHJlbmRlcmluZyA9IG1hbmFnZXIudXNlKCdyZW5kZXJpbmcnKTtcbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuXG4gICAgY29uc3QgcmVzaXplID0gbWFuYWdlci51c2UoJ3Jlc2l6ZScpO1xuXG4gICAgdGhpcy5lZmZlY3QgPSBuZXcgVlJFZmZlY3QocmVuZGVyZXIpO1xuXG4gICAgdGhpcy5zY2VuZSA9IG1hbmFnZXIuZ2V0KCdzY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gbWFuYWdlci5nZXQoJ2NhbWVyYScpO1xuXG4gICAgcmVuZGVyaW5nLmVmZmVjdCh0aGlzLmVmZmVjdCk7XG5cbiAgICAvLyBUT0RPOiBGaXggcmVzaXplLlxuXG4gICAgcmVzaXplLmFkZENhbGxiYWNrKCh3aWR0aCwgaGVpZ2h0KSA9PiB7XG4gICAgICB0aGlzLmVmZmVjdC5zZXRTaXplKCt3aWR0aCwgK2hlaWdodCk7XG4gICAgfSk7XG5cbiAgICAvLyBXRUJWUlxuICAgIGNvbnN0IHttZXNzYWdlLCBidXR0b259ID0gdGhpcy5wYXJhbXM7XG5cbiAgICBpZiAobWVzc2FnZSkgV0VCVlIuY2hlY2tBdmFpbGFiaWxpdHkoKS5jYXRjaChtZXNzYWdlID0+IHtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoV0VCVlIuZ2V0TWVzc2FnZUNvbnRhaW5lcihtZXNzYWdlKSk7XG5cdFx0fSk7XG5cbiAgICBpZiAoYnV0dG9uKSBXRUJWUi5nZXRWUkRpc3BsYXkoZGlzcGxheSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFdFQlZSLmdldEJ1dHRvbihkaXNwbGF5LCByZW5kZXJlci5kb21FbGVtZW50KSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSQ29udHJvbHMgZXh0ZW5kcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHtvYmplY3QsIG9uRXJyb3IsIGludGVuc2l0eX0pIHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBWUkNvbnRyb2xzTmF0aXZlKG9iamVjdC5uYXRpdmUsIG9uRXJyb3IpO1xuXG4gICAgY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgIGNvbnRyb2xzLnNjYWxlID0gaW50ZW5zaXR5O1xuXG4gICAgc3VwZXIoe2NvbnRyb2xzfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJWUkVmZmVjdCIsInJlbmRlcmVyIiwib25FcnJvciIsInZyRGlzcGxheSIsInZyRGlzcGxheXMiLCJleWVUcmFuc2xhdGlvbkwiLCJUSFJFRSIsIlZlY3RvcjMiLCJleWVUcmFuc2xhdGlvblIiLCJyZW5kZXJSZWN0TCIsInJlbmRlclJlY3RSIiwiZnJhbWVEYXRhIiwid2luZG93IiwiVlJGcmFtZURhdGEiLCJnb3RWUkRpc3BsYXlzIiwiZGlzcGxheXMiLCJsZW5ndGgiLCJuYXZpZ2F0b3IiLCJnZXRWUkRpc3BsYXlzIiwidGhlbiIsImNhdGNoIiwid2FybiIsImlzUHJlc2VudGluZyIsInNjYWxlIiwic2NvcGUiLCJyZW5kZXJlclNpemUiLCJnZXRTaXplIiwicmVuZGVyZXJVcGRhdGVTdHlsZSIsInJlbmRlcmVyUGl4ZWxSYXRpbyIsImdldFBpeGVsUmF0aW8iLCJnZXRWUkRpc3BsYXkiLCJzZXRWUkRpc3BsYXkiLCJ2YWx1ZSIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsInVwZGF0ZVN0eWxlIiwiZXllUGFyYW1zTCIsImdldEV5ZVBhcmFtZXRlcnMiLCJzZXRQaXhlbFJhdGlvIiwicmVuZGVyV2lkdGgiLCJyZW5kZXJIZWlnaHQiLCJjYW52YXMiLCJkb21FbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50IiwiZGVmYXVsdExlZnRCb3VuZHMiLCJkZWZhdWx0UmlnaHRCb3VuZHMiLCJvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UiLCJ3YXNQcmVzZW50aW5nIiwidW5kZWZpbmVkIiwiZXllV2lkdGgiLCJleWVIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RnVsbFNjcmVlbiIsImJvb2xlYW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwicmVxdWVzdFByZXNlbnQiLCJzb3VyY2UiLCJleGl0UHJlc2VudCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImgiLCJzdWJtaXRGcmFtZSIsImF1dG9TdWJtaXRGcmFtZSIsImNhbWVyYUwiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsImxheWVycyIsImVuYWJsZSIsImNhbWVyYVIiLCJyZW5kZXIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlclRhcmdldCIsImZvcmNlQ2xlYXIiLCJhdXRvVXBkYXRlIiwidXBkYXRlTWF0cml4V29ybGQiLCJleWVQYXJhbXNSIiwiZnJvbUFycmF5Iiwib2Zmc2V0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2l6ZSIsImdldExheWVycyIsImxlZnRCb3VuZHMiLCJyaWdodEJvdW5kcyIsImxheWVyIiwiTWF0aCIsInJvdW5kIiwic2V0UmVuZGVyVGFyZ2V0Iiwic2Npc3NvclRlc3QiLCJzZXRTY2lzc29yVGVzdCIsImF1dG9DbGVhciIsImNsZWFyIiwicGFyZW50IiwibWF0cml4V29ybGQiLCJkZWNvbXBvc2UiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJ0cmFuc2xhdGVPbkF4aXMiLCJnZXRGcmFtZURhdGEiLCJkZXB0aE5lYXIiLCJuZWFyIiwiZGVwdGhGYXIiLCJmYXIiLCJwcm9qZWN0aW9uTWF0cml4IiwiZWxlbWVudHMiLCJsZWZ0UHJvamVjdGlvbk1hdHJpeCIsInJpZ2h0UHJvamVjdGlvbk1hdHJpeCIsImZvdlRvUHJvamVjdGlvbiIsImZpZWxkT2ZWaWV3Iiwidmlld3BvcnQiLCJzZXQiLCJ4IiwieSIsInNjaXNzb3IiLCJzZXRWaWV3cG9ydCIsInNldFNjaXNzb3IiLCJkaXNwb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZvdlRvTkRDU2NhbGVPZmZzZXQiLCJmb3YiLCJweHNjYWxlIiwibGVmdFRhbiIsInJpZ2h0VGFuIiwicHhvZmZzZXQiLCJweXNjYWxlIiwidXBUYW4iLCJkb3duVGFuIiwicHlvZmZzZXQiLCJmb3ZQb3J0VG9Qcm9qZWN0aW9uIiwicmlnaHRIYW5kZWQiLCJ6TmVhciIsInpGYXIiLCJoYW5kZWRuZXNzU2NhbGUiLCJtb2JqIiwiTWF0cml4NCIsIm0iLCJzY2FsZUFuZE9mZnNldCIsInRyYW5zcG9zZSIsIkRFRzJSQUQiLCJQSSIsImZvdlBvcnQiLCJ0YW4iLCJ1cERlZ3JlZXMiLCJkb3duRGVncmVlcyIsImxlZnREZWdyZWVzIiwicmlnaHREZWdyZWVzIiwiV0VCVlIiLCJvbkRpc3BsYXkiLCJtZXNzYWdlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJ6SW5kZXgiLCJhbGlnbiIsImVycm9yIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwicGFkZGluZyIsIm1hcmdpbiIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImJ1dHRvbiIsImJvdHRvbSIsImJvcmRlciIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRDb250ZW50Iiwib25jbGljayIsIlZSTW9kdWxlIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiZWZmZWN0IiwibWFuYWdlciIsImRlZmluZSIsInJlbmRlcmluZyIsInVzZSIsImdldCIsInJlc2l6ZSIsImFkZENhbGxiYWNrIiwiY2hlY2tBdmFpbGFiaWxpdHkiLCJib2R5IiwiZ2V0TWVzc2FnZUNvbnRhaW5lciIsImdldEJ1dHRvbiIsIlZSQ29udHJvbHMiLCJvYmplY3QiLCJpbnRlbnNpdHkiLCJjb250cm9scyIsIlZSQ29udHJvbHNOYXRpdmUiLCJuYXRpdmUiLCJzdGFuZGluZyIsIkNvbnRyb2xzTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFXQSxBQUFPLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFXQyxRQUFYLEVBQXFCQyxPQUFyQixFQUErQjs7S0FFbERDLFNBQUosRUFBZUMsVUFBZjtLQUNJQyxrQkFBa0IsSUFBSUMsTUFBTUMsT0FBVixFQUF0QjtLQUNJQyxrQkFBa0IsSUFBSUYsTUFBTUMsT0FBVixFQUF0QjtLQUNJRSxXQUFKLEVBQWlCQyxXQUFqQjs7S0FFSUMsWUFBWSxJQUFoQjs7S0FFSyxpQkFBaUJDLE1BQXRCLEVBQStCOztjQUVsQixJQUFJQyxXQUFKLEVBQVo7OztVQUlRQyxhQUFULENBQXdCQyxRQUF4QixFQUFtQzs7ZUFFckJBLFFBQWI7O01BRUtBLFNBQVNDLE1BQVQsR0FBa0IsQ0FBdkIsRUFBMkI7O2VBRWRELFNBQVUsQ0FBVixDQUFa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
