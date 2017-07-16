/* Built for whs v2.1.3 */
import { ControlsModule } from 'whs';
import VRControlsNative from 'three-vrcontrols-module';

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
}(ControlsModule);

export { VRModule, VRControls };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9WUkVmZmVjdC5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1dlYlZSLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvVlJLaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIGRtYXJjb3MgLyBodHRwczovL2dpdGh1Yi5jb20vZG1hcmNvc1xuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICpcbiAqIFdlYlZSIFNwZWM6IGh0dHA6Ly9tb3p2ci5naXRodWIuaW8vd2VidnItc3BlYy93ZWJ2ci5odG1sXG4gKlxuICogRmlyZWZveDogaHR0cDovL21venZyLmNvbS9kb3dubG9hZHMvXG4gKiBDaHJvbWl1bTogaHR0cHM6Ly93ZWJ2ci5pbmZvL2dldC1jaHJvbWVcbiAqXG4gKi9cblxuZXhwb3J0IGNvbnN0IFZSRWZmZWN0ID0gZnVuY3Rpb24gKCByZW5kZXJlciwgb25FcnJvciApIHtcblxuXHR2YXIgdnJEaXNwbGF5LCB2ckRpc3BsYXlzO1xuXHR2YXIgZXllVHJhbnNsYXRpb25MID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dmFyIGV5ZVRyYW5zbGF0aW9uUiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciByZW5kZXJSZWN0TCwgcmVuZGVyUmVjdFI7XG5cblx0dmFyIGZyYW1lRGF0YSA9IG51bGw7XG5cblx0aWYgKCAnVlJGcmFtZURhdGEnIGluIHdpbmRvdyApIHtcblxuXHRcdGZyYW1lRGF0YSA9IG5ldyBWUkZyYW1lRGF0YSgpO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBnb3RWUkRpc3BsYXlzKCBkaXNwbGF5cyApIHtcblxuXHRcdHZyRGlzcGxheXMgPSBkaXNwbGF5cztcblxuXHRcdGlmICggZGlzcGxheXMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0dnJEaXNwbGF5ID0gZGlzcGxheXNbIDAgXTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggb25FcnJvciApIG9uRXJyb3IoICdITUQgbm90IGF2YWlsYWJsZScgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyApIHtcblxuXHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKCkudGhlbiggZ290VlJEaXNwbGF5cyApLmNhdGNoICggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WUkVmZmVjdDogVW5hYmxlIHRvIGdldCBWUiBEaXNwbGF5cycgKTtcblxuXHRcdH0gKTtcblxuXHR9XG5cblx0Ly9cblxuXHR0aGlzLmlzUHJlc2VudGluZyA9IGZhbHNlO1xuXHR0aGlzLnNjYWxlID0gMTtcblxuXHR2YXIgc2NvcGUgPSB0aGlzO1xuXG5cdHZhciByZW5kZXJlclNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG5cdHZhciByZW5kZXJlclVwZGF0ZVN0eWxlID0gZmFsc2U7XG5cdHZhciByZW5kZXJlclBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XG5cblx0dGhpcy5nZXRWUkRpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdnJEaXNwbGF5O1xuXG5cdH07XG5cblx0dGhpcy5zZXRWUkRpc3BsYXkgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0dnJEaXNwbGF5ID0gdmFsdWU7XG5cblx0fTtcblxuXHR0aGlzLmdldFZSRGlzcGxheXMgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WUkVmZmVjdDogZ2V0VlJEaXNwbGF5cygpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuJyApO1xuXHRcdHJldHVybiB2ckRpc3BsYXlzO1xuXG5cdH07XG5cblx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0LCB1cGRhdGVTdHlsZSApIHtcblxuXHRcdHJlbmRlcmVyU2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xuXHRcdHJlbmRlcmVyVXBkYXRlU3R5bGUgPSB1cGRhdGVTdHlsZTtcblxuXHRcdGlmICggc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2YXIgZXllUGFyYW1zTCA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAnbGVmdCcgKTtcblx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIDEgKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIGV5ZVBhcmFtc0wucmVuZGVyV2lkdGggKiAyLCBleWVQYXJhbXNMLnJlbmRlckhlaWdodCwgZmFsc2UgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHJlbmRlcmVyUGl4ZWxSYXRpbyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCwgdXBkYXRlU3R5bGUgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdC8vIGZ1bGxzY3JlZW5cblxuXHR2YXIgY2FudmFzID0gcmVuZGVyZXIuZG9tRWxlbWVudDtcblx0dmFyIHJlcXVlc3RGdWxsc2NyZWVuO1xuXHR2YXIgZXhpdEZ1bGxzY3JlZW47XG5cdHZhciBmdWxsc2NyZWVuRWxlbWVudDtcblx0dmFyIGRlZmF1bHRMZWZ0Qm91bmRzID0gWyAwLjAsIDAuMCwgMC41LCAxLjAgXTtcblx0dmFyIGRlZmF1bHRSaWdodEJvdW5kcyA9IFsgMC41LCAwLjAsIDAuNSwgMS4wIF07XG5cblx0ZnVuY3Rpb24gb25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlKCkge1xuXG5cdFx0dmFyIHdhc1ByZXNlbnRpbmcgPSBzY29wZS5pc1ByZXNlbnRpbmc7XG5cdFx0c2NvcGUuaXNQcmVzZW50aW5nID0gdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgJiYgdnJEaXNwbGF5LmlzUHJlc2VudGluZztcblxuXHRcdGlmICggc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2YXIgZXllUGFyYW1zTCA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAnbGVmdCcgKTtcblx0XHRcdHZhciBleWVXaWR0aCA9IGV5ZVBhcmFtc0wucmVuZGVyV2lkdGg7XG5cdFx0XHR2YXIgZXllSGVpZ2h0ID0gZXllUGFyYW1zTC5yZW5kZXJIZWlnaHQ7XG5cblx0XHRcdGlmICggIXdhc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdFx0cmVuZGVyZXJQaXhlbFJhdGlvID0gcmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpO1xuXHRcdFx0XHRyZW5kZXJlclNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggMSApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTaXplKCBleWVXaWR0aCAqIDIsIGV5ZUhlaWdodCwgZmFsc2UgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggd2FzUHJlc2VudGluZyApIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggcmVuZGVyZXJQaXhlbFJhdGlvICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCByZW5kZXJlclNpemUud2lkdGgsIHJlbmRlcmVyU2l6ZS5oZWlnaHQsIHJlbmRlcmVyVXBkYXRlU3R5bGUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgb25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlLCBmYWxzZSApO1xuXG5cdHRoaXMuc2V0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICggYm9vbGVhbiApIHtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24gKCByZXNvbHZlLCByZWplY3QgKSB7XG5cblx0XHRcdGlmICggdnJEaXNwbGF5ID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmVqZWN0KCBuZXcgRXJyb3IoICdObyBWUiBoYXJkd2FyZSBmb3VuZC4nICkgKTtcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUuaXNQcmVzZW50aW5nID09PSBib29sZWFuICkge1xuXG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggYm9vbGVhbiApIHtcblxuXHRcdFx0XHRyZXNvbHZlKCB2ckRpc3BsYXkucmVxdWVzdFByZXNlbnQoIFsgeyBzb3VyY2U6IGNhbnZhcyB9IF0gKSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlc29sdmUoIHZyRGlzcGxheS5leGl0UHJlc2VudCgpICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9O1xuXG5cdHRoaXMucmVxdWVzdFByZXNlbnQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGdWxsU2NyZWVuKCB0cnVlICk7XG5cblx0fTtcblxuXHR0aGlzLmV4aXRQcmVzZW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnVsbFNjcmVlbiggZmFsc2UgKTtcblxuXHR9O1xuXG5cdHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCBmICkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0cmV0dXJuIHZyRGlzcGxheS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGYgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmICk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCBoICkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0dnJEaXNwbGF5LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCBoICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIGggKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuc3VibWl0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICYmIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dnJEaXNwbGF5LnN1Ym1pdEZyYW1lKCk7XG5cblx0XHR9XG5cblx0fTtcblxuXHR0aGlzLmF1dG9TdWJtaXRGcmFtZSA9IHRydWU7XG5cblx0Ly8gcmVuZGVyXG5cblx0dmFyIGNhbWVyYUwgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcblx0Y2FtZXJhTC5sYXllcnMuZW5hYmxlKCAxICk7XG5cblx0dmFyIGNhbWVyYVIgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcblx0Y2FtZXJhUi5sYXllcnMuZW5hYmxlKCAyICk7XG5cblx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICYmIHNjb3BlLmlzUHJlc2VudGluZyApIHtcblxuXHRcdFx0dmFyIGF1dG9VcGRhdGUgPSBzY2VuZS5hdXRvVXBkYXRlO1xuXG5cdFx0XHRpZiAoIGF1dG9VcGRhdGUgKSB7XG5cblx0XHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblx0XHRcdFx0c2NlbmUuYXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0dmFyIGV5ZVBhcmFtc1IgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ3JpZ2h0JyApO1xuXG5cdFx0XHRleWVUcmFuc2xhdGlvbkwuZnJvbUFycmF5KCBleWVQYXJhbXNMLm9mZnNldCApO1xuXHRcdFx0ZXllVHJhbnNsYXRpb25SLmZyb21BcnJheSggZXllUGFyYW1zUi5vZmZzZXQgKTtcblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBzY2VuZSApICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0LnJlbmRlcigpIG5vIGxvbmdlciBzdXBwb3J0cyBhcnJheXMuIFVzZSBvYmplY3QubGF5ZXJzIGluc3RlYWQuJyApO1xuXHRcdFx0XHRzY2VuZSA9IHNjZW5lWyAwIF07XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gV2hlbiByZW5kZXJpbmcgd2UgZG9uJ3QgY2FyZSB3aGF0IHRoZSByZWNvbW1lbmRlZCBzaXplIGlzLCBvbmx5IHdoYXQgdGhlIGFjdHVhbCBzaXplXG5cdFx0XHQvLyBvZiB0aGUgYmFja2J1ZmZlciBpcy5cblx0XHRcdHZhciBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXHRcdFx0dmFyIGxheWVycyA9IHZyRGlzcGxheS5nZXRMYXllcnMoKTtcblx0XHRcdHZhciBsZWZ0Qm91bmRzO1xuXHRcdFx0dmFyIHJpZ2h0Qm91bmRzO1xuXG5cdFx0XHRpZiAoIGxheWVycy5sZW5ndGggKSB7XG5cblx0XHRcdFx0dmFyIGxheWVyID0gbGF5ZXJzWyAwIF07XG5cblx0XHRcdFx0bGVmdEJvdW5kcyA9IGxheWVyLmxlZnRCb3VuZHMgIT09IG51bGwgJiYgbGF5ZXIubGVmdEJvdW5kcy5sZW5ndGggPT09IDQgPyBsYXllci5sZWZ0Qm91bmRzIDogZGVmYXVsdExlZnRCb3VuZHM7XG5cdFx0XHRcdHJpZ2h0Qm91bmRzID0gbGF5ZXIucmlnaHRCb3VuZHMgIT09IG51bGwgJiYgbGF5ZXIucmlnaHRCb3VuZHMubGVuZ3RoID09PSA0ID8gbGF5ZXIucmlnaHRCb3VuZHMgOiBkZWZhdWx0UmlnaHRCb3VuZHM7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0bGVmdEJvdW5kcyA9IGRlZmF1bHRMZWZ0Qm91bmRzO1xuXHRcdFx0XHRyaWdodEJvdW5kcyA9IGRlZmF1bHRSaWdodEJvdW5kcztcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJSZWN0TCA9IHtcblx0XHRcdFx0eDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIGxlZnRCb3VuZHNbIDAgXSApLFxuXHRcdFx0XHR5OiBNYXRoLnJvdW5kKCBzaXplLmhlaWdodCAqIGxlZnRCb3VuZHNbIDEgXSApLFxuXHRcdFx0XHR3aWR0aDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIGxlZnRCb3VuZHNbIDIgXSApLFxuXHRcdFx0XHRoZWlnaHQ6IE1hdGgucm91bmQoc2l6ZS5oZWlnaHQgKiBsZWZ0Qm91bmRzWyAzIF0gKVxuXHRcdFx0fTtcblx0XHRcdHJlbmRlclJlY3RSID0ge1xuXHRcdFx0XHR4OiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogcmlnaHRCb3VuZHNbIDAgXSApLFxuXHRcdFx0XHR5OiBNYXRoLnJvdW5kKCBzaXplLmhlaWdodCAqIHJpZ2h0Qm91bmRzWyAxIF0gKSxcblx0XHRcdFx0d2lkdGg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiByaWdodEJvdW5kc1sgMiBdICksXG5cdFx0XHRcdGhlaWdodDogTWF0aC5yb3VuZChzaXplLmhlaWdodCAqIHJpZ2h0Qm91bmRzWyAzIF0gKVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCByZW5kZXJUYXJnZXQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3JUZXN0ID0gdHJ1ZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvclRlc3QoIHRydWUgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHJlbmRlcmVyLmF1dG9DbGVhciB8fCBmb3JjZUNsZWFyICkgcmVuZGVyZXIuY2xlYXIoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSBudWxsICkgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIGNhbWVyYUwucG9zaXRpb24sIGNhbWVyYUwucXVhdGVybmlvbiwgY2FtZXJhTC5zY2FsZSApO1xuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggY2FtZXJhUi5wb3NpdGlvbiwgY2FtZXJhUi5xdWF0ZXJuaW9uLCBjYW1lcmFSLnNjYWxlICk7XG5cblx0XHRcdHZhciBzY2FsZSA9IHRoaXMuc2NhbGU7XG5cdFx0XHRjYW1lcmFMLnRyYW5zbGF0ZU9uQXhpcyggZXllVHJhbnNsYXRpb25MLCBzY2FsZSApO1xuXHRcdFx0Y2FtZXJhUi50cmFuc2xhdGVPbkF4aXMoIGV5ZVRyYW5zbGF0aW9uUiwgc2NhbGUgKTtcblxuXHRcdFx0aWYgKCB2ckRpc3BsYXkuZ2V0RnJhbWVEYXRhICkge1xuXG5cdFx0XHRcdHZyRGlzcGxheS5kZXB0aE5lYXIgPSBjYW1lcmEubmVhcjtcblx0XHRcdFx0dnJEaXNwbGF5LmRlcHRoRmFyID0gY2FtZXJhLmZhcjtcblxuXHRcdFx0XHR2ckRpc3BsYXkuZ2V0RnJhbWVEYXRhKCBmcmFtZURhdGEgKTtcblxuXHRcdFx0XHRjYW1lcmFMLnByb2plY3Rpb25NYXRyaXguZWxlbWVudHMgPSBmcmFtZURhdGEubGVmdFByb2plY3Rpb25NYXRyaXg7XG5cdFx0XHRcdGNhbWVyYVIucHJvamVjdGlvbk1hdHJpeC5lbGVtZW50cyA9IGZyYW1lRGF0YS5yaWdodFByb2plY3Rpb25NYXRyaXg7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y2FtZXJhTC5wcm9qZWN0aW9uTWF0cml4ID0gZm92VG9Qcm9qZWN0aW9uKCBleWVQYXJhbXNMLmZpZWxkT2ZWaWV3LCB0cnVlLCBjYW1lcmEubmVhciwgY2FtZXJhLmZhciApO1xuXHRcdFx0XHRjYW1lcmFSLnByb2plY3Rpb25NYXRyaXggPSBmb3ZUb1Byb2plY3Rpb24oIGV5ZVBhcmFtc1IuZmllbGRPZlZpZXcsIHRydWUsIGNhbWVyYS5uZWFyLCBjYW1lcmEuZmFyICk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVuZGVyIGxlZnQgZXllXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yLnNldCggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFZpZXdwb3J0KCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3IoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblxuXHRcdFx0fVxuXHRcdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhTCwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICk7XG5cblx0XHRcdC8vIHJlbmRlciByaWdodCBleWVcblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvciggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXG5cdFx0XHR9XG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmFSLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKTtcblxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3NvclRlc3QgPSBmYWxzZTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNjaXNzb3JUZXN0KCBmYWxzZSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggYXV0b1VwZGF0ZSApIHtcblxuXHRcdFx0XHRzY2VuZS5hdXRvVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNjb3BlLmF1dG9TdWJtaXRGcmFtZSApIHtcblxuXHRcdFx0XHRzY29wZS5zdWJtaXRGcmFtZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdC8vIFJlZ3VsYXIgcmVuZGVyIG1vZGUgaWYgbm90IEhNRFxuXG5cdFx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKTtcblxuXHR9O1xuXG5cdHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIG9uVlJEaXNwbGF5UHJlc2VudENoYW5nZSwgZmFsc2UgKTtcblxuXHR9O1xuXG5cdC8vXG5cblx0ZnVuY3Rpb24gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICkge1xuXG5cdFx0dmFyIHB4c2NhbGUgPSAyLjAgLyAoIGZvdi5sZWZ0VGFuICsgZm92LnJpZ2h0VGFuICk7XG5cdFx0dmFyIHB4b2Zmc2V0ID0gKCBmb3YubGVmdFRhbiAtIGZvdi5yaWdodFRhbiApICogcHhzY2FsZSAqIDAuNTtcblx0XHR2YXIgcHlzY2FsZSA9IDIuMCAvICggZm92LnVwVGFuICsgZm92LmRvd25UYW4gKTtcblx0XHR2YXIgcHlvZmZzZXQgPSAoIGZvdi51cFRhbiAtIGZvdi5kb3duVGFuICkgKiBweXNjYWxlICogMC41O1xuXHRcdHJldHVybiB7IHNjYWxlOiBbIHB4c2NhbGUsIHB5c2NhbGUgXSwgb2Zmc2V0OiBbIHB4b2Zmc2V0LCBweW9mZnNldCBdIH07XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG5cdFx0cmlnaHRIYW5kZWQgPSByaWdodEhhbmRlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHJpZ2h0SGFuZGVkO1xuXHRcdHpOZWFyID0gek5lYXIgPT09IHVuZGVmaW5lZCA/IDAuMDEgOiB6TmVhcjtcblx0XHR6RmFyID0gekZhciA9PT0gdW5kZWZpbmVkID8gMTAwMDAuMCA6IHpGYXI7XG5cblx0XHR2YXIgaGFuZGVkbmVzc1NjYWxlID0gcmlnaHRIYW5kZWQgPyAtIDEuMCA6IDEuMDtcblxuXHRcdC8vIHN0YXJ0IHdpdGggYW4gaWRlbnRpdHkgbWF0cml4XG5cdFx0dmFyIG1vYmogPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXHRcdHZhciBtID0gbW9iai5lbGVtZW50cztcblxuXHRcdC8vIGFuZCB3aXRoIHNjYWxlL29mZnNldCBpbmZvIGZvciBub3JtYWxpemVkIGRldmljZSBjb29yZHNcblx0XHR2YXIgc2NhbGVBbmRPZmZzZXQgPSBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKTtcblxuXHRcdC8vIFggcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG5cdFx0bVsgMCAqIDQgKyAwIF0gPSBzY2FsZUFuZE9mZnNldC5zY2FsZVsgMCBdO1xuXHRcdG1bIDAgKiA0ICsgMSBdID0gMC4wO1xuXHRcdG1bIDAgKiA0ICsgMiBdID0gc2NhbGVBbmRPZmZzZXQub2Zmc2V0WyAwIF0gKiBoYW5kZWRuZXNzU2NhbGU7XG5cdFx0bVsgMCAqIDQgKyAzIF0gPSAwLjA7XG5cblx0XHQvLyBZIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuXHRcdC8vIFkgb2Zmc2V0IGlzIG5lZ2F0ZWQgYmVjYXVzZSB0aGlzIHByb2ogbWF0cml4IHRyYW5zZm9ybXMgZnJvbSB3b3JsZCBjb29yZHMgd2l0aCBZPXVwLFxuXHRcdC8vIGJ1dCB0aGUgTkRDIHNjYWxpbmcgaGFzIFk9ZG93biAodGhhbmtzIEQzRD8pXG5cdFx0bVsgMSAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMSAqIDQgKyAxIF0gPSBzY2FsZUFuZE9mZnNldC5zY2FsZVsgMSBdO1xuXHRcdG1bIDEgKiA0ICsgMiBdID0gLSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbIDEgXSAqIGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAxICogNCArIDMgXSA9IDAuMDtcblxuXHRcdC8vIFogcmVzdWx0ICh1cCB0byB0aGUgYXBwKVxuXHRcdG1bIDIgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDIgKiA0ICsgMSBdID0gMC4wO1xuXHRcdG1bIDIgKiA0ICsgMiBdID0gekZhciAvICggek5lYXIgLSB6RmFyICkgKiAtIGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAyICogNCArIDMgXSA9ICggekZhciAqIHpOZWFyICkgLyAoIHpOZWFyIC0gekZhciApO1xuXG5cdFx0Ly8gVyByZXN1bHQgKD0gWiBpbilcblx0XHRtWyAzICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAzICogNCArIDEgXSA9IDAuMDtcblx0XHRtWyAzICogNCArIDIgXSA9IGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAzICogNCArIDMgXSA9IDAuMDtcblxuXHRcdG1vYmoudHJhbnNwb3NlKCk7XG5cblx0XHRyZXR1cm4gbW9iajtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZm92VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuXHRcdHZhciBERUcyUkFEID0gTWF0aC5QSSAvIDE4MC4wO1xuXG5cdFx0dmFyIGZvdlBvcnQgPSB7XG5cdFx0XHR1cFRhbjogTWF0aC50YW4oIGZvdi51cERlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRkb3duVGFuOiBNYXRoLnRhbiggZm92LmRvd25EZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0bGVmdFRhbjogTWF0aC50YW4oIGZvdi5sZWZ0RGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdHJpZ2h0VGFuOiBNYXRoLnRhbiggZm92LnJpZ2h0RGVncmVlcyAqIERFRzJSQUQgKVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZm92UG9ydFRvUHJvamVjdGlvbiggZm92UG9ydCwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICk7XG5cblx0fVxuXG59O1xuIiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tXG4gKiBAYXV0aG9yIE11Z2VuODcgLyBodHRwczovL2dpdGh1Yi5jb20vTXVnZW44N1xuICpcbiAqIEJhc2VkIG9uIEB0b2ppcm8ncyB2ci1zYW1wbGVzLXV0aWxzLmpzXG4gKi9cblxuZXhwb3J0IGNvbnN0IFdFQlZSID0ge1xuXG5cdGlzQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdXRUJWUjogaXNBdmFpbGFibGUoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmNoZWNrQXZhaWxhYmlsaXR5KCkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICE9PSB1bmRlZmluZWQ7XG5cblx0fSxcblxuXHRjaGVja0F2YWlsYWJpbGl0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG5cdFx0XHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPT09IDAgKSB7XG5cblx0XHRcdFx0XHRcdHJlamVjdCggJ1dlYlZSIHN1cHBvcnRlZCwgYnV0IG5vIFZSRGlzcGxheXMgZm91bmQuJyApO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZWplY3QoICdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJWUi4gU2VlIDxhIGhyZWY9XCJodHRwczovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9LFxuXG5cdGdldFZSRGlzcGxheTogZnVuY3Rpb24gKCBvbkRpc3BsYXkgKSB7XG5cblx0XHRpZiAoICdnZXRWUkRpc3BsYXlzJyBpbiBuYXZpZ2F0b3IgKSB7XG5cblx0XHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKClcblx0XHRcdFx0LnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cdFx0XHRcdFx0b25EaXNwbGF5KCBkaXNwbGF5c1sgMCBdICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBnZXRNZXNzYWdlKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4gVXNlIC5nZXRNZXNzYWdlQ29udGFpbmVyKCBtZXNzYWdlICkgaW5zdGVhZC4nICk7XG5cblx0XHR2YXIgbWVzc2FnZTtcblxuXHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgKSB7XG5cblx0XHRcdG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKCkudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblxuXHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIG1lc3NhZ2UgPSAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nO1xuXG5cdFx0XHR9ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRtZXNzYWdlID0gJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHA6Ly93ZWJ2ci5pbmZvXCI+d2VidnIuaW5mbzwvYT4gZm9yIGFzc2lzdGFuY2UuJztcblxuXHRcdH1cblxuXHRcdGlmICggbWVzc2FnZSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS50b3AgPSAnMCc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUucmlnaHQgPSAnMCc7XG5cdFx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0XHRjb250YWluZXIuYWxpZ24gPSAnY2VudGVyJztcblxuXHRcdFx0dmFyIGVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0XHRlcnJvci5zdHlsZS5mb250U2l6ZSA9ICcxNnB4Jztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRcdGVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcblx0XHRcdGVycm9yLnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUubWFyZ2luID0gJzUwcHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXHRcdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZXJyb3IgKTtcblxuXHRcdFx0cmV0dXJuIGNvbnRhaW5lcjtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldE1lc3NhZ2VDb250YWluZXI6IGZ1bmN0aW9uICggbWVzc2FnZSApIHtcblxuXHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMCc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUucmlnaHQgPSAnMCc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5OTknO1xuXHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0dmFyIGVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRlcnJvci5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdGVycm9yLnN0eWxlLmxpbmVIZWlnaHQgPSAnMjZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdGVycm9yLnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdGVycm9yLnN0eWxlLnBhZGRpbmcgPSAnMTBweCAyMHB4Jztcblx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXHRcdGVycm9yLmlubmVySFRNTCA9IG1lc3NhZ2U7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcblxuXHR9LFxuXG5cdGdldEJ1dHRvbjogZnVuY3Rpb24gKCBkaXNwbGF5LCBjYW52YXMgKSB7XG5cblx0XHRpZiAoICdWUkVmZmVjdCcgaW4gVEhSRUUgJiYgZGlzcGxheSBpbnN0YW5jZW9mIFRIUkVFLlZSRWZmZWN0ICkge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCAnV2ViVlIuZ2V0QnV0dG9uKCkgbm93IGV4cGVjdHMgYSBWUkRpc3BsYXkuJyApO1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdidXR0b24nICk7XG5cblx0XHR9XG5cblx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblx0XHRidXR0b24uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdGJ1dHRvbi5zdHlsZS5sZWZ0ID0gJ2NhbGMoNTAlIC0gNTBweCknO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3R0b20gPSAnMjBweCc7XG5cdFx0YnV0dG9uLnN0eWxlLndpZHRoID0gJzEwMHB4Jztcblx0XHRidXR0b24uc3R5bGUuYm9yZGVyID0gJzAnO1xuXHRcdGJ1dHRvbi5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG5cdFx0YnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuXHRcdGJ1dHRvbi5zdHlsZS5jb2xvciA9ICcjZmZmJztcblx0XHRidXR0b24uc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRidXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG5cdFx0YnV0dG9uLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuXHRcdGJ1dHRvbi5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcblx0XHRidXR0b24uc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cblx0XHRpZiAoIGRpc3BsYXkgKSB7XG5cblx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdFTlRFUiBWUic7XG5cdFx0XHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRkaXNwbGF5LmlzUHJlc2VudGluZyA/IGRpc3BsYXkuZXhpdFByZXNlbnQoKSA6IGRpc3BsYXkucmVxdWVzdFByZXNlbnQoIFsgeyBzb3VyY2U6IGNhbnZhcyB9IF0gKTtcblxuXHRcdFx0fTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9IGRpc3BsYXkuaXNQcmVzZW50aW5nID8gJ0VYSVQgVlInIDogJ0VOVEVSIFZSJztcblxuXHRcdFx0fSwgZmFsc2UgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdOTyBWUiBESVNQTEFZJztcblxuXHRcdH1cblxuXHRcdHJldHVybiBidXR0b247XG5cblx0fVxuXG59O1xuIiwiaW1wb3J0IHtMb29wLCBDb250cm9sc01vZHVsZX0gZnJvbSAnd2hzJztcblxuaW1wb3J0IHtWUkVmZmVjdH0gZnJvbSAnLi92ci9WUkVmZmVjdCc7XG5pbXBvcnQgVlJDb250cm9sc05hdGl2ZSBmcm9tICd0aHJlZS12cmNvbnRyb2xzLW1vZHVsZSc7XG5pbXBvcnQge1dFQlZSfSBmcm9tICcuL3ZyL1dlYlZSJztcblxuZXhwb3J0IGNsYXNzIFZSTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7XG4gICAgICBtZXNzYWdlOiB0cnVlLFxuICAgICAgYnV0dG9uOiB0cnVlXG4gICAgfSk7XG5cbiAgICB0aGlzLnNjZW5lID0gbnVsbDtcbiAgICB0aGlzLmNhbWVyYSA9IG51bGw7XG4gICAgdGhpcy5lZmZlY3QgPSBudWxsO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3ZyJyk7XG5cbiAgICBjb25zdCByZW5kZXJpbmcgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJyk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcblxuICAgIGNvbnN0IHJlc2l6ZSA9IG1hbmFnZXIudXNlKCdyZXNpemUnKTtcblxuICAgIHRoaXMuZWZmZWN0ID0gbmV3IFZSRWZmZWN0KHJlbmRlcmVyKTtcblxuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHJlbmRlcmluZy5lZmZlY3QodGhpcy5lZmZlY3QpO1xuXG4gICAgLy8gVE9ETzogRml4IHJlc2l6ZS5cblxuICAgIHJlc2l6ZS5hZGRDYWxsYmFjaygod2lkdGgsIGhlaWdodCkgPT4ge1xuICAgICAgdGhpcy5lZmZlY3Quc2V0U2l6ZSgrd2lkdGgsICtoZWlnaHQpO1xuICAgIH0pO1xuXG4gICAgLy8gV0VCVlJcbiAgICBjb25zdCB7bWVzc2FnZSwgYnV0dG9ufSA9IHRoaXMucGFyYW1zO1xuXG4gICAgaWYgKG1lc3NhZ2UpIFdFQlZSLmNoZWNrQXZhaWxhYmlsaXR5KCkuY2F0Y2gobWVzc2FnZSA9PiB7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFdFQlZSLmdldE1lc3NhZ2VDb250YWluZXIobWVzc2FnZSkpO1xuXHRcdH0pO1xuXG4gICAgaWYgKGJ1dHRvbikgV0VCVlIuZ2V0VlJEaXNwbGF5KGRpc3BsYXkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChXRUJWUi5nZXRCdXR0b24oZGlzcGxheSwgcmVuZGVyZXIuZG9tRWxlbWVudCkpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUkNvbnRyb2xzIGV4dGVuZHMgQ29udHJvbHNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih7b2JqZWN0LCBvbkVycm9yLCBpbnRlbnNpdHl9KSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgVlJDb250cm9sc05hdGl2ZShvYmplY3QubmF0aXZlLCBvbkVycm9yKTtcblxuICAgIGNvbnRyb2xzLnN0YW5kaW5nID0gdHJ1ZTtcbiAgICBjb250cm9scy5zY2FsZSA9IGludGVuc2l0eTtcblxuICAgIHN1cGVyKHtjb250cm9sc30pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVlJFZmZlY3QiLCJyZW5kZXJlciIsIm9uRXJyb3IiLCJ2ckRpc3BsYXkiLCJ2ckRpc3BsYXlzIiwiZXllVHJhbnNsYXRpb25MIiwiVEhSRUUiLCJWZWN0b3IzIiwiZXllVHJhbnNsYXRpb25SIiwicmVuZGVyUmVjdEwiLCJyZW5kZXJSZWN0UiIsImZyYW1lRGF0YSIsIndpbmRvdyIsIlZSRnJhbWVEYXRhIiwiZ290VlJEaXNwbGF5cyIsImRpc3BsYXlzIiwibGVuZ3RoIiwibmF2aWdhdG9yIiwiZ2V0VlJEaXNwbGF5cyIsInRoZW4iLCJjYXRjaCIsIndhcm4iLCJpc1ByZXNlbnRpbmciLCJzY2FsZSIsInNjb3BlIiwicmVuZGVyZXJTaXplIiwiZ2V0U2l6ZSIsInJlbmRlcmVyVXBkYXRlU3R5bGUiLCJyZW5kZXJlclBpeGVsUmF0aW8iLCJnZXRQaXhlbFJhdGlvIiwiZ2V0VlJEaXNwbGF5Iiwic2V0VlJEaXNwbGF5IiwidmFsdWUiLCJzZXRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJ1cGRhdGVTdHlsZSIsImV5ZVBhcmFtc0wiLCJnZXRFeWVQYXJhbWV0ZXJzIiwic2V0UGl4ZWxSYXRpbyIsInJlbmRlcldpZHRoIiwicmVuZGVySGVpZ2h0IiwiY2FudmFzIiwiZG9tRWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxzY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsImRlZmF1bHRMZWZ0Qm91bmRzIiwiZGVmYXVsdFJpZ2h0Qm91bmRzIiwib25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlIiwid2FzUHJlc2VudGluZyIsInVuZGVmaW5lZCIsImV5ZVdpZHRoIiwiZXllSGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEZ1bGxTY3JlZW4iLCJib29sZWFuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsInJlcXVlc3RQcmVzZW50Iiwic291cmNlIiwiZXhpdFByZXNlbnQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJoIiwic3VibWl0RnJhbWUiLCJhdXRvU3VibWl0RnJhbWUiLCJjYW1lcmFMIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJsYXllcnMiLCJlbmFibGUiLCJjYW1lcmFSIiwicmVuZGVyIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJUYXJnZXQiLCJmb3JjZUNsZWFyIiwiYXV0b1VwZGF0ZSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwiZXllUGFyYW1zUiIsImZyb21BcnJheSIsIm9mZnNldCIsIkFycmF5IiwiaXNBcnJheSIsInNpemUiLCJnZXRMYXllcnMiLCJsZWZ0Qm91bmRzIiwicmlnaHRCb3VuZHMiLCJsYXllciIsIk1hdGgiLCJyb3VuZCIsInNldFJlbmRlclRhcmdldCIsInNjaXNzb3JUZXN0Iiwic2V0U2Npc3NvclRlc3QiLCJhdXRvQ2xlYXIiLCJjbGVhciIsInBhcmVudCIsIm1hdHJpeFdvcmxkIiwiZGVjb21wb3NlIiwicG9zaXRpb24iLCJxdWF0ZXJuaW9uIiwidHJhbnNsYXRlT25BeGlzIiwiZ2V0RnJhbWVEYXRhIiwiZGVwdGhOZWFyIiwibmVhciIsImRlcHRoRmFyIiwiZmFyIiwicHJvamVjdGlvbk1hdHJpeCIsImVsZW1lbnRzIiwibGVmdFByb2plY3Rpb25NYXRyaXgiLCJyaWdodFByb2plY3Rpb25NYXRyaXgiLCJmb3ZUb1Byb2plY3Rpb24iLCJmaWVsZE9mVmlldyIsInZpZXdwb3J0Iiwic2V0IiwieCIsInkiLCJzY2lzc29yIiwic2V0Vmlld3BvcnQiLCJzZXRTY2lzc29yIiwiZGlzcG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb3ZUb05EQ1NjYWxlT2Zmc2V0IiwiZm92IiwicHhzY2FsZSIsImxlZnRUYW4iLCJyaWdodFRhbiIsInB4b2Zmc2V0IiwicHlzY2FsZSIsInVwVGFuIiwiZG93blRhbiIsInB5b2Zmc2V0IiwiZm92UG9ydFRvUHJvamVjdGlvbiIsInJpZ2h0SGFuZGVkIiwiek5lYXIiLCJ6RmFyIiwiaGFuZGVkbmVzc1NjYWxlIiwibW9iaiIsIk1hdHJpeDQiLCJtIiwic2NhbGVBbmRPZmZzZXQiLCJ0cmFuc3Bvc2UiLCJERUcyUkFEIiwiUEkiLCJmb3ZQb3J0IiwidGFuIiwidXBEZWdyZWVzIiwiZG93bkRlZ3JlZXMiLCJsZWZ0RGVncmVlcyIsInJpZ2h0RGVncmVlcyIsIldFQlZSIiwib25EaXNwbGF5IiwibWVzc2FnZSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiekluZGV4IiwiYWxpZ24iLCJlcnJvciIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRTdHlsZSIsImxpbmVIZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInBhZGRpbmciLCJtYXJnaW4iLCJkaXNwbGF5IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJib3R0b20iLCJib3JkZXIiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0Q29udGVudCIsIm9uY2xpY2siLCJWUk1vZHVsZSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImVmZmVjdCIsIm1hbmFnZXIiLCJkZWZpbmUiLCJyZW5kZXJpbmciLCJ1c2UiLCJnZXQiLCJyZXNpemUiLCJhZGRDYWxsYmFjayIsImNoZWNrQXZhaWxhYmlsaXR5IiwiYm9keSIsImdldE1lc3NhZ2VDb250YWluZXIiLCJnZXRCdXR0b24iLCJWUkNvbnRyb2xzIiwib2JqZWN0IiwiaW50ZW5zaXR5IiwiY29udHJvbHMiLCJWUkNvbnRyb2xzTmF0aXZlIiwibmF0aXZlIiwic3RhbmRpbmciLCJDb250cm9sc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7OztBQVdBLEFBQU8sSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVdDLFFBQVgsRUFBcUJDLE9BQXJCLEVBQStCOztLQUVsREMsU0FBSixFQUFlQyxVQUFmO0tBQ0lDLGtCQUFrQixJQUFJQyxNQUFNQyxPQUFWLEVBQXRCO0tBQ0lDLGtCQUFrQixJQUFJRixNQUFNQyxPQUFWLEVBQXRCO0tBQ0lFLFdBQUosRUFBaUJDLFdBQWpCOztLQUVJQyxZQUFZLElBQWhCOztLQUVLLGlCQUFpQkMsTUFBdEIsRUFBK0I7O2NBRWxCLElBQUlDLFdBQUosRUFBWjs7O1VBSVFDLGFBQVQsQ0FBd0JDLFFBQXhCLEVBQW1DOztlQUVyQkEsUUFBYjs7TUFFS0EsU0FBU0MsTUFBVCxHQUFrQixDQUF2QixFQUEyQjs7ZUFFZEQsU0FBVSxDQUFWLENBQVo7R0FGRCxNQUlPOztPQUVEYixPQUFMLEVBQWVBLFFBQVMsbUJBQVQ7Ozs7S0FNWmUsVUFBVUMsYUFBZixFQUErQjs7WUFFcEJBLGFBQVYsR0FBMEJDLElBQTFCLENBQWdDTCxhQUFoQyxFQUFnRE0sS0FBaEQsQ0FBd0QsWUFBWTs7V0FFM0RDLElBQVIsQ0FBYywyQ0FBZDtHQUZEOzs7OztNQVVJQyxZQUFMLEdBQW9CLEtBQXBCO01BQ0tDLEtBQUwsR0FBYSxDQUFiOztLQUVJQyxRQUFRLElBQVo7O0tBRUlDLGVBQWV4QixTQUFTeUIsT0FBVCxFQUFuQjtLQUNJQyxzQkFBc0IsS0FBMUI7S0FDSUMscUJBQXFCM0IsU0FBUzRCLGFBQVQsRUFBekI7O01BRUtDLFlBQUwsR0FBb0IsWUFBWTs7U0FFeEIzQixTQUFQO0VBRkQ7O01BTUs0QixZQUFMLEdBQW9CLFVBQVdDLEtBQVgsRUFBbUI7O2NBRTFCQSxLQUFaO0VBRkQ7O01BTUtkLGFBQUwsR0FBcUIsWUFBWTs7VUFFeEJHLElBQVIsQ0FBYyxzREFBZDtTQUNPakIsVUFBUDtFQUhEOztNQU9LNkIsT0FBTCxHQUFlLFVBQVdDLEtBQVgsRUFBa0JDLE1BQWxCLEVBQTBCQyxXQUExQixFQUF3Qzs7aUJBRXZDLEVBQUVGLE9BQU9BLEtBQVQsRUFBZ0JDLFFBQVFBLE1BQXhCLEVBQWY7d0JBQ3NCQyxXQUF0Qjs7TUFFS1osTUFBTUYsWUFBWCxFQUEwQjs7T0FFckJlLGFBQWFsQyxVQUFVbUMsZ0JBQVYsQ0FBNEIsTUFBNUIsQ0FBakI7WUFDU0MsYUFBVCxDQUF3QixDQUF4QjtZQUNTTixPQUFULENBQWtCSSxXQUFXRyxXQUFYLEdBQXlCLENBQTNDLEVBQThDSCxXQUFXSSxZQUF6RCxFQUF1RSxLQUF2RTtHQUpELE1BTU87O1lBRUdGLGFBQVQsQ0FBd0JYLGtCQUF4QjtZQUNTSyxPQUFULENBQWtCQyxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUNDLFdBQWpDOztFQWRGOzs7O0tBc0JJTSxTQUFTekMsU0FBUzBDLFVBQXRCO0tBQ0lDLGlCQUFKO0tBQ0lDLGNBQUo7S0FDSUMsaUJBQUo7S0FDSUMsb0JBQW9CLENBQUUsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLEVBQWlCLEdBQWpCLENBQXhCO0tBQ0lDLHFCQUFxQixDQUFFLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixDQUF6Qjs7VUFFU0Msd0JBQVQsR0FBb0M7O01BRS9CQyxnQkFBZ0IxQixNQUFNRixZQUExQjtRQUNNQSxZQUFOLEdBQXFCbkIsY0FBY2dELFNBQWQsSUFBMkJoRCxVQUFVbUIsWUFBMUQ7O01BRUtFLE1BQU1GLFlBQVgsRUFBMEI7O09BRXJCZSxhQUFhbEMsVUFBVW1DLGdCQUFWLENBQTRCLE1BQTVCLENBQWpCO09BQ0ljLFdBQVdmLFdBQVdHLFdBQTFCO09BQ0lhLFlBQVloQixXQUFXSSxZQUEzQjs7T0FFSyxDQUFDUyxhQUFOLEVBQXNCOzt5QkFFQWpELFNBQVM0QixhQUFULEVBQXJCO21CQUNlNUIsU0FBU3lCLE9BQVQsRUFBZjs7YUFFU2EsYUFBVCxDQUF3QixDQUF4QjthQUNTTixPQUFULENBQWtCbUIsV0FBVyxDQUE3QixFQUFnQ0MsU0FBaEMsRUFBMkMsS0FBM0M7O0dBWkYsTUFnQk8sSUFBS0gsYUFBTCxFQUFxQjs7WUFFbEJYLGFBQVQsQ0FBd0JYLGtCQUF4QjtZQUNTSyxPQUFULENBQWtCUixhQUFhUyxLQUEvQixFQUFzQ1QsYUFBYVUsTUFBbkQsRUFBMkRSLG1CQUEzRDs7OztRQU1LMkIsZ0JBQVAsQ0FBeUIsd0JBQXpCLEVBQW1ETCx3QkFBbkQsRUFBNkUsS0FBN0U7O01BRUtNLGFBQUwsR0FBcUIsVUFBV0MsT0FBWCxFQUFxQjs7U0FFbEMsSUFBSUMsT0FBSixDQUFhLFVBQVdDLE9BQVgsRUFBb0JDLE1BQXBCLEVBQTZCOztPQUUzQ3hELGNBQWNnRCxTQUFuQixFQUErQjs7V0FFdEIsSUFBSVMsS0FBSixDQUFXLHVCQUFYLENBQVI7Ozs7T0FLSXBDLE1BQU1GLFlBQU4sS0FBdUJrQyxPQUE1QixFQUFzQzs7Ozs7O09BT2pDQSxPQUFMLEVBQWU7O1lBRUxyRCxVQUFVMEQsY0FBVixDQUEwQixDQUFFLEVBQUVDLFFBQVFwQixNQUFWLEVBQUYsQ0FBMUIsQ0FBVDtJQUZELE1BSU87O1lBRUd2QyxVQUFVNEQsV0FBVixFQUFUOztHQXRCSyxDQUFQO0VBRkQ7O01BZ0NLRixjQUFMLEdBQXNCLFlBQVk7O1NBRTFCLEtBQUtOLGFBQUwsQ0FBb0IsSUFBcEIsQ0FBUDtFQUZEOztNQU1LUSxXQUFMLEdBQW1CLFlBQVk7O1NBRXZCLEtBQUtSLGFBQUwsQ0FBb0IsS0FBcEIsQ0FBUDtFQUZEOztNQU1LUyxxQkFBTCxHQUE2QixVQUFXQyxDQUFYLEVBQWU7O01BRXRDOUQsY0FBY2dELFNBQW5CLEVBQStCOztVQUV2QmhELFVBQVU2RCxxQkFBVixDQUFpQ0MsQ0FBakMsQ0FBUDtHQUZELE1BSU87O1VBRUNyRCxPQUFPb0QscUJBQVAsQ0FBOEJDLENBQTlCLENBQVA7O0VBUkY7O01BY0tDLG9CQUFMLEdBQTRCLFVBQVdDLENBQVgsRUFBZTs7TUFFckNoRSxjQUFjZ0QsU0FBbkIsRUFBK0I7O2FBRXBCZSxvQkFBVixDQUFnQ0MsQ0FBaEM7R0FGRCxNQUlPOztVQUVDRCxvQkFBUCxDQUE2QkMsQ0FBN0I7O0VBUkY7O01BY0tDLFdBQUwsR0FBbUIsWUFBWTs7TUFFekJqRSxjQUFjZ0QsU0FBZCxJQUEyQjNCLE1BQU1GLFlBQXRDLEVBQXFEOzthQUUxQzhDLFdBQVY7O0VBSkY7O01BVUtDLGVBQUwsR0FBdUIsSUFBdkI7Ozs7S0FJSUMsVUFBVSxJQUFJaEUsTUFBTWlFLGlCQUFWLEVBQWQ7U0FDUUMsTUFBUixDQUFlQyxNQUFmLENBQXVCLENBQXZCOztLQUVJQyxVQUFVLElBQUlwRSxNQUFNaUUsaUJBQVYsRUFBZDtTQUNRQyxNQUFSLENBQWVDLE1BQWYsQ0FBdUIsQ0FBdkI7O01BRUtFLE1BQUwsR0FBYyxVQUFXQyxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsWUFBMUIsRUFBd0NDLFVBQXhDLEVBQXFEOztNQUU3RDVFLGFBQWFxQixNQUFNRixZQUF4QixFQUF1Qzs7T0FFbEMwRCxhQUFhSixNQUFNSSxVQUF2Qjs7T0FFS0EsVUFBTCxFQUFrQjs7VUFFWEMsaUJBQU47VUFDTUQsVUFBTixHQUFtQixLQUFuQjs7O09BSUczQyxhQUFhbEMsVUFBVW1DLGdCQUFWLENBQTRCLE1BQTVCLENBQWpCO09BQ0k0QyxhQUFhL0UsVUFBVW1DLGdCQUFWLENBQTRCLE9BQTVCLENBQWpCOzttQkFFZ0I2QyxTQUFoQixDQUEyQjlDLFdBQVcrQyxNQUF0QzttQkFDZ0JELFNBQWhCLENBQTJCRCxXQUFXRSxNQUF0Qzs7T0FFS0MsTUFBTUMsT0FBTixDQUFlVixLQUFmLENBQUwsRUFBOEI7O1lBRXJCdkQsSUFBUixDQUFjLCtFQUFkO1lBQ1F1RCxNQUFPLENBQVAsQ0FBUjs7Ozs7T0FNR1csT0FBT3RGLFNBQVN5QixPQUFULEVBQVg7T0FDSThDLFNBQVNyRSxVQUFVcUYsU0FBVixFQUFiO09BQ0lDLFVBQUo7T0FDSUMsV0FBSjs7T0FFS2xCLE9BQU94RCxNQUFaLEVBQXFCOztRQUVoQjJFLFFBQVFuQixPQUFRLENBQVIsQ0FBWjs7aUJBRWFtQixNQUFNRixVQUFOLEtBQXFCLElBQXJCLElBQTZCRSxNQUFNRixVQUFOLENBQWlCekUsTUFBakIsS0FBNEIsQ0FBekQsR0FBNkQyRSxNQUFNRixVQUFuRSxHQUFnRjFDLGlCQUE3RjtrQkFDYzRDLE1BQU1ELFdBQU4sS0FBc0IsSUFBdEIsSUFBOEJDLE1BQU1ELFdBQU4sQ0FBa0IxRSxNQUFsQixLQUE2QixDQUEzRCxHQUErRDJFLE1BQU1ELFdBQXJFLEdBQW1GMUMsa0JBQWpHO0lBTEQsTUFPTzs7aUJBRU9ELGlCQUFiO2tCQUNjQyxrQkFBZDs7O2lCQUlhO09BQ1Y0QyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF1RCxXQUFZLENBQVosQ0FBekIsQ0FEVTtPQUVWRyxLQUFLQyxLQUFMLENBQVlOLEtBQUtwRCxNQUFMLEdBQWNzRCxXQUFZLENBQVosQ0FBMUIsQ0FGVTtXQUdORyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF1RCxXQUFZLENBQVosQ0FBekIsQ0FITTtZQUlMRyxLQUFLQyxLQUFMLENBQVdOLEtBQUtwRCxNQUFMLEdBQWNzRCxXQUFZLENBQVosQ0FBekI7SUFKVDtpQkFNYztPQUNWRyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF3RCxZQUFhLENBQWIsQ0FBekIsQ0FEVTtPQUVWRSxLQUFLQyxLQUFMLENBQVlOLEtBQUtwRCxNQUFMLEdBQWN1RCxZQUFhLENBQWIsQ0FBMUIsQ0FGVTtXQUdORSxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF3RCxZQUFhLENBQWIsQ0FBekIsQ0FITTtZQUlMRSxLQUFLQyxLQUFMLENBQVdOLEtBQUtwRCxNQUFMLEdBQWN1RCxZQUFhLENBQWIsQ0FBekI7SUFKVDs7T0FPS1osWUFBTCxFQUFvQjs7YUFFVmdCLGVBQVQsQ0FBMEJoQixZQUExQjtpQkFDYWlCLFdBQWIsR0FBMkIsSUFBM0I7SUFIRCxNQUtPOzthQUVHRCxlQUFULENBQTBCLElBQTFCO2FBQ1NFLGNBQVQsQ0FBeUIsSUFBekI7OztPQUlJL0YsU0FBU2dHLFNBQVQsSUFBc0JsQixVQUEzQixFQUF3QzlFLFNBQVNpRyxLQUFUOztPQUVuQ3JCLE9BQU9zQixNQUFQLEtBQWtCLElBQXZCLEVBQThCdEIsT0FBT0ksaUJBQVA7O1VBRXZCbUIsV0FBUCxDQUFtQkMsU0FBbkIsQ0FBOEIvQixRQUFRZ0MsUUFBdEMsRUFBZ0RoQyxRQUFRaUMsVUFBeEQsRUFBb0VqQyxRQUFRL0MsS0FBNUU7VUFDTzZFLFdBQVAsQ0FBbUJDLFNBQW5CLENBQThCM0IsUUFBUTRCLFFBQXRDLEVBQWdENUIsUUFBUTZCLFVBQXhELEVBQW9FN0IsUUFBUW5ELEtBQTVFOztPQUVJQSxRQUFRLEtBQUtBLEtBQWpCO1dBQ1FpRixlQUFSLENBQXlCbkcsZUFBekIsRUFBMENrQixLQUExQztXQUNRaUYsZUFBUixDQUF5QmhHLGVBQXpCLEVBQTBDZSxLQUExQzs7T0FFS3BCLFVBQVVzRyxZQUFmLEVBQThCOztjQUVuQkMsU0FBVixHQUFzQjdCLE9BQU84QixJQUE3QjtjQUNVQyxRQUFWLEdBQXFCL0IsT0FBT2dDLEdBQTVCOztjQUVVSixZQUFWLENBQXdCOUYsU0FBeEI7O1lBRVFtRyxnQkFBUixDQUF5QkMsUUFBekIsR0FBb0NwRyxVQUFVcUcsb0JBQTlDO1lBQ1FGLGdCQUFSLENBQXlCQyxRQUF6QixHQUFvQ3BHLFVBQVVzRyxxQkFBOUM7SUFSRCxNQVVPOztZQUVFSCxnQkFBUixHQUEyQkksZ0JBQWlCN0UsV0FBVzhFLFdBQTVCLEVBQXlDLElBQXpDLEVBQStDdEMsT0FBTzhCLElBQXRELEVBQTREOUIsT0FBT2dDLEdBQW5FLENBQTNCO1lBQ1FDLGdCQUFSLEdBQTJCSSxnQkFBaUJoQyxXQUFXaUMsV0FBNUIsRUFBeUMsSUFBekMsRUFBK0N0QyxPQUFPOEIsSUFBdEQsRUFBNEQ5QixPQUFPZ0MsR0FBbkUsQ0FBM0I7Ozs7T0FLSS9CLFlBQUwsRUFBb0I7O2lCQUVOc0MsUUFBYixDQUFzQkMsR0FBdEIsQ0FBMkI1RyxZQUFZNkcsQ0FBdkMsRUFBMEM3RyxZQUFZOEcsQ0FBdEQsRUFBeUQ5RyxZQUFZeUIsS0FBckUsRUFBNEV6QixZQUFZMEIsTUFBeEY7aUJBQ2FxRixPQUFiLENBQXFCSCxHQUFyQixDQUEwQjVHLFlBQVk2RyxDQUF0QyxFQUF5QzdHLFlBQVk4RyxDQUFyRCxFQUF3RDlHLFlBQVl5QixLQUFwRSxFQUEyRXpCLFlBQVkwQixNQUF2RjtJQUhELE1BS087O2FBRUdzRixXQUFULENBQXNCaEgsWUFBWTZHLENBQWxDLEVBQXFDN0csWUFBWThHLENBQWpELEVBQW9EOUcsWUFBWXlCLEtBQWhFLEVBQXVFekIsWUFBWTBCLE1BQW5GO2FBQ1N1RixVQUFULENBQXFCakgsWUFBWTZHLENBQWpDLEVBQW9DN0csWUFBWThHLENBQWhELEVBQW1EOUcsWUFBWXlCLEtBQS9ELEVBQXNFekIsWUFBWTBCLE1BQWxGOztZQUdRd0MsTUFBVCxDQUFpQkMsS0FBakIsRUFBd0JOLE9BQXhCLEVBQWlDUSxZQUFqQyxFQUErQ0MsVUFBL0M7OztPQUdLRCxZQUFMLEVBQW9COztpQkFFTnNDLFFBQWIsQ0FBc0JDLEdBQXRCLENBQTJCM0csWUFBWTRHLENBQXZDLEVBQTBDNUcsWUFBWTZHLENBQXRELEVBQXlEN0csWUFBWXdCLEtBQXJFLEVBQTRFeEIsWUFBWXlCLE1BQXhGO2lCQUNhcUYsT0FBYixDQUFxQkgsR0FBckIsQ0FBMEIzRyxZQUFZNEcsQ0FBdEMsRUFBeUM1RyxZQUFZNkcsQ0FBckQsRUFBd0Q3RyxZQUFZd0IsS0FBcEUsRUFBMkV4QixZQUFZeUIsTUFBdkY7SUFIRCxNQUtPOzthQUVHc0YsV0FBVCxDQUFzQi9HLFlBQVk0RyxDQUFsQyxFQUFxQzVHLFlBQVk2RyxDQUFqRCxFQUFvRDdHLFlBQVl3QixLQUFoRSxFQUF1RXhCLFlBQVl5QixNQUFuRjthQUNTdUYsVUFBVCxDQUFxQmhILFlBQVk0RyxDQUFqQyxFQUFvQzVHLFlBQVk2RyxDQUFoRCxFQUFtRDdHLFlBQVl3QixLQUEvRCxFQUFzRXhCLFlBQVl5QixNQUFsRjs7WUFHUXdDLE1BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCRixPQUF4QixFQUFpQ0ksWUFBakMsRUFBK0NDLFVBQS9DOztPQUVLRCxZQUFMLEVBQW9COztpQkFFTnNDLFFBQWIsQ0FBc0JDLEdBQXRCLENBQTJCLENBQTNCLEVBQThCLENBQTlCLEVBQWlDOUIsS0FBS3JELEtBQXRDLEVBQTZDcUQsS0FBS3BELE1BQWxEO2lCQUNhcUYsT0FBYixDQUFxQkgsR0FBckIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0M5QixLQUFLckQsS0FBckMsRUFBNENxRCxLQUFLcEQsTUFBakQ7aUJBQ2E0RCxXQUFiLEdBQTJCLEtBQTNCO2FBQ1NELGVBQVQsQ0FBMEIsSUFBMUI7SUFMRCxNQU9POzthQUVHMkIsV0FBVCxDQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QmxDLEtBQUtyRCxLQUFqQyxFQUF3Q3FELEtBQUtwRCxNQUE3QzthQUNTNkQsY0FBVCxDQUF5QixLQUF6Qjs7O09BSUloQixVQUFMLEVBQWtCOztVQUVYQSxVQUFOLEdBQW1CLElBQW5COzs7T0FJSXhELE1BQU02QyxlQUFYLEVBQTZCOztVQUV0QkQsV0FBTjs7Ozs7Ozs7V0FVT08sTUFBVCxDQUFpQkMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDQyxZQUFoQyxFQUE4Q0MsVUFBOUM7RUFoS0Q7O01Bb0tLNEMsT0FBTCxHQUFlLFlBQVk7O1NBRW5CQyxtQkFBUCxDQUE0Qix3QkFBNUIsRUFBc0QzRSx3QkFBdEQsRUFBZ0YsS0FBaEY7RUFGRDs7OztVQVFTNEUsbUJBQVQsQ0FBOEJDLEdBQTlCLEVBQW9DOztNQUUvQkMsVUFBVSxPQUFRRCxJQUFJRSxPQUFKLEdBQWNGLElBQUlHLFFBQTFCLENBQWQ7TUFDSUMsV0FBVyxDQUFFSixJQUFJRSxPQUFKLEdBQWNGLElBQUlHLFFBQXBCLElBQWlDRixPQUFqQyxHQUEyQyxHQUExRDtNQUNJSSxVQUFVLE9BQVFMLElBQUlNLEtBQUosR0FBWU4sSUFBSU8sT0FBeEIsQ0FBZDtNQUNJQyxXQUFXLENBQUVSLElBQUlNLEtBQUosR0FBWU4sSUFBSU8sT0FBbEIsSUFBOEJGLE9BQTlCLEdBQXdDLEdBQXZEO1NBQ08sRUFBRTVHLE9BQU8sQ0FBRXdHLE9BQUYsRUFBV0ksT0FBWCxDQUFULEVBQStCL0MsUUFBUSxDQUFFOEMsUUFBRixFQUFZSSxRQUFaLENBQXZDLEVBQVA7OztVQUlRQyxtQkFBVCxDQUE4QlQsR0FBOUIsRUFBbUNVLFdBQW5DLEVBQWdEQyxLQUFoRCxFQUF1REMsSUFBdkQsRUFBOEQ7O2dCQUUvQ0YsZ0JBQWdCckYsU0FBaEIsR0FBNEIsSUFBNUIsR0FBbUNxRixXQUFqRDtVQUNRQyxVQUFVdEYsU0FBVixHQUFzQixJQUF0QixHQUE2QnNGLEtBQXJDO1NBQ09DLFNBQVN2RixTQUFULEdBQXFCLE9BQXJCLEdBQStCdUYsSUFBdEM7O01BRUlDLGtCQUFrQkgsY0FBYyxDQUFFLEdBQWhCLEdBQXNCLEdBQTVDOzs7TUFHSUksT0FBTyxJQUFJdEksTUFBTXVJLE9BQVYsRUFBWDtNQUNJQyxJQUFJRixLQUFLN0IsUUFBYjs7O01BR0lnQyxpQkFBaUJsQixvQkFBcUJDLEdBQXJCLENBQXJCOzs7SUFHRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCaUIsZUFBZXhILEtBQWYsQ0FBc0IsQ0FBdEIsQ0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQndILGVBQWUzRCxNQUFmLENBQXVCLENBQXZCLElBQTZCdUQsZUFBOUM7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCOzs7OztJQUtHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCSSxlQUFleEgsS0FBZixDQUFzQixDQUF0QixDQUFqQjtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsQ0FBRXdILGVBQWUzRCxNQUFmLENBQXVCLENBQXZCLENBQUYsR0FBK0J1RCxlQUFoRDtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7OztJQUdHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQkQsUUFBU0QsUUFBUUMsSUFBakIsSUFBMEIsQ0FBRUMsZUFBN0M7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQW1CRCxPQUFPRCxLQUFULElBQXFCQSxRQUFRQyxJQUE3QixDQUFqQjs7O0lBR0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQixHQUFqQjtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCQyxlQUFqQjtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7O09BRUtLLFNBQUw7O1NBRU9KLElBQVA7OztVQUlRMUIsZUFBVCxDQUEwQlksR0FBMUIsRUFBK0JVLFdBQS9CLEVBQTRDQyxLQUE1QyxFQUFtREMsSUFBbkQsRUFBMEQ7O01BRXJETyxVQUFVckQsS0FBS3NELEVBQUwsR0FBVSxLQUF4Qjs7TUFFSUMsVUFBVTtVQUNOdkQsS0FBS3dELEdBQUwsQ0FBVXRCLElBQUl1QixTQUFKLEdBQWdCSixPQUExQixDQURNO1lBRUpyRCxLQUFLd0QsR0FBTCxDQUFVdEIsSUFBSXdCLFdBQUosR0FBa0JMLE9BQTVCLENBRkk7WUFHSnJELEtBQUt3RCxHQUFMLENBQVV0QixJQUFJeUIsV0FBSixHQUFrQk4sT0FBNUIsQ0FISTthQUlIckQsS0FBS3dELEdBQUwsQ0FBVXRCLElBQUkwQixZQUFKLEdBQW1CUCxPQUE3QjtHQUpYOztTQU9PVixvQkFBcUJZLE9BQXJCLEVBQThCWCxXQUE5QixFQUEyQ0MsS0FBM0MsRUFBa0RDLElBQWxELENBQVA7O0NBaGRLOztBQ1hQOzs7Ozs7O0FBT0EsQUFBTyxJQUFNZSxRQUFROztjQUVQLHVCQUFZOztVQUVoQnBJLElBQVIsQ0FBYyw2RUFBZDtTQUNPSixVQUFVQyxhQUFWLEtBQTRCaUMsU0FBbkM7RUFMbUI7O29CQVNELDZCQUFZOztTQUV2QixJQUFJTSxPQUFKLENBQWEsVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBNEI7O09BRTFDMUMsVUFBVUMsYUFBVixLQUE0QmlDLFNBQWpDLEVBQTZDOztjQUVsQ2pDLGFBQVYsR0FBMEJDLElBQTFCLENBQWdDLFVBQVdKLFFBQVgsRUFBc0I7O1NBRWhEQSxTQUFTQyxNQUFULEtBQW9CLENBQXpCLEVBQTZCOzthQUVwQiwyQ0FBUjtNQUZELE1BSU87Ozs7S0FOUjtJQUZELE1BZ0JPOztXQUVFLHNHQUFSOztHQXBCSyxDQUFQO0VBWG1COztlQXVDTixzQkFBVzBJLFNBQVgsRUFBdUI7O01BRS9CLG1CQUFtQnpJLFNBQXhCLEVBQW9DOzthQUV6QkMsYUFBVixHQUNFQyxJQURGLENBQ1EsVUFBV0osUUFBWCxFQUFzQjtjQUNqQkEsU0FBVSxDQUFWLENBQVg7SUFGRjs7RUEzQ2tCOzthQW9EUixzQkFBWTs7VUFFZk0sSUFBUixDQUFjLHVGQUFkOztNQUVJc0ksT0FBSjs7TUFFSzFJLFVBQVVDLGFBQWYsRUFBK0I7O2FBRXBCQSxhQUFWLEdBQTBCQyxJQUExQixDQUFnQyxVQUFXSixRQUFYLEVBQXNCOztRQUVoREEsU0FBU0MsTUFBVCxLQUFvQixDQUF6QixFQUE2QjJJLFVBQVUsMkNBQVY7SUFGOUI7R0FGRCxNQVFPOzthQUVJLHFHQUFWOzs7TUFJSUEsWUFBWXhHLFNBQWpCLEVBQTZCOztPQUV4QnlHLFlBQVlDLFNBQVNDLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBaEI7YUFDVUMsS0FBVixDQUFnQnpELFFBQWhCLEdBQTJCLFVBQTNCO2FBQ1V5RCxLQUFWLENBQWdCQyxJQUFoQixHQUF1QixHQUF2QjthQUNVRCxLQUFWLENBQWdCRSxHQUFoQixHQUFzQixHQUF0QjthQUNVRixLQUFWLENBQWdCRyxLQUFoQixHQUF3QixHQUF4QjthQUNVSCxLQUFWLENBQWdCSSxNQUFoQixHQUF5QixLQUF6QjthQUNVQyxLQUFWLEdBQWtCLFFBQWxCOztPQUVJQyxRQUFRUixTQUFTQyxhQUFULENBQXdCLEtBQXhCLENBQVo7U0FDTUMsS0FBTixDQUFZTyxVQUFaLEdBQXlCLFlBQXpCO1NBQ01QLEtBQU4sQ0FBWVEsUUFBWixHQUF1QixNQUF2QjtTQUNNUixLQUFOLENBQVlTLFNBQVosR0FBd0IsUUFBeEI7U0FDTVQsS0FBTixDQUFZVSxVQUFaLEdBQXlCLE1BQXpCO1NBQ01WLEtBQU4sQ0FBWVcsZUFBWixHQUE4QixNQUE5QjtTQUNNWCxLQUFOLENBQVlZLEtBQVosR0FBb0IsTUFBcEI7U0FDTVosS0FBTixDQUFZYSxPQUFaLEdBQXNCLFdBQXRCO1NBQ01iLEtBQU4sQ0FBWWMsTUFBWixHQUFxQixNQUFyQjtTQUNNZCxLQUFOLENBQVllLE9BQVosR0FBc0IsY0FBdEI7U0FDTUMsU0FBTixHQUFrQnBCLE9BQWxCO2FBQ1VxQixXQUFWLENBQXVCWCxLQUF2Qjs7VUFFT1QsU0FBUDs7RUEvRmtCOztzQkFxR0MsNkJBQVdELE9BQVgsRUFBcUI7O01BRXJDQyxZQUFZQyxTQUFTQyxhQUFULENBQXdCLEtBQXhCLENBQWhCO1lBQ1VDLEtBQVYsQ0FBZ0J6RCxRQUFoQixHQUEyQixVQUEzQjtZQUNVeUQsS0FBVixDQUFnQkMsSUFBaEIsR0FBdUIsR0FBdkI7WUFDVUQsS0FBVixDQUFnQkUsR0FBaEIsR0FBc0IsR0FBdEI7WUFDVUYsS0FBVixDQUFnQkcsS0FBaEIsR0FBd0IsR0FBeEI7WUFDVUgsS0FBVixDQUFnQkksTUFBaEIsR0FBeUIsS0FBekI7WUFDVUMsS0FBVixHQUFrQixRQUFsQjs7TUFFSUMsUUFBUVIsU0FBU0MsYUFBVCxDQUF3QixLQUF4QixDQUFaO1FBQ01DLEtBQU4sQ0FBWU8sVUFBWixHQUF5QixZQUF6QjtRQUNNUCxLQUFOLENBQVlRLFFBQVosR0FBdUIsTUFBdkI7UUFDTVIsS0FBTixDQUFZUyxTQUFaLEdBQXdCLFFBQXhCO1FBQ01ULEtBQU4sQ0FBWVUsVUFBWixHQUF5QixNQUF6QjtRQUNNVixLQUFOLENBQVlXLGVBQVosR0FBOEIsTUFBOUI7UUFDTVgsS0FBTixDQUFZWSxLQUFaLEdBQW9CLE1BQXBCO1FBQ01aLEtBQU4sQ0FBWWEsT0FBWixHQUFzQixXQUF0QjtRQUNNYixLQUFOLENBQVljLE1BQVosR0FBcUIsTUFBckI7UUFDTWQsS0FBTixDQUFZZSxPQUFaLEdBQXNCLGNBQXRCO1FBQ01DLFNBQU4sR0FBa0JwQixPQUFsQjtZQUNVcUIsV0FBVixDQUF1QlgsS0FBdkI7O1NBRU9ULFNBQVA7RUE1SG1COztZQWdJVCxtQkFBV2tCLE9BQVgsRUFBb0JwSSxNQUFwQixFQUE2Qjs7TUFFbEMsY0FBY3BDLEtBQWQsSUFBdUJ3SyxtQkFBbUJ4SyxNQUFNTixRQUFyRCxFQUFnRTs7V0FFdkRxSyxLQUFSLENBQWUsNENBQWY7VUFDT1IsU0FBU0MsYUFBVCxDQUF3QixRQUF4QixDQUFQOzs7TUFJR21CLFNBQVNwQixTQUFTQyxhQUFULENBQXdCLFFBQXhCLENBQWI7U0FDT0MsS0FBUCxDQUFhekQsUUFBYixHQUF3QixVQUF4QjtTQUNPeUQsS0FBUCxDQUFhQyxJQUFiLEdBQW9CLGtCQUFwQjtTQUNPRCxLQUFQLENBQWFtQixNQUFiLEdBQXNCLE1BQXRCO1NBQ09uQixLQUFQLENBQWE3SCxLQUFiLEdBQXFCLE9BQXJCO1NBQ082SCxLQUFQLENBQWFvQixNQUFiLEdBQXNCLEdBQXRCO1NBQ09wQixLQUFQLENBQWFhLE9BQWIsR0FBdUIsS0FBdkI7U0FDT2IsS0FBUCxDQUFhcUIsTUFBYixHQUFzQixTQUF0QjtTQUNPckIsS0FBUCxDQUFhVyxlQUFiLEdBQStCLE1BQS9CO1NBQ09YLEtBQVAsQ0FBYVksS0FBYixHQUFxQixNQUFyQjtTQUNPWixLQUFQLENBQWFPLFVBQWIsR0FBMEIsWUFBMUI7U0FDT1AsS0FBUCxDQUFhUSxRQUFiLEdBQXdCLE1BQXhCO1NBQ09SLEtBQVAsQ0FBYVMsU0FBYixHQUF5QixRQUF6QjtTQUNPVCxLQUFQLENBQWFzQixTQUFiLEdBQXlCLFFBQXpCO1NBQ090QixLQUFQLENBQWFJLE1BQWIsR0FBc0IsS0FBdEI7O01BRUtXLE9BQUwsRUFBZTs7VUFFUFEsV0FBUCxHQUFxQixVQUFyQjtVQUNPQyxPQUFQLEdBQWlCLFlBQVk7O1lBRXBCakssWUFBUixHQUF1QndKLFFBQVEvRyxXQUFSLEVBQXZCLEdBQStDK0csUUFBUWpILGNBQVIsQ0FBd0IsQ0FBRSxFQUFFQyxRQUFRcEIsTUFBVixFQUFGLENBQXhCLENBQS9DO0lBRkQ7O1VBTU9ZLGdCQUFQLENBQXlCLHdCQUF6QixFQUFtRCxZQUFZOztXQUV2RGdJLFdBQVAsR0FBcUJSLFFBQVF4SixZQUFSLEdBQXVCLFNBQXZCLEdBQW1DLFVBQXhEO0lBRkQsRUFJRyxLQUpIO0dBVEQsTUFlTzs7VUFFQ2dLLFdBQVAsR0FBcUIsZUFBckI7OztTQUlNTCxNQUFQOzs7Q0E5S0s7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRE1PO3NCQUNjO1FBQWJDLE1BQWEsdUVBQUosRUFBSTs7O1NBQ2xCQSxNQUFMLEdBQWNDLE9BQU9DLE1BQVAsQ0FBY0YsTUFBZCxFQUFzQjtlQUN6QixJQUR5QjtjQUUxQjtLQUZJLENBQWQ7O1NBS0s3RyxLQUFMLEdBQWEsSUFBYjtTQUNLQyxNQUFMLEdBQWMsSUFBZDtTQUNLK0csTUFBTCxHQUFjLElBQWQ7Ozs7OzRCQUdNQyxVQUFTOzs7ZUFDUEMsTUFBUixDQUFlLElBQWY7O1VBRU1DLFlBQVlGLFNBQVFHLEdBQVIsQ0FBWSxXQUFaLENBQWxCO1VBQ00vTCxXQUFXNEwsU0FBUUksR0FBUixDQUFZLFVBQVosQ0FBakI7O1VBRU1DLFNBQVNMLFNBQVFHLEdBQVIsQ0FBWSxRQUFaLENBQWY7O1dBRUtKLE1BQUwsR0FBYyxJQUFJNUwsUUFBSixDQUFhQyxRQUFiLENBQWQ7O1dBRUsyRSxLQUFMLEdBQWFpSCxTQUFRSSxHQUFSLENBQVksT0FBWixDQUFiO1dBQ0twSCxNQUFMLEdBQWNnSCxTQUFRSSxHQUFSLENBQVksUUFBWixDQUFkOztnQkFFVUwsTUFBVixDQUFpQixLQUFLQSxNQUF0Qjs7OzthQUlPTyxXQUFQLENBQW1CLFVBQUNqSyxLQUFELEVBQVFDLE1BQVIsRUFBbUI7Y0FDL0J5SixNQUFMLENBQVkzSixPQUFaLENBQW9CLENBQUNDLEtBQXJCLEVBQTRCLENBQUNDLE1BQTdCO09BREY7OztvQkFLMEIsS0FBS3NKLE1BdEJoQjtVQXNCUjlCLE9BdEJRLFdBc0JSQSxPQXRCUTtVQXNCQ3NCLE1BdEJELFdBc0JDQSxNQXRCRDs7O1VBd0JYdEIsT0FBSixFQUFhRixNQUFNMkMsaUJBQU4sR0FBMEJoTCxLQUExQixDQUFnQyxtQkFBVztpQkFDaERpTCxJQUFULENBQWNyQixXQUFkLENBQTBCdkIsTUFBTTZDLG1CQUFOLENBQTBCM0MsT0FBMUIsQ0FBMUI7T0FEYzs7VUFJVHNCLE1BQUosRUFBWXhCLE1BQU0zSCxZQUFOLENBQW1CLG1CQUFXO2lCQUMvQnVLLElBQVQsQ0FBY3JCLFdBQWQsQ0FBMEJ2QixNQUFNOEMsU0FBTixDQUFnQnpCLE9BQWhCLEVBQXlCN0ssU0FBUzBDLFVBQWxDLENBQTFCO09BRFU7Ozs7OztJQU1INkosVUFBYjs7OzRCQUM0QztRQUE3QkMsTUFBNkIsUUFBN0JBLE1BQTZCO1FBQXJCdk0sT0FBcUIsUUFBckJBLE9BQXFCO1FBQVp3TSxTQUFZLFFBQVpBLFNBQVk7OztRQUNsQ0MsV0FBVyxJQUFJQyxnQkFBSixDQUFxQkgsT0FBT0ksTUFBNUIsRUFBb0MzTSxPQUFwQyxDQUFqQjs7YUFFUzRNLFFBQVQsR0FBb0IsSUFBcEI7YUFDU3ZMLEtBQVQsR0FBaUJtTCxTQUFqQjs7a0hBRU0sRUFBQ0Msa0JBQUQsRUFOa0M7Ozs7RUFEWkksY0FBaEM7Ozs7In0=
