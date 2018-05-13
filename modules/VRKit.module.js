/* Built for whs v2.1.9 */
import { ControlsModule } from 'whs';
import { Matrix4, PerspectiveCamera, REVISION, Vector3 } from 'three';
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
	var eyeTranslationL = new Vector3();
	var eyeTranslationR = new Vector3();
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

	var cameraL = new PerspectiveCamera();
	cameraL.layers.enable(1);

	var cameraR = new PerspectiveCamera();
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
		var mobj = new Matrix4();
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

    var controls = new VRControlsNative(object.native, onError);

    controls.standing = true;
    controls.scale = intensity;

    return possibleConstructorReturn(this, (VRControls.__proto__ || Object.getPrototypeOf(VRControls)).call(this, { controls: controls }));
  }

  return VRControls;
}(ControlsModule);

export { WEBVR, VRModule, VR2Module, VRControls };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJLaXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS92ci9WUkVmZmVjdC5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL3ZyL1dlYlZSLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvVlJLaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIGRtYXJjb3MgLyBodHRwczovL2dpdGh1Yi5jb20vZG1hcmNvc1xuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbVxuICpcbiAqIFdlYlZSIFNwZWM6IGh0dHA6Ly9tb3p2ci5naXRodWIuaW8vd2VidnItc3BlYy93ZWJ2ci5odG1sXG4gKlxuICogRmlyZWZveDogaHR0cDovL21venZyLmNvbS9kb3dubG9hZHMvXG4gKiBDaHJvbWl1bTogaHR0cHM6Ly93ZWJ2ci5pbmZvL2dldC1jaHJvbWVcbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgVmVjdG9yMyxcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIE1hdHJpeDRcbn0gZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY29uc3QgVlJFZmZlY3QgPSBmdW5jdGlvbiAoIHJlbmRlcmVyLCBvbkVycm9yICkge1xuXG5cdHZhciB2ckRpc3BsYXksIHZyRGlzcGxheXM7XG5cdHZhciBleWVUcmFuc2xhdGlvbkwgPSBuZXcgVmVjdG9yMygpO1xuXHR2YXIgZXllVHJhbnNsYXRpb25SID0gbmV3IFZlY3RvcjMoKTtcblx0dmFyIHJlbmRlclJlY3RMLCByZW5kZXJSZWN0UjtcblxuXHR2YXIgZnJhbWVEYXRhID0gbnVsbDtcblxuXHRpZiAoICdWUkZyYW1lRGF0YScgaW4gd2luZG93ICkge1xuXG5cdFx0ZnJhbWVEYXRhID0gbmV3IFZSRnJhbWVEYXRhKCk7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGdvdFZSRGlzcGxheXMoIGRpc3BsYXlzICkge1xuXG5cdFx0dnJEaXNwbGF5cyA9IGRpc3BsYXlzO1xuXG5cdFx0aWYgKCBkaXNwbGF5cy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHR2ckRpc3BsYXkgPSBkaXNwbGF5c1sgMCBdO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCBvbkVycm9yICkgb25FcnJvciggJ0hNRCBub3QgYXZhaWxhYmxlJyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRpZiAoIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzICkge1xuXG5cdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBnb3RWUkRpc3BsYXlzICkuY2F0Y2ggKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBVbmFibGUgdG8gZ2V0IFZSIERpc3BsYXlzJyApO1xuXG5cdFx0fSApO1xuXG5cdH1cblxuXHQvL1xuXG5cdHRoaXMuaXNQcmVzZW50aW5nID0gZmFsc2U7XG5cdHRoaXMuc2NhbGUgPSAxO1xuXG5cdHZhciBzY29wZSA9IHRoaXM7XG5cblx0dmFyIHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblx0dmFyIHJlbmRlcmVyVXBkYXRlU3R5bGUgPSBmYWxzZTtcblx0dmFyIHJlbmRlcmVyUGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcblxuXHR0aGlzLmdldFZSRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB2ckRpc3BsYXk7XG5cblx0fTtcblxuXHR0aGlzLnNldFZSRGlzcGxheSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR2ckRpc3BsYXkgPSB2YWx1ZTtcblxuXHR9O1xuXG5cdHRoaXMuZ2V0VlJEaXNwbGF5cyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZSRWZmZWN0OiBnZXRWUkRpc3BsYXlzKCkgaXMgYmVpbmcgZGVwcmVjYXRlZC4nICk7XG5cdFx0cmV0dXJuIHZyRGlzcGxheXM7XG5cblx0fTtcblxuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQsIHVwZGF0ZVN0eWxlICkge1xuXG5cdFx0cmVuZGVyZXJTaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XG5cdFx0cmVuZGVyZXJVcGRhdGVTdHlsZSA9IHVwZGF0ZVN0eWxlO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggMSApO1xuXHRcdFx0cmVuZGVyZXIuc2V0U2l6ZSggZXllUGFyYW1zTC5yZW5kZXJXaWR0aCAqIDIsIGV5ZVBhcmFtc0wucmVuZGVySGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggcmVuZGVyZXJQaXhlbFJhdGlvICk7XG5cdFx0XHRyZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0LCB1cGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0Ly8gZnVsbHNjcmVlblxuXG5cdHZhciBjYW52YXMgPSByZW5kZXJlci5kb21FbGVtZW50O1xuXHR2YXIgcmVxdWVzdEZ1bGxzY3JlZW47XG5cdHZhciBleGl0RnVsbHNjcmVlbjtcblx0dmFyIGZ1bGxzY3JlZW5FbGVtZW50O1xuXHR2YXIgZGVmYXVsdExlZnRCb3VuZHMgPSBbIDAuMCwgMC4wLCAwLjUsIDEuMCBdO1xuXHR2YXIgZGVmYXVsdFJpZ2h0Qm91bmRzID0gWyAwLjUsIDAuMCwgMC41LCAxLjAgXTtcblxuXHRmdW5jdGlvbiBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UoKSB7XG5cblx0XHR2YXIgd2FzUHJlc2VudGluZyA9IHNjb3BlLmlzUHJlc2VudGluZztcblx0XHRzY29wZS5pc1ByZXNlbnRpbmcgPSB2ckRpc3BsYXkgIT09IHVuZGVmaW5lZCAmJiB2ckRpc3BsYXkuaXNQcmVzZW50aW5nO1xuXG5cdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgKSB7XG5cblx0XHRcdHZhciBleWVQYXJhbXNMID0gdnJEaXNwbGF5LmdldEV5ZVBhcmFtZXRlcnMoICdsZWZ0JyApO1xuXHRcdFx0dmFyIGV5ZVdpZHRoID0gZXllUGFyYW1zTC5yZW5kZXJXaWR0aDtcblx0XHRcdHZhciBleWVIZWlnaHQgPSBleWVQYXJhbXNMLnJlbmRlckhlaWdodDtcblxuXHRcdFx0aWYgKCAhd2FzUHJlc2VudGluZyApIHtcblxuXHRcdFx0XHRyZW5kZXJlclBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XG5cdFx0XHRcdHJlbmRlcmVyU2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCAxICk7XG5cdFx0XHRcdHJlbmRlcmVyLnNldFNpemUoIGV5ZVdpZHRoICogMiwgZXllSGVpZ2h0LCBmYWxzZSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCB3YXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKCByZW5kZXJlclBpeGVsUmF0aW8gKTtcblx0XHRcdHJlbmRlcmVyLnNldFNpemUoIHJlbmRlcmVyU2l6ZS53aWR0aCwgcmVuZGVyZXJTaXplLmhlaWdodCwgcmVuZGVyZXJVcGRhdGVTdHlsZSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UsIGZhbHNlICk7XG5cblx0dGhpcy5zZXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCBib29sZWFuICkge1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiAoIHJlc29sdmUsIHJlamVjdCApIHtcblxuXHRcdFx0aWYgKCB2ckRpc3BsYXkgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZWplY3QoIG5ldyBFcnJvciggJ05vIFZSIGhhcmR3YXJlIGZvdW5kLicgKSApO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzY29wZS5pc1ByZXNlbnRpbmcgPT09IGJvb2xlYW4gKSB7XG5cblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBib29sZWFuICkge1xuXG5cdFx0XHRcdHJlc29sdmUoIHZyRGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVzb2x2ZSggdnJEaXNwbGF5LmV4aXRQcmVzZW50KCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0UHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnNldEZ1bGxTY3JlZW4oIHRydWUgKTtcblxuXHR9O1xuXG5cdHRoaXMuZXhpdFByZXNlbnQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGdWxsU2NyZWVuKCBmYWxzZSApO1xuXG5cdH07XG5cblx0dGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGYgKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRyZXR1cm4gdnJEaXNwbGF5LnJlcXVlc3RBbmltYXRpb25GcmFtZSggZiApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGYgKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoIGggKSB7XG5cblx0XHRpZiAoIHZyRGlzcGxheSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIGggKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggaCApO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5zdWJtaXRGcmFtZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICggdnJEaXNwbGF5ICE9PSB1bmRlZmluZWQgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2ckRpc3BsYXkuc3VibWl0RnJhbWUoKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuYXV0b1N1Ym1pdEZyYW1lID0gdHJ1ZTtcblxuXHQvLyByZW5kZXJcblxuXHR2YXIgY2FtZXJhTCA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFMLmxheWVycy5lbmFibGUoIDEgKTtcblxuXHR2YXIgY2FtZXJhUiA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpO1xuXHRjYW1lcmFSLmxheWVycy5lbmFibGUoIDIgKTtcblxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgcmVuZGVyVGFyZ2V0LCBmb3JjZUNsZWFyICkge1xuXG5cdFx0aWYgKCB2ckRpc3BsYXkgJiYgc2NvcGUuaXNQcmVzZW50aW5nICkge1xuXG5cdFx0XHR2YXIgYXV0b1VwZGF0ZSA9IHNjZW5lLmF1dG9VcGRhdGU7XG5cblx0XHRcdGlmICggYXV0b1VwZGF0ZSApIHtcblxuXHRcdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdFx0XHRzY2VuZS5hdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIGV5ZVBhcmFtc0wgPSB2ckRpc3BsYXkuZ2V0RXllUGFyYW1ldGVycyggJ2xlZnQnICk7XG5cdFx0XHR2YXIgZXllUGFyYW1zUiA9IHZyRGlzcGxheS5nZXRFeWVQYXJhbWV0ZXJzKCAncmlnaHQnICk7XG5cblx0XHRcdGV5ZVRyYW5zbGF0aW9uTC5mcm9tQXJyYXkoIGV5ZVBhcmFtc0wub2Zmc2V0ICk7XG5cdFx0XHRleWVUcmFuc2xhdGlvblIuZnJvbUFycmF5KCBleWVQYXJhbXNSLm9mZnNldCApO1xuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHNjZW5lICkgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVlJFZmZlY3QucmVuZGVyKCkgbm8gbG9uZ2VyIHN1cHBvcnRzIGFycmF5cy4gVXNlIG9iamVjdC5sYXllcnMgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHNjZW5lID0gc2NlbmVbIDAgXTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBXaGVuIHJlbmRlcmluZyB3ZSBkb24ndCBjYXJlIHdoYXQgdGhlIHJlY29tbWVuZGVkIHNpemUgaXMsIG9ubHkgd2hhdCB0aGUgYWN0dWFsIHNpemVcblx0XHRcdC8vIG9mIHRoZSBiYWNrYnVmZmVyIGlzLlxuXHRcdFx0dmFyIHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG5cdFx0XHR2YXIgbGF5ZXJzID0gdnJEaXNwbGF5LmdldExheWVycygpO1xuXHRcdFx0dmFyIGxlZnRCb3VuZHM7XG5cdFx0XHR2YXIgcmlnaHRCb3VuZHM7XG5cblx0XHRcdGlmICggbGF5ZXJzLmxlbmd0aCApIHtcblxuXHRcdFx0XHR2YXIgbGF5ZXIgPSBsYXllcnNbIDAgXTtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gbGF5ZXIubGVmdEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5sZWZ0Qm91bmRzLmxlbmd0aCA9PT0gNCA/IGxheWVyLmxlZnRCb3VuZHMgOiBkZWZhdWx0TGVmdEJvdW5kcztcblx0XHRcdFx0cmlnaHRCb3VuZHMgPSBsYXllci5yaWdodEJvdW5kcyAhPT0gbnVsbCAmJiBsYXllci5yaWdodEJvdW5kcy5sZW5ndGggPT09IDQgPyBsYXllci5yaWdodEJvdW5kcyA6IGRlZmF1bHRSaWdodEJvdW5kcztcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRsZWZ0Qm91bmRzID0gZGVmYXVsdExlZnRCb3VuZHM7XG5cdFx0XHRcdHJpZ2h0Qm91bmRzID0gZGVmYXVsdFJpZ2h0Qm91bmRzO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlclJlY3RMID0ge1xuXHRcdFx0XHR4OiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogbGVmdEJvdW5kc1sgMSBdICksXG5cdFx0XHRcdHdpZHRoOiBNYXRoLnJvdW5kKCBzaXplLndpZHRoICogbGVmdEJvdW5kc1sgMiBdICksXG5cdFx0XHRcdGhlaWdodDogTWF0aC5yb3VuZChzaXplLmhlaWdodCAqIGxlZnRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXHRcdFx0cmVuZGVyUmVjdFIgPSB7XG5cdFx0XHRcdHg6IE1hdGgucm91bmQoIHNpemUud2lkdGggKiByaWdodEJvdW5kc1sgMCBdICksXG5cdFx0XHRcdHk6IE1hdGgucm91bmQoIHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDEgXSApLFxuXHRcdFx0XHR3aWR0aDogTWF0aC5yb3VuZCggc2l6ZS53aWR0aCAqIHJpZ2h0Qm91bmRzWyAyIF0gKSxcblx0XHRcdFx0aGVpZ2h0OiBNYXRoLnJvdW5kKHNpemUuaGVpZ2h0ICogcmlnaHRCb3VuZHNbIDMgXSApXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3NvclRlc3QgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggbnVsbCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yVGVzdCggdHJ1ZSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggcmVuZGVyZXIuYXV0b0NsZWFyIHx8IGZvcmNlQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggY2FtZXJhTC5wb3NpdGlvbiwgY2FtZXJhTC5xdWF0ZXJuaW9uLCBjYW1lcmFMLnNjYWxlICk7XG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGQuZGVjb21wb3NlKCBjYW1lcmFSLnBvc2l0aW9uLCBjYW1lcmFSLnF1YXRlcm5pb24sIGNhbWVyYVIuc2NhbGUgKTtcblxuXHRcdFx0dmFyIHNjYWxlID0gdGhpcy5zY2FsZTtcblx0XHRcdGNhbWVyYUwudHJhbnNsYXRlT25BeGlzKCBleWVUcmFuc2xhdGlvbkwsIHNjYWxlICk7XG5cdFx0XHRjYW1lcmFSLnRyYW5zbGF0ZU9uQXhpcyggZXllVHJhbnNsYXRpb25SLCBzY2FsZSApO1xuXG5cdFx0XHRpZiAoIHZyRGlzcGxheS5nZXRGcmFtZURhdGEgKSB7XG5cblx0XHRcdFx0dnJEaXNwbGF5LmRlcHRoTmVhciA9IGNhbWVyYS5uZWFyO1xuXHRcdFx0XHR2ckRpc3BsYXkuZGVwdGhGYXIgPSBjYW1lcmEuZmFyO1xuXG5cdFx0XHRcdHZyRGlzcGxheS5nZXRGcmFtZURhdGEoIGZyYW1lRGF0YSApO1xuXG5cdFx0XHRcdGNhbWVyYUwucHJvamVjdGlvbk1hdHJpeC5lbGVtZW50cyA9IGZyYW1lRGF0YS5sZWZ0UHJvamVjdGlvbk1hdHJpeDtcblx0XHRcdFx0Y2FtZXJhUi5wcm9qZWN0aW9uTWF0cml4LmVsZW1lbnRzID0gZnJhbWVEYXRhLnJpZ2h0UHJvamVjdGlvbk1hdHJpeDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjYW1lcmFMLnByb2plY3Rpb25NYXRyaXggPSBmb3ZUb1Byb2plY3Rpb24oIGV5ZVBhcmFtc0wuZmllbGRPZlZpZXcsIHRydWUsIGNhbWVyYS5uZWFyLCBjYW1lcmEuZmFyICk7XG5cdFx0XHRcdGNhbWVyYVIucHJvamVjdGlvbk1hdHJpeCA9IGZvdlRvUHJvamVjdGlvbiggZXllUGFyYW1zUi5maWVsZE9mVmlldywgdHJ1ZSwgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW5kZXIgbGVmdCBleWVcblx0XHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHRcdHJlbmRlclRhcmdldC52aWV3cG9ydC5zZXQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCByZW5kZXJSZWN0TC54LCByZW5kZXJSZWN0TC55LCByZW5kZXJSZWN0TC53aWR0aCwgcmVuZGVyUmVjdEwuaGVpZ2h0ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmVuZGVyZXIuc2V0Vmlld3BvcnQoIHJlbmRlclJlY3RMLngsIHJlbmRlclJlY3RMLnksIHJlbmRlclJlY3RMLndpZHRoLCByZW5kZXJSZWN0TC5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvciggcmVuZGVyUmVjdEwueCwgcmVuZGVyUmVjdEwueSwgcmVuZGVyUmVjdEwud2lkdGgsIHJlbmRlclJlY3RMLmhlaWdodCApO1xuXG5cdFx0XHR9XG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmFMLCByZW5kZXJUYXJnZXQsIGZvcmNlQ2xlYXIgKTtcblxuXHRcdFx0Ly8gcmVuZGVyIHJpZ2h0IGV5ZVxuXHRcdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdFx0cmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIHJlbmRlclJlY3RSLngsIHJlbmRlclJlY3RSLnksIHJlbmRlclJlY3RSLndpZHRoLCByZW5kZXJSZWN0Ui5oZWlnaHQgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggcmVuZGVyUmVjdFIueCwgcmVuZGVyUmVjdFIueSwgcmVuZGVyUmVjdFIud2lkdGgsIHJlbmRlclJlY3RSLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRTY2lzc29yKCByZW5kZXJSZWN0Ui54LCByZW5kZXJSZWN0Ui55LCByZW5kZXJSZWN0Ui53aWR0aCwgcmVuZGVyUmVjdFIuaGVpZ2h0ICk7XG5cblx0XHRcdH1cblx0XHRcdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYVIsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdFx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0XHRyZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCApO1xuXHRcdFx0XHRyZW5kZXJUYXJnZXQuc2Npc3Nvci5zZXQoIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0ICk7XG5cdFx0XHRcdHJlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IGZhbHNlO1xuXHRcdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZW5kZXJlci5zZXRWaWV3cG9ydCggMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQgKTtcblx0XHRcdFx0cmVuZGVyZXIuc2V0U2Npc3NvclRlc3QoIGZhbHNlICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBhdXRvVXBkYXRlICkge1xuXG5cdFx0XHRcdHNjZW5lLmF1dG9VcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc2NvcGUuYXV0b1N1Ym1pdEZyYW1lICkge1xuXG5cdFx0XHRcdHNjb3BlLnN1Ym1pdEZyYW1lKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0Ly8gUmVndWxhciByZW5kZXIgbW9kZSBpZiBub3QgSE1EXG5cblx0XHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmEsIHJlbmRlclRhcmdldCwgZm9yY2VDbGVhciApO1xuXG5cdH07XG5cblx0dGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgb25WUkRpc3BsYXlQcmVzZW50Q2hhbmdlLCBmYWxzZSApO1xuXG5cdH07XG5cblx0Ly9cblxuXHRmdW5jdGlvbiBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKSB7XG5cblx0XHR2YXIgcHhzY2FsZSA9IDIuMCAvICggZm92LmxlZnRUYW4gKyBmb3YucmlnaHRUYW4gKTtcblx0XHR2YXIgcHhvZmZzZXQgPSAoIGZvdi5sZWZ0VGFuIC0gZm92LnJpZ2h0VGFuICkgKiBweHNjYWxlICogMC41O1xuXHRcdHZhciBweXNjYWxlID0gMi4wIC8gKCBmb3YudXBUYW4gKyBmb3YuZG93blRhbiApO1xuXHRcdHZhciBweW9mZnNldCA9ICggZm92LnVwVGFuIC0gZm92LmRvd25UYW4gKSAqIHB5c2NhbGUgKiAwLjU7XG5cdFx0cmV0dXJuIHsgc2NhbGU6IFsgcHhzY2FsZSwgcHlzY2FsZSBdLCBvZmZzZXQ6IFsgcHhvZmZzZXQsIHB5b2Zmc2V0IF0gfTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gZm92UG9ydFRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cblx0XHRyaWdodEhhbmRlZCA9IHJpZ2h0SGFuZGVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogcmlnaHRIYW5kZWQ7XG5cdFx0ek5lYXIgPSB6TmVhciA9PT0gdW5kZWZpbmVkID8gMC4wMSA6IHpOZWFyO1xuXHRcdHpGYXIgPSB6RmFyID09PSB1bmRlZmluZWQgPyAxMDAwMC4wIDogekZhcjtcblxuXHRcdHZhciBoYW5kZWRuZXNzU2NhbGUgPSByaWdodEhhbmRlZCA/IC0gMS4wIDogMS4wO1xuXG5cdFx0Ly8gc3RhcnQgd2l0aCBhbiBpZGVudGl0eSBtYXRyaXhcblx0XHR2YXIgbW9iaiA9IG5ldyBNYXRyaXg0KCk7XG5cdFx0dmFyIG0gPSBtb2JqLmVsZW1lbnRzO1xuXG5cdFx0Ly8gYW5kIHdpdGggc2NhbGUvb2Zmc2V0IGluZm8gZm9yIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3Jkc1xuXHRcdHZhciBzY2FsZUFuZE9mZnNldCA9IGZvdlRvTkRDU2NhbGVPZmZzZXQoIGZvdiApO1xuXG5cdFx0Ly8gWCByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cblx0XHRtWyAwICogNCArIDAgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAwIF07XG5cdFx0bVsgMCAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMCAqIDQgKyAyIF0gPSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbIDAgXSAqIGhhbmRlZG5lc3NTY2FsZTtcblx0XHRtWyAwICogNCArIDMgXSA9IDAuMDtcblxuXHRcdC8vIFkgcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG5cdFx0Ly8gWSBvZmZzZXQgaXMgbmVnYXRlZCBiZWNhdXNlIHRoaXMgcHJvaiBtYXRyaXggdHJhbnNmb3JtcyBmcm9tIHdvcmxkIGNvb3JkcyB3aXRoIFk9dXAsXG5cdFx0Ly8gYnV0IHRoZSBOREMgc2NhbGluZyBoYXMgWT1kb3duICh0aGFua3MgRDNEPylcblx0XHRtWyAxICogNCArIDAgXSA9IDAuMDtcblx0XHRtWyAxICogNCArIDEgXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWyAxIF07XG5cdFx0bVsgMSAqIDQgKyAyIF0gPSAtIHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFsgMSBdICogaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDEgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0Ly8gWiByZXN1bHQgKHVwIHRvIHRoZSBhcHApXG5cdFx0bVsgMiAqIDQgKyAwIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAxIF0gPSAwLjA7XG5cdFx0bVsgMiAqIDQgKyAyIF0gPSB6RmFyIC8gKCB6TmVhciAtIHpGYXIgKSAqIC0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDIgKiA0ICsgMyBdID0gKCB6RmFyICogek5lYXIgKSAvICggek5lYXIgLSB6RmFyICk7XG5cblx0XHQvLyBXIHJlc3VsdCAoPSBaIGluKVxuXHRcdG1bIDMgKiA0ICsgMCBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMSBdID0gMC4wO1xuXHRcdG1bIDMgKiA0ICsgMiBdID0gaGFuZGVkbmVzc1NjYWxlO1xuXHRcdG1bIDMgKiA0ICsgMyBdID0gMC4wO1xuXG5cdFx0bW9iai50cmFuc3Bvc2UoKTtcblxuXHRcdHJldHVybiBtb2JqO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBmb3ZUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG5cdFx0dmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cblx0XHR2YXIgZm92UG9ydCA9IHtcblx0XHRcdHVwVGFuOiBNYXRoLnRhbiggZm92LnVwRGVncmVlcyAqIERFRzJSQUQgKSxcblx0XHRcdGRvd25UYW46IE1hdGgudGFuKCBmb3YuZG93bkRlZ3JlZXMgKiBERUcyUkFEICksXG5cdFx0XHRsZWZ0VGFuOiBNYXRoLnRhbiggZm92LmxlZnREZWdyZWVzICogREVHMlJBRCApLFxuXHRcdFx0cmlnaHRUYW46IE1hdGgudGFuKCBmb3YucmlnaHREZWdyZWVzICogREVHMlJBRCApXG5cdFx0fTtcblxuXHRcdHJldHVybiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3ZQb3J0LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKTtcblxuXHR9XG5cbn07XG4iLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgTXVnZW44NyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9NdWdlbjg3XG4gKlxuICogQmFzZWQgb24gQHRvamlybydzIHZyLXNhbXBsZXMtdXRpbHMuanNcbiAqL1xuXG5leHBvcnQgY29uc3QgV0VCVlIgPSB7XG5cblx0aXNBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1dFQlZSOiBpc0F2YWlsYWJsZSgpIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSAuY2hlY2tBdmFpbGFiaWxpdHkoKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZDtcblxuXHR9LFxuXG5cdGNoZWNrQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG5cblx0XHRcdGlmICggbmF2aWdhdG9yLmdldFZSRGlzcGxheXMgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGZ1bmN0aW9uICggZGlzcGxheXMgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGRpc3BsYXlzLmxlbmd0aCA9PT0gMCApIHtcblxuXHRcdFx0XHRcdFx0cmVqZWN0KCAnV2ViVlIgc3VwcG9ydGVkLCBidXQgbm8gVlJEaXNwbGF5cyBmb3VuZC4nICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJlamVjdCggJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlZSLiBTZWUgPGEgaHJlZj1cImh0dHBzOi8vd2VidnIuaW5mb1wiPndlYnZyLmluZm88L2E+IGZvciBhc3Npc3RhbmNlLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH0sXG5cblx0Z2V0VlJEaXNwbGF5OiBmdW5jdGlvbiAoIG9uRGlzcGxheSApIHtcblxuXHRcdGlmICggJ2dldFZSRGlzcGxheXMnIGluIG5hdmlnYXRvciApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKVxuXHRcdFx0XHQudGhlbiggZnVuY3Rpb24gKCBkaXNwbGF5cyApIHtcblx0XHRcdFx0XHRvbkRpc3BsYXkoIGRpc3BsYXlzWyAwIF0gKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnV0VCVlI6IGdldE1lc3NhZ2UoKSBpcyBiZWluZyBkZXByZWNhdGVkLiBVc2UgLmdldE1lc3NhZ2VDb250YWluZXIoIG1lc3NhZ2UgKSBpbnN0ZWFkLicgKTtcblxuXHRcdHZhciBtZXNzYWdlO1xuXG5cdFx0aWYgKCBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cyApIHtcblxuXHRcdFx0bmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBmdW5jdGlvbiAoIGRpc3BsYXlzICkge1xuXG5cdFx0XHRcdGlmICggZGlzcGxheXMubGVuZ3RoID09PSAwICkgbWVzc2FnZSA9ICdXZWJWUiBzdXBwb3J0ZWQsIGJ1dCBubyBWUkRpc3BsYXlzIGZvdW5kLic7XG5cblx0XHRcdH0gKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG1lc3NhZ2UgPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViVlIuIFNlZSA8YSBocmVmPVwiaHR0cDovL3dlYnZyLmluZm9cIj53ZWJ2ci5pbmZvPC9hPiBmb3IgYXNzaXN0YW5jZS4nO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBtZXNzYWdlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzAnO1xuXHRcdFx0Y29udGFpbmVyLnN0eWxlLnRvcCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRcdGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnOTk5Jztcblx0XHRcdGNvbnRhaW5lci5hbGlnbiA9ICdjZW50ZXInO1xuXG5cdFx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcblx0XHRcdGVycm9yLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0XHRlcnJvci5zdHlsZS5saW5lSGVpZ2h0ID0gJzI2cHgnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXHRcdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0XHRlcnJvci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5tYXJnaW4gPSAnNTBweCc7XG5cdFx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0XHRlcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBlcnJvciApO1xuXG5cdFx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0TWVzc2FnZUNvbnRhaW5lcjogZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0Y29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRjb250YWluZXIuc3R5bGUubGVmdCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUudG9wID0gJzAnO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcwJztcblx0XHRjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OSc7XG5cdFx0Y29udGFpbmVyLmFsaWduID0gJ2NlbnRlcic7XG5cblx0XHR2YXIgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVycm9yLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZic7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG5cdFx0ZXJyb3Iuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0ZXJyb3Iuc3R5bGUubGluZUhlaWdodCA9ICcyNnB4Jztcblx0XHRlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cdFx0ZXJyb3Iuc3R5bGUuY29sb3IgPSAnIzAwMCc7XG5cdFx0ZXJyb3Iuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuXHRcdGVycm9yLnN0eWxlLm1hcmdpbiA9ICc1MHB4Jztcblx0XHRlcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0ZXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGVycm9yICk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdH0sXG5cblx0Z2V0QnV0dG9uOiBmdW5jdGlvbiAoIGRpc3BsYXksIGNhbnZhcyApIHtcblxuXHRcdGlmICggJ1ZSRWZmZWN0JyBpbiBUSFJFRSAmJiBkaXNwbGF5IGluc3RhbmNlb2YgVEhSRUUuVlJFZmZlY3QgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdXZWJWUi5nZXRCdXR0b24oKSBub3cgZXhwZWN0cyBhIFZSRGlzcGxheS4nICk7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2J1dHRvbicgKTtcblxuXHRcdH1cblxuXHRcdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXHRcdGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0YnV0dG9uLnN0eWxlLmxlZnQgPSAnY2FsYyg1MCUgLSA1MHB4KSc7XG5cdFx0YnV0dG9uLnN0eWxlLmJvdHRvbSA9ICcyMHB4Jztcblx0XHRidXR0b24uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuXHRcdGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMCc7XG5cdFx0YnV0dG9uLnN0eWxlLnBhZGRpbmcgPSAnOHB4Jztcblx0XHRidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cdFx0YnV0dG9uLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnO1xuXHRcdGJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRidXR0b24uc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCc7XG5cdFx0YnV0dG9uLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJ1dHRvbi5zdHlsZS56SW5kZXggPSAnOTk5JztcblxuXHRcdGlmICggZGlzcGxheSApIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ0VOVEVSIFZSJztcblx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGRpc3BsYXkuaXNQcmVzZW50aW5nID8gZGlzcGxheS5leGl0UHJlc2VudCgpIDogZGlzcGxheS5yZXF1ZXN0UHJlc2VudCggWyB7IHNvdXJjZTogY2FudmFzIH0gXSApO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gZGlzcGxheS5pc1ByZXNlbnRpbmcgPyAnRVhJVCBWUicgOiAnRU5URVIgVlInO1xuXG5cdFx0XHR9LCBmYWxzZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ05PIFZSIERJU1BMQVknO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbjtcblxuXHR9XG5cbn07XG4iLCJpbXBvcnQge0xvb3AsIENvbnRyb2xzTW9kdWxlLCBDYW1lcmFDb21wb25lbnR9IGZyb20gJ3docyc7XG5pbXBvcnQge1JFVklTSU9OfSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7VlJFZmZlY3R9IGZyb20gJy4vdnIvVlJFZmZlY3QnO1xuaW1wb3J0IFZSQ29udHJvbHNOYXRpdmUgZnJvbSAndGhyZWUtdnJjb250cm9scy1tb2R1bGUnO1xuaW1wb3J0IHtXRUJWUn0gZnJvbSAnLi92ci9XZWJWUic7XG5cbmV4cG9ydCB7XG4gIFdFQlZSXG59O1xuXG5leHBvcnQgY2xhc3MgVlJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcbiAgICAgIG1lc3NhZ2U6IHRydWUsXG4gICAgICBidXR0b246IHRydWVcbiAgICB9KTtcblxuICAgIHRoaXMuc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbiAgICB0aGlzLmVmZmVjdCA9IG51bGw7XG4gIH1cblxuICBtYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBtYW5hZ2VyLmRlZmluZSgndnInKTtcblxuICAgIGlmIChSRVZJU0lPTiA+IDg2KSBjb25zb2xlLndhcm4oJ1BsZWFzZSB1c2UgVlJNb2R1bGUyIGZvciBUaHJlZS5qcyBeMC44Ny4wIChyODcpJyk7XG5cbiAgICBjb25zdCByZW5kZXJpbmcgPSBtYW5hZ2VyLnVzZSgncmVuZGVyaW5nJyk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBtYW5hZ2VyLmdldCgncmVuZGVyZXInKTtcblxuICAgIGNvbnN0IHJlc2l6ZSA9IG1hbmFnZXIudXNlKCdyZXNpemUnKTtcblxuICAgIHRoaXMuZWZmZWN0ID0gbmV3IFZSRWZmZWN0KHJlbmRlcmVyKTtcblxuICAgIHRoaXMuc2NlbmUgPSBtYW5hZ2VyLmdldCgnc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IG1hbmFnZXIuZ2V0KCdjYW1lcmEnKTtcblxuICAgIHJlbmRlcmluZy5lZmZlY3QodGhpcy5lZmZlY3QpO1xuXG4gICAgLy8gVE9ETzogRml4IHJlc2l6ZS5cblxuICAgIHJlc2l6ZS5hZGRDYWxsYmFjaygod2lkdGgsIGhlaWdodCkgPT4ge1xuICAgICAgdGhpcy5lZmZlY3Quc2V0U2l6ZSgrd2lkdGgsICtoZWlnaHQpO1xuICAgIH0pO1xuXG4gICAgLy8gV0VCVlJcbiAgICBjb25zdCB7bWVzc2FnZSwgYnV0dG9ufSA9IHRoaXMucGFyYW1zO1xuXG4gICAgaWYgKG1lc3NhZ2UpIFdFQlZSLmNoZWNrQXZhaWxhYmlsaXR5KCkuY2F0Y2gobWVzc2FnZSA9PiB7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFdFQlZSLmdldE1lc3NhZ2VDb250YWluZXIobWVzc2FnZSkpO1xuXHRcdH0pO1xuXG4gICAgaWYgKGJ1dHRvbikgV0VCVlIuZ2V0VlJEaXNwbGF5KGRpc3BsYXkgPT4ge1xuICAgICAgY29uc3QgdnJidG4gPSBXRUJWUi5nZXRCdXR0b24oZGlzcGxheSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICB2cmJ0bi5jbGFzc05hbWUgPSAndnItYnRuJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2cmJ0bik7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSMk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlzcGxheSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gV0VCVlIuZ2V0VlJEaXNwbGF5KGRpc3BsYXkgPT4gcmVzb2x2ZShkaXNwbGF5KSkpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgbWFuYWdlci5kZWZpbmUoJ3ZyJyk7XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG1hbmFnZXIuZ2V0KCdyZW5kZXJlcicpO1xuICAgIHJlbmRlcmVyLnZyLmVuYWJsZWQgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKFJFVklTSU9OKTtcbiAgICBjb25zb2xlLmxvZygxKTtcblxuICAgIHRoaXMuZGlzcGxheS50aGVuKGRpc3BsYXkgPT4ge1xuICAgICAgcmVuZGVyZXIudnIuc2V0RGV2aWNlKGRpc3BsYXkpO1xuXG4gICAgICBjb25zdCB2cmJ0biA9IFdFQlZSLmdldEJ1dHRvbihkaXNwbGF5LCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgIHZyYnRuLmNsYXNzTmFtZSA9ICd2ci1idG4nO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZyYnRuKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVlJDb250cm9scyBleHRlbmRzIENvbnRyb2xzTW9kdWxlIHtcbiAgY29uc3RydWN0b3Ioe29iamVjdCwgb25FcnJvciwgaW50ZW5zaXR5fSkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IFZSQ29udHJvbHNOYXRpdmUob2JqZWN0Lm5hdGl2ZSwgb25FcnJvcik7XG5cbiAgICBjb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgY29udHJvbHMuc2NhbGUgPSBpbnRlbnNpdHk7XG5cbiAgICBzdXBlcih7Y29udHJvbHN9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlZSRWZmZWN0IiwicmVuZGVyZXIiLCJvbkVycm9yIiwidnJEaXNwbGF5IiwidnJEaXNwbGF5cyIsImV5ZVRyYW5zbGF0aW9uTCIsIlZlY3RvcjMiLCJleWVUcmFuc2xhdGlvblIiLCJyZW5kZXJSZWN0TCIsInJlbmRlclJlY3RSIiwiZnJhbWVEYXRhIiwid2luZG93IiwiVlJGcmFtZURhdGEiLCJnb3RWUkRpc3BsYXlzIiwiZGlzcGxheXMiLCJsZW5ndGgiLCJuYXZpZ2F0b3IiLCJnZXRWUkRpc3BsYXlzIiwidGhlbiIsImNhdGNoIiwid2FybiIsImlzUHJlc2VudGluZyIsInNjYWxlIiwic2NvcGUiLCJyZW5kZXJlclNpemUiLCJnZXRTaXplIiwicmVuZGVyZXJVcGRhdGVTdHlsZSIsInJlbmRlcmVyUGl4ZWxSYXRpbyIsImdldFBpeGVsUmF0aW8iLCJnZXRWUkRpc3BsYXkiLCJzZXRWUkRpc3BsYXkiLCJ2YWx1ZSIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsInVwZGF0ZVN0eWxlIiwiZXllUGFyYW1zTCIsImdldEV5ZVBhcmFtZXRlcnMiLCJzZXRQaXhlbFJhdGlvIiwicmVuZGVyV2lkdGgiLCJyZW5kZXJIZWlnaHQiLCJjYW52YXMiLCJkb21FbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50IiwiZGVmYXVsdExlZnRCb3VuZHMiLCJkZWZhdWx0UmlnaHRCb3VuZHMiLCJvblZSRGlzcGxheVByZXNlbnRDaGFuZ2UiLCJ3YXNQcmVzZW50aW5nIiwidW5kZWZpbmVkIiwiZXllV2lkdGgiLCJleWVIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RnVsbFNjcmVlbiIsImJvb2xlYW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwicmVxdWVzdFByZXNlbnQiLCJzb3VyY2UiLCJleGl0UHJlc2VudCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImgiLCJzdWJtaXRGcmFtZSIsImF1dG9TdWJtaXRGcmFtZSIsImNhbWVyYUwiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsImxheWVycyIsImVuYWJsZSIsImNhbWVyYVIiLCJyZW5kZXIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlclRhcmdldCIsImZvcmNlQ2xlYXIiLCJhdXRvVXBkYXRlIiwidXBkYXRlTWF0cml4V29ybGQiLCJleWVQYXJhbXNSIiwiZnJvbUFycmF5Iiwib2Zmc2V0IiwiQXJyYXkiLCJpc0FycmF5Iiwic2l6ZSIsImdldExheWVycyIsImxlZnRCb3VuZHMiLCJyaWdodEJvdW5kcyIsImxheWVyIiwiTWF0aCIsInJvdW5kIiwic2V0UmVuZGVyVGFyZ2V0Iiwic2Npc3NvclRlc3QiLCJzZXRTY2lzc29yVGVzdCIsImF1dG9DbGVhciIsImNsZWFyIiwicGFyZW50IiwibWF0cml4V29ybGQiLCJkZWNvbXBvc2UiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJ0cmFuc2xhdGVPbkF4aXMiLCJnZXRGcmFtZURhdGEiLCJkZXB0aE5lYXIiLCJuZWFyIiwiZGVwdGhGYXIiLCJmYXIiLCJwcm9qZWN0aW9uTWF0cml4IiwiZWxlbWVudHMiLCJsZWZ0UHJvamVjdGlvbk1hdHJpeCIsInJpZ2h0UHJvamVjdGlvbk1hdHJpeCIsImZvdlRvUHJvamVjdGlvbiIsImZpZWxkT2ZWaWV3Iiwidmlld3BvcnQiLCJzZXQiLCJ4IiwieSIsInNjaXNzb3IiLCJzZXRWaWV3cG9ydCIsInNldFNjaXNzb3IiLCJkaXNwb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZvdlRvTkRDU2NhbGVPZmZzZXQiLCJmb3YiLCJweHNjYWxlIiwibGVmdFRhbiIsInJpZ2h0VGFuIiwicHhvZmZzZXQiLCJweXNjYWxlIiwidXBUYW4iLCJkb3duVGFuIiwicHlvZmZzZXQiLCJmb3ZQb3J0VG9Qcm9qZWN0aW9uIiwicmlnaHRIYW5kZWQiLCJ6TmVhciIsInpGYXIiLCJoYW5kZWRuZXNzU2NhbGUiLCJtb2JqIiwiTWF0cml4NCIsIm0iLCJzY2FsZUFuZE9mZnNldCIsInRyYW5zcG9zZSIsIkRFRzJSQUQiLCJQSSIsImZvdlBvcnQiLCJ0YW4iLCJ1cERlZ3JlZXMiLCJkb3duRGVncmVlcyIsImxlZnREZWdyZWVzIiwicmlnaHREZWdyZWVzIiwiV0VCVlIiLCJvbkRpc3BsYXkiLCJtZXNzYWdlIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJ6SW5kZXgiLCJhbGlnbiIsImVycm9yIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwicGFkZGluZyIsIm1hcmdpbiIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsIlRIUkVFIiwiYnV0dG9uIiwiYm90dG9tIiwiYm9yZGVyIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dENvbnRlbnQiLCJvbmNsaWNrIiwiVlJNb2R1bGUiLCJwYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJlZmZlY3QiLCJtYW5hZ2VyIiwiZGVmaW5lIiwiUkVWSVNJT04iLCJjb25zb2xlIiwicmVuZGVyaW5nIiwidXNlIiwiZ2V0IiwicmVzaXplIiwiYWRkQ2FsbGJhY2siLCJjaGVja0F2YWlsYWJpbGl0eSIsImJvZHkiLCJnZXRNZXNzYWdlQ29udGFpbmVyIiwidnJidG4iLCJnZXRCdXR0b24iLCJjbGFzc05hbWUiLCJWUjJNb2R1bGUiLCJ2ciIsImVuYWJsZWQiLCJsb2ciLCJzZXREZXZpY2UiLCJWUkNvbnRyb2xzIiwib2JqZWN0IiwiaW50ZW5zaXR5IiwiY29udHJvbHMiLCJWUkNvbnRyb2xzTmF0aXZlIiwibmF0aXZlIiwic3RhbmRpbmciLCJDb250cm9sc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFXQSxBQU1PLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFXQyxRQUFYLEVBQXFCQyxPQUFyQixFQUErQjs7S0FFbERDLFNBQUosRUFBZUMsVUFBZjtLQUNJQyxrQkFBa0IsSUFBSUMsT0FBSixFQUF0QjtLQUNJQyxrQkFBa0IsSUFBSUQsT0FBSixFQUF0QjtLQUNJRSxXQUFKLEVBQWlCQyxXQUFqQjs7S0FFSUMsWUFBWSxJQUFoQjs7S0FFSyxpQkFBaUJDLE1BQXRCLEVBQStCOztjQUVsQixJQUFJQyxXQUFKLEVBQVo7OztVQUlRQyxhQUFULENBQXdCQyxRQUF4QixFQUFtQzs7ZUFFckJBLFFBQWI7O01BRUtBLFNBQVNDLE1BQVQsR0FBa0IsQ0FBdkIsRUFBMkI7O2VBRWRELFNBQVUsQ0FBVixDQUFaO0dBRkQsTUFJTzs7T0FFRFosT0FBTCxFQUFlQSxRQUFTLG1CQUFUOzs7O0tBTVpjLFVBQVVDLGFBQWYsRUFBK0I7O1lBRXBCQSxhQUFWLEdBQTBCQyxJQUExQixDQUFnQ0wsYUFBaEMsRUFBZ0RNLEtBQWhELENBQXdELFlBQVk7O1dBRTNEQyxJQUFSLENBQWMsMkNBQWQ7R0FGRDs7Ozs7TUFVSUMsWUFBTCxHQUFvQixLQUFwQjtNQUNLQyxLQUFMLEdBQWEsQ0FBYjs7S0FFSUMsUUFBUSxJQUFaOztLQUVJQyxlQUFldkIsU0FBU3dCLE9BQVQsRUFBbkI7S0FDSUMsc0JBQXNCLEtBQTFCO0tBQ0lDLHFCQUFxQjFCLFNBQVMyQixhQUFULEVBQXpCOztNQUVLQyxZQUFMLEdBQW9CLFlBQVk7O1NBRXhCMUIsU0FBUDtFQUZEOztNQU1LMkIsWUFBTCxHQUFvQixVQUFXQyxLQUFYLEVBQW1COztjQUUxQkEsS0FBWjtFQUZEOztNQU1LZCxhQUFMLEdBQXFCLFlBQVk7O1VBRXhCRyxJQUFSLENBQWMsc0RBQWQ7U0FDT2hCLFVBQVA7RUFIRDs7TUFPSzRCLE9BQUwsR0FBZSxVQUFXQyxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsV0FBMUIsRUFBd0M7O2lCQUV2QyxFQUFFRixPQUFPQSxLQUFULEVBQWdCQyxRQUFRQSxNQUF4QixFQUFmO3dCQUNzQkMsV0FBdEI7O01BRUtaLE1BQU1GLFlBQVgsRUFBMEI7O09BRXJCZSxhQUFhakMsVUFBVWtDLGdCQUFWLENBQTRCLE1BQTVCLENBQWpCO1lBQ1NDLGFBQVQsQ0FBd0IsQ0FBeEI7WUFDU04sT0FBVCxDQUFrQkksV0FBV0csV0FBWCxHQUF5QixDQUEzQyxFQUE4Q0gsV0FBV0ksWUFBekQsRUFBdUUsS0FBdkU7R0FKRCxNQU1POztZQUVHRixhQUFULENBQXdCWCxrQkFBeEI7WUFDU0ssT0FBVCxDQUFrQkMsS0FBbEIsRUFBeUJDLE1BQXpCLEVBQWlDQyxXQUFqQzs7RUFkRjs7OztLQXNCSU0sU0FBU3hDLFNBQVN5QyxVQUF0QjtLQUNJQyxpQkFBSjtLQUNJQyxjQUFKO0tBQ0lDLGlCQUFKO0tBQ0lDLG9CQUFvQixDQUFFLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixDQUF4QjtLQUNJQyxxQkFBcUIsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBekI7O1VBRVNDLHdCQUFULEdBQW9DOztNQUUvQkMsZ0JBQWdCMUIsTUFBTUYsWUFBMUI7UUFDTUEsWUFBTixHQUFxQmxCLGNBQWMrQyxTQUFkLElBQTJCL0MsVUFBVWtCLFlBQTFEOztNQUVLRSxNQUFNRixZQUFYLEVBQTBCOztPQUVyQmUsYUFBYWpDLFVBQVVrQyxnQkFBVixDQUE0QixNQUE1QixDQUFqQjtPQUNJYyxXQUFXZixXQUFXRyxXQUExQjtPQUNJYSxZQUFZaEIsV0FBV0ksWUFBM0I7O09BRUssQ0FBQ1MsYUFBTixFQUFzQjs7eUJBRUFoRCxTQUFTMkIsYUFBVCxFQUFyQjttQkFDZTNCLFNBQVN3QixPQUFULEVBQWY7O2FBRVNhLGFBQVQsQ0FBd0IsQ0FBeEI7YUFDU04sT0FBVCxDQUFrQm1CLFdBQVcsQ0FBN0IsRUFBZ0NDLFNBQWhDLEVBQTJDLEtBQTNDOztHQVpGLE1BZ0JPLElBQUtILGFBQUwsRUFBcUI7O1lBRWxCWCxhQUFULENBQXdCWCxrQkFBeEI7WUFDU0ssT0FBVCxDQUFrQlIsYUFBYVMsS0FBL0IsRUFBc0NULGFBQWFVLE1BQW5ELEVBQTJEUixtQkFBM0Q7Ozs7UUFNSzJCLGdCQUFQLENBQXlCLHdCQUF6QixFQUFtREwsd0JBQW5ELEVBQTZFLEtBQTdFOztNQUVLTSxhQUFMLEdBQXFCLFVBQVdDLE9BQVgsRUFBcUI7O1NBRWxDLElBQUlDLE9BQUosQ0FBYSxVQUFXQyxPQUFYLEVBQW9CQyxNQUFwQixFQUE2Qjs7T0FFM0N2RCxjQUFjK0MsU0FBbkIsRUFBK0I7O1dBRXRCLElBQUlTLEtBQUosQ0FBVyx1QkFBWCxDQUFSOzs7O09BS0lwQyxNQUFNRixZQUFOLEtBQXVCa0MsT0FBNUIsRUFBc0M7Ozs7OztPQU9qQ0EsT0FBTCxFQUFlOztZQUVMcEQsVUFBVXlELGNBQVYsQ0FBMEIsQ0FBRSxFQUFFQyxRQUFRcEIsTUFBVixFQUFGLENBQTFCLENBQVQ7SUFGRCxNQUlPOztZQUVHdEMsVUFBVTJELFdBQVYsRUFBVDs7R0F0QkssQ0FBUDtFQUZEOztNQWdDS0YsY0FBTCxHQUFzQixZQUFZOztTQUUxQixLQUFLTixhQUFMLENBQW9CLElBQXBCLENBQVA7RUFGRDs7TUFNS1EsV0FBTCxHQUFtQixZQUFZOztTQUV2QixLQUFLUixhQUFMLENBQW9CLEtBQXBCLENBQVA7RUFGRDs7TUFNS1MscUJBQUwsR0FBNkIsVUFBV0MsQ0FBWCxFQUFlOztNQUV0QzdELGNBQWMrQyxTQUFuQixFQUErQjs7VUFFdkIvQyxVQUFVNEQscUJBQVYsQ0FBaUNDLENBQWpDLENBQVA7R0FGRCxNQUlPOztVQUVDckQsT0FBT29ELHFCQUFQLENBQThCQyxDQUE5QixDQUFQOztFQVJGOztNQWNLQyxvQkFBTCxHQUE0QixVQUFXQyxDQUFYLEVBQWU7O01BRXJDL0QsY0FBYytDLFNBQW5CLEVBQStCOzthQUVwQmUsb0JBQVYsQ0FBZ0NDLENBQWhDO0dBRkQsTUFJTzs7VUFFQ0Qsb0JBQVAsQ0FBNkJDLENBQTdCOztFQVJGOztNQWNLQyxXQUFMLEdBQW1CLFlBQVk7O01BRXpCaEUsY0FBYytDLFNBQWQsSUFBMkIzQixNQUFNRixZQUF0QyxFQUFxRDs7YUFFMUM4QyxXQUFWOztFQUpGOztNQVVLQyxlQUFMLEdBQXVCLElBQXZCOzs7O0tBSUlDLFVBQVUsSUFBSUMsaUJBQUosRUFBZDtTQUNRQyxNQUFSLENBQWVDLE1BQWYsQ0FBdUIsQ0FBdkI7O0tBRUlDLFVBQVUsSUFBSUgsaUJBQUosRUFBZDtTQUNRQyxNQUFSLENBQWVDLE1BQWYsQ0FBdUIsQ0FBdkI7O01BRUtFLE1BQUwsR0FBYyxVQUFXQyxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsWUFBMUIsRUFBd0NDLFVBQXhDLEVBQXFEOztNQUU3RDNFLGFBQWFvQixNQUFNRixZQUF4QixFQUF1Qzs7T0FFbEMwRCxhQUFhSixNQUFNSSxVQUF2Qjs7T0FFS0EsVUFBTCxFQUFrQjs7VUFFWEMsaUJBQU47VUFDTUQsVUFBTixHQUFtQixLQUFuQjs7O09BSUczQyxhQUFhakMsVUFBVWtDLGdCQUFWLENBQTRCLE1BQTVCLENBQWpCO09BQ0k0QyxhQUFhOUUsVUFBVWtDLGdCQUFWLENBQTRCLE9BQTVCLENBQWpCOzttQkFFZ0I2QyxTQUFoQixDQUEyQjlDLFdBQVcrQyxNQUF0QzttQkFDZ0JELFNBQWhCLENBQTJCRCxXQUFXRSxNQUF0Qzs7T0FFS0MsTUFBTUMsT0FBTixDQUFlVixLQUFmLENBQUwsRUFBOEI7O1lBRXJCdkQsSUFBUixDQUFjLCtFQUFkO1lBQ1F1RCxNQUFPLENBQVAsQ0FBUjs7Ozs7T0FNR1csT0FBT3JGLFNBQVN3QixPQUFULEVBQVg7T0FDSThDLFNBQVNwRSxVQUFVb0YsU0FBVixFQUFiO09BQ0lDLFVBQUo7T0FDSUMsV0FBSjs7T0FFS2xCLE9BQU94RCxNQUFaLEVBQXFCOztRQUVoQjJFLFFBQVFuQixPQUFRLENBQVIsQ0FBWjs7aUJBRWFtQixNQUFNRixVQUFOLEtBQXFCLElBQXJCLElBQTZCRSxNQUFNRixVQUFOLENBQWlCekUsTUFBakIsS0FBNEIsQ0FBekQsR0FBNkQyRSxNQUFNRixVQUFuRSxHQUFnRjFDLGlCQUE3RjtrQkFDYzRDLE1BQU1ELFdBQU4sS0FBc0IsSUFBdEIsSUFBOEJDLE1BQU1ELFdBQU4sQ0FBa0IxRSxNQUFsQixLQUE2QixDQUEzRCxHQUErRDJFLE1BQU1ELFdBQXJFLEdBQW1GMUMsa0JBQWpHO0lBTEQsTUFPTzs7aUJBRU9ELGlCQUFiO2tCQUNjQyxrQkFBZDs7O2lCQUlhO09BQ1Y0QyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF1RCxXQUFZLENBQVosQ0FBekIsQ0FEVTtPQUVWRyxLQUFLQyxLQUFMLENBQVlOLEtBQUtwRCxNQUFMLEdBQWNzRCxXQUFZLENBQVosQ0FBMUIsQ0FGVTtXQUdORyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF1RCxXQUFZLENBQVosQ0FBekIsQ0FITTtZQUlMRyxLQUFLQyxLQUFMLENBQVdOLEtBQUtwRCxNQUFMLEdBQWNzRCxXQUFZLENBQVosQ0FBekI7SUFKVDtpQkFNYztPQUNWRyxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF3RCxZQUFhLENBQWIsQ0FBekIsQ0FEVTtPQUVWRSxLQUFLQyxLQUFMLENBQVlOLEtBQUtwRCxNQUFMLEdBQWN1RCxZQUFhLENBQWIsQ0FBMUIsQ0FGVTtXQUdORSxLQUFLQyxLQUFMLENBQVlOLEtBQUtyRCxLQUFMLEdBQWF3RCxZQUFhLENBQWIsQ0FBekIsQ0FITTtZQUlMRSxLQUFLQyxLQUFMLENBQVdOLEtBQUtwRCxNQUFMLEdBQWN1RCxZQUFhLENBQWIsQ0FBekI7SUFKVDs7T0FPS1osWUFBTCxFQUFvQjs7YUFFVmdCLGVBQVQsQ0FBMEJoQixZQUExQjtpQkFDYWlCLFdBQWIsR0FBMkIsSUFBM0I7SUFIRCxNQUtPOzthQUVHRCxlQUFULENBQTBCLElBQTFCO2FBQ1NFLGNBQVQsQ0FBeUIsSUFBekI7OztPQUlJOUYsU0FBUytGLFNBQVQsSUFBc0JsQixVQUEzQixFQUF3QzdFLFNBQVNnRyxLQUFUOztPQUVuQ3JCLE9BQU9zQixNQUFQLEtBQWtCLElBQXZCLEVBQThCdEIsT0FBT0ksaUJBQVA7O1VBRXZCbUIsV0FBUCxDQUFtQkMsU0FBbkIsQ0FBOEIvQixRQUFRZ0MsUUFBdEMsRUFBZ0RoQyxRQUFRaUMsVUFBeEQsRUFBb0VqQyxRQUFRL0MsS0FBNUU7VUFDTzZFLFdBQVAsQ0FBbUJDLFNBQW5CLENBQThCM0IsUUFBUTRCLFFBQXRDLEVBQWdENUIsUUFBUTZCLFVBQXhELEVBQW9FN0IsUUFBUW5ELEtBQTVFOztPQUVJQSxRQUFRLEtBQUtBLEtBQWpCO1dBQ1FpRixlQUFSLENBQXlCbEcsZUFBekIsRUFBMENpQixLQUExQztXQUNRaUYsZUFBUixDQUF5QmhHLGVBQXpCLEVBQTBDZSxLQUExQzs7T0FFS25CLFVBQVVxRyxZQUFmLEVBQThCOztjQUVuQkMsU0FBVixHQUFzQjdCLE9BQU84QixJQUE3QjtjQUNVQyxRQUFWLEdBQXFCL0IsT0FBT2dDLEdBQTVCOztjQUVVSixZQUFWLENBQXdCOUYsU0FBeEI7O1lBRVFtRyxnQkFBUixDQUF5QkMsUUFBekIsR0FBb0NwRyxVQUFVcUcsb0JBQTlDO1lBQ1FGLGdCQUFSLENBQXlCQyxRQUF6QixHQUFvQ3BHLFVBQVVzRyxxQkFBOUM7SUFSRCxNQVVPOztZQUVFSCxnQkFBUixHQUEyQkksZ0JBQWlCN0UsV0FBVzhFLFdBQTVCLEVBQXlDLElBQXpDLEVBQStDdEMsT0FBTzhCLElBQXRELEVBQTREOUIsT0FBT2dDLEdBQW5FLENBQTNCO1lBQ1FDLGdCQUFSLEdBQTJCSSxnQkFBaUJoQyxXQUFXaUMsV0FBNUIsRUFBeUMsSUFBekMsRUFBK0N0QyxPQUFPOEIsSUFBdEQsRUFBNEQ5QixPQUFPZ0MsR0FBbkUsQ0FBM0I7Ozs7T0FLSS9CLFlBQUwsRUFBb0I7O2lCQUVOc0MsUUFBYixDQUFzQkMsR0FBdEIsQ0FBMkI1RyxZQUFZNkcsQ0FBdkMsRUFBMEM3RyxZQUFZOEcsQ0FBdEQsRUFBeUQ5RyxZQUFZeUIsS0FBckUsRUFBNEV6QixZQUFZMEIsTUFBeEY7aUJBQ2FxRixPQUFiLENBQXFCSCxHQUFyQixDQUEwQjVHLFlBQVk2RyxDQUF0QyxFQUF5QzdHLFlBQVk4RyxDQUFyRCxFQUF3RDlHLFlBQVl5QixLQUFwRSxFQUEyRXpCLFlBQVkwQixNQUF2RjtJQUhELE1BS087O2FBRUdzRixXQUFULENBQXNCaEgsWUFBWTZHLENBQWxDLEVBQXFDN0csWUFBWThHLENBQWpELEVBQW9EOUcsWUFBWXlCLEtBQWhFLEVBQXVFekIsWUFBWTBCLE1BQW5GO2FBQ1N1RixVQUFULENBQXFCakgsWUFBWTZHLENBQWpDLEVBQW9DN0csWUFBWThHLENBQWhELEVBQW1EOUcsWUFBWXlCLEtBQS9ELEVBQXNFekIsWUFBWTBCLE1BQWxGOztZQUdRd0MsTUFBVCxDQUFpQkMsS0FBakIsRUFBd0JOLE9BQXhCLEVBQWlDUSxZQUFqQyxFQUErQ0MsVUFBL0M7OztPQUdLRCxZQUFMLEVBQW9COztpQkFFTnNDLFFBQWIsQ0FBc0JDLEdBQXRCLENBQTJCM0csWUFBWTRHLENBQXZDLEVBQTBDNUcsWUFBWTZHLENBQXRELEVBQXlEN0csWUFBWXdCLEtBQXJFLEVBQTRFeEIsWUFBWXlCLE1BQXhGO2lCQUNhcUYsT0FBYixDQUFxQkgsR0FBckIsQ0FBMEIzRyxZQUFZNEcsQ0FBdEMsRUFBeUM1RyxZQUFZNkcsQ0FBckQsRUFBd0Q3RyxZQUFZd0IsS0FBcEUsRUFBMkV4QixZQUFZeUIsTUFBdkY7SUFIRCxNQUtPOzthQUVHc0YsV0FBVCxDQUFzQi9HLFlBQVk0RyxDQUFsQyxFQUFxQzVHLFlBQVk2RyxDQUFqRCxFQUFvRDdHLFlBQVl3QixLQUFoRSxFQUF1RXhCLFlBQVl5QixNQUFuRjthQUNTdUYsVUFBVCxDQUFxQmhILFlBQVk0RyxDQUFqQyxFQUFvQzVHLFlBQVk2RyxDQUFoRCxFQUFtRDdHLFlBQVl3QixLQUEvRCxFQUFzRXhCLFlBQVl5QixNQUFsRjs7WUFHUXdDLE1BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCRixPQUF4QixFQUFpQ0ksWUFBakMsRUFBK0NDLFVBQS9DOztPQUVLRCxZQUFMLEVBQW9COztpQkFFTnNDLFFBQWIsQ0FBc0JDLEdBQXRCLENBQTJCLENBQTNCLEVBQThCLENBQTlCLEVBQWlDOUIsS0FBS3JELEtBQXRDLEVBQTZDcUQsS0FBS3BELE1BQWxEO2lCQUNhcUYsT0FBYixDQUFxQkgsR0FBckIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0M5QixLQUFLckQsS0FBckMsRUFBNENxRCxLQUFLcEQsTUFBakQ7aUJBQ2E0RCxXQUFiLEdBQTJCLEtBQTNCO2FBQ1NELGVBQVQsQ0FBMEIsSUFBMUI7SUFMRCxNQU9POzthQUVHMkIsV0FBVCxDQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QmxDLEtBQUtyRCxLQUFqQyxFQUF3Q3FELEtBQUtwRCxNQUE3QzthQUNTNkQsY0FBVCxDQUF5QixLQUF6Qjs7O09BSUloQixVQUFMLEVBQWtCOztVQUVYQSxVQUFOLEdBQW1CLElBQW5COzs7T0FJSXhELE1BQU02QyxlQUFYLEVBQTZCOztVQUV0QkQsV0FBTjs7Ozs7Ozs7V0FVT08sTUFBVCxDQUFpQkMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDQyxZQUFoQyxFQUE4Q0MsVUFBOUM7RUFoS0Q7O01Bb0tLNEMsT0FBTCxHQUFlLFlBQVk7O1NBRW5CQyxtQkFBUCxDQUE0Qix3QkFBNUIsRUFBc0QzRSx3QkFBdEQsRUFBZ0YsS0FBaEY7RUFGRDs7OztVQVFTNEUsbUJBQVQsQ0FBOEJDLEdBQTlCLEVBQW9DOztNQUUvQkMsVUFBVSxPQUFRRCxJQUFJRSxPQUFKLEdBQWNGLElBQUlHLFFBQTFCLENBQWQ7TUFDSUMsV0FBVyxDQUFFSixJQUFJRSxPQUFKLEdBQWNGLElBQUlHLFFBQXBCLElBQWlDRixPQUFqQyxHQUEyQyxHQUExRDtNQUNJSSxVQUFVLE9BQVFMLElBQUlNLEtBQUosR0FBWU4sSUFBSU8sT0FBeEIsQ0FBZDtNQUNJQyxXQUFXLENBQUVSLElBQUlNLEtBQUosR0FBWU4sSUFBSU8sT0FBbEIsSUFBOEJGLE9BQTlCLEdBQXdDLEdBQXZEO1NBQ08sRUFBRTVHLE9BQU8sQ0FBRXdHLE9BQUYsRUFBV0ksT0FBWCxDQUFULEVBQStCL0MsUUFBUSxDQUFFOEMsUUFBRixFQUFZSSxRQUFaLENBQXZDLEVBQVA7OztVQUlRQyxtQkFBVCxDQUE4QlQsR0FBOUIsRUFBbUNVLFdBQW5DLEVBQWdEQyxLQUFoRCxFQUF1REMsSUFBdkQsRUFBOEQ7O2dCQUUvQ0YsZ0JBQWdCckYsU0FBaEIsR0FBNEIsSUFBNUIsR0FBbUNxRixXQUFqRDtVQUNRQyxVQUFVdEYsU0FBVixHQUFzQixJQUF0QixHQUE2QnNGLEtBQXJDO1NBQ09DLFNBQVN2RixTQUFULEdBQXFCLE9BQXJCLEdBQStCdUYsSUFBdEM7O01BRUlDLGtCQUFrQkgsY0FBYyxDQUFFLEdBQWhCLEdBQXNCLEdBQTVDOzs7TUFHSUksT0FBTyxJQUFJQyxPQUFKLEVBQVg7TUFDSUMsSUFBSUYsS0FBSzdCLFFBQWI7OztNQUdJZ0MsaUJBQWlCbEIsb0JBQXFCQyxHQUFyQixDQUFyQjs7O0lBR0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQmlCLGVBQWV4SCxLQUFmLENBQXNCLENBQXRCLENBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQixHQUFqQjtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUJ3SCxlQUFlM0QsTUFBZixDQUF1QixDQUF2QixJQUE2QnVELGVBQTlDO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQixHQUFqQjs7Ozs7SUFLRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQkksZUFBZXhILEtBQWYsQ0FBc0IsQ0FBdEIsQ0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLENBQUV3SCxlQUFlM0QsTUFBZixDQUF1QixDQUF2QixDQUFGLEdBQStCdUQsZUFBaEQ7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCOzs7SUFHRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQixHQUFqQjtJQUNHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUJELFFBQVNELFFBQVFDLElBQWpCLElBQTBCLENBQUVDLGVBQTdDO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFtQkQsT0FBT0QsS0FBVCxJQUFxQkEsUUFBUUMsSUFBN0IsQ0FBakI7OztJQUdHLElBQUksQ0FBSixHQUFRLENBQVgsSUFBaUIsR0FBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCO0lBQ0csSUFBSSxDQUFKLEdBQVEsQ0FBWCxJQUFpQkMsZUFBakI7SUFDRyxJQUFJLENBQUosR0FBUSxDQUFYLElBQWlCLEdBQWpCOztPQUVLSyxTQUFMOztTQUVPSixJQUFQOzs7VUFJUTFCLGVBQVQsQ0FBMEJZLEdBQTFCLEVBQStCVSxXQUEvQixFQUE0Q0MsS0FBNUMsRUFBbURDLElBQW5ELEVBQTBEOztNQUVyRE8sVUFBVXJELEtBQUtzRCxFQUFMLEdBQVUsS0FBeEI7O01BRUlDLFVBQVU7VUFDTnZELEtBQUt3RCxHQUFMLENBQVV0QixJQUFJdUIsU0FBSixHQUFnQkosT0FBMUIsQ0FETTtZQUVKckQsS0FBS3dELEdBQUwsQ0FBVXRCLElBQUl3QixXQUFKLEdBQWtCTCxPQUE1QixDQUZJO1lBR0pyRCxLQUFLd0QsR0FBTCxDQUFVdEIsSUFBSXlCLFdBQUosR0FBa0JOLE9BQTVCLENBSEk7YUFJSHJELEtBQUt3RCxHQUFMLENBQVV0QixJQUFJMEIsWUFBSixHQUFtQlAsT0FBN0I7R0FKWDs7U0FPT1Ysb0JBQXFCWSxPQUFyQixFQUE4QlgsV0FBOUIsRUFBMkNDLEtBQTNDLEVBQWtEQyxJQUFsRCxDQUFQOztDQWhkSzs7QUNqQlA7Ozs7Ozs7QUFPQSxBQUFPLElBQU1lLFFBQVE7O2NBRVAsdUJBQVk7O1VBRWhCcEksSUFBUixDQUFjLDZFQUFkO1NBQ09KLFVBQVVDLGFBQVYsS0FBNEJpQyxTQUFuQztFQUxtQjs7b0JBU0QsNkJBQVk7O1NBRXZCLElBQUlNLE9BQUosQ0FBYSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUE0Qjs7T0FFMUMxQyxVQUFVQyxhQUFWLEtBQTRCaUMsU0FBakMsRUFBNkM7O2NBRWxDakMsYUFBVixHQUEwQkMsSUFBMUIsQ0FBZ0MsVUFBV0osUUFBWCxFQUFzQjs7U0FFaERBLFNBQVNDLE1BQVQsS0FBb0IsQ0FBekIsRUFBNkI7O2FBRXBCLDJDQUFSO01BRkQsTUFJTzs7OztLQU5SO0lBRkQsTUFnQk87O1dBRUUsc0dBQVI7O0dBcEJLLENBQVA7RUFYbUI7O2VBdUNOLHNCQUFXMEksU0FBWCxFQUF1Qjs7TUFFL0IsbUJBQW1CekksU0FBeEIsRUFBb0M7O2FBRXpCQyxhQUFWLEdBQ0VDLElBREYsQ0FDUSxVQUFXSixRQUFYLEVBQXNCO2NBQ2pCQSxTQUFVLENBQVYsQ0FBWDtJQUZGOztFQTNDa0I7O2FBb0RSLHNCQUFZOztVQUVmTSxJQUFSLENBQWMsdUZBQWQ7O01BRUlzSSxPQUFKOztNQUVLMUksVUFBVUMsYUFBZixFQUErQjs7YUFFcEJBLGFBQVYsR0FBMEJDLElBQTFCLENBQWdDLFVBQVdKLFFBQVgsRUFBc0I7O1FBRWhEQSxTQUFTQyxNQUFULEtBQW9CLENBQXpCLEVBQTZCMkksVUFBVSwyQ0FBVjtJQUY5QjtHQUZELE1BUU87O2FBRUkscUdBQVY7OztNQUlJQSxZQUFZeEcsU0FBakIsRUFBNkI7O09BRXhCeUcsWUFBWUMsU0FBU0MsYUFBVCxDQUF3QixLQUF4QixDQUFoQjthQUNVQyxLQUFWLENBQWdCekQsUUFBaEIsR0FBMkIsVUFBM0I7YUFDVXlELEtBQVYsQ0FBZ0JDLElBQWhCLEdBQXVCLEdBQXZCO2FBQ1VELEtBQVYsQ0FBZ0JFLEdBQWhCLEdBQXNCLEdBQXRCO2FBQ1VGLEtBQVYsQ0FBZ0JHLEtBQWhCLEdBQXdCLEdBQXhCO2FBQ1VILEtBQVYsQ0FBZ0JJLE1BQWhCLEdBQXlCLEtBQXpCO2FBQ1VDLEtBQVYsR0FBa0IsUUFBbEI7O09BRUlDLFFBQVFSLFNBQVNDLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBWjtTQUNNQyxLQUFOLENBQVlPLFVBQVosR0FBeUIsWUFBekI7U0FDTVAsS0FBTixDQUFZUSxRQUFaLEdBQXVCLE1BQXZCO1NBQ01SLEtBQU4sQ0FBWVMsU0FBWixHQUF3QixRQUF4QjtTQUNNVCxLQUFOLENBQVlVLFVBQVosR0FBeUIsTUFBekI7U0FDTVYsS0FBTixDQUFZVyxlQUFaLEdBQThCLE1BQTlCO1NBQ01YLEtBQU4sQ0FBWVksS0FBWixHQUFvQixNQUFwQjtTQUNNWixLQUFOLENBQVlhLE9BQVosR0FBc0IsV0FBdEI7U0FDTWIsS0FBTixDQUFZYyxNQUFaLEdBQXFCLE1BQXJCO1NBQ01kLEtBQU4sQ0FBWWUsT0FBWixHQUFzQixjQUF0QjtTQUNNQyxTQUFOLEdBQWtCcEIsT0FBbEI7YUFDVXFCLFdBQVYsQ0FBdUJYLEtBQXZCOztVQUVPVCxTQUFQOztFQS9Ga0I7O3NCQXFHQyw2QkFBV0QsT0FBWCxFQUFxQjs7TUFFckNDLFlBQVlDLFNBQVNDLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBaEI7WUFDVUMsS0FBVixDQUFnQnpELFFBQWhCLEdBQTJCLFVBQTNCO1lBQ1V5RCxLQUFWLENBQWdCQyxJQUFoQixHQUF1QixHQUF2QjtZQUNVRCxLQUFWLENBQWdCRSxHQUFoQixHQUFzQixHQUF0QjtZQUNVRixLQUFWLENBQWdCRyxLQUFoQixHQUF3QixHQUF4QjtZQUNVSCxLQUFWLENBQWdCSSxNQUFoQixHQUF5QixLQUF6QjtZQUNVQyxLQUFWLEdBQWtCLFFBQWxCOztNQUVJQyxRQUFRUixTQUFTQyxhQUFULENBQXdCLEtBQXhCLENBQVo7UUFDTUMsS0FBTixDQUFZTyxVQUFaLEdBQXlCLFlBQXpCO1FBQ01QLEtBQU4sQ0FBWVEsUUFBWixHQUF1QixNQUF2QjtRQUNNUixLQUFOLENBQVlTLFNBQVosR0FBd0IsUUFBeEI7UUFDTVQsS0FBTixDQUFZVSxVQUFaLEdBQXlCLE1BQXpCO1FBQ01WLEtBQU4sQ0FBWVcsZUFBWixHQUE4QixNQUE5QjtRQUNNWCxLQUFOLENBQVlZLEtBQVosR0FBb0IsTUFBcEI7UUFDTVosS0FBTixDQUFZYSxPQUFaLEdBQXNCLFdBQXRCO1FBQ01iLEtBQU4sQ0FBWWMsTUFBWixHQUFxQixNQUFyQjtRQUNNZCxLQUFOLENBQVllLE9BQVosR0FBc0IsY0FBdEI7UUFDTUMsU0FBTixHQUFrQnBCLE9BQWxCO1lBQ1VxQixXQUFWLENBQXVCWCxLQUF2Qjs7U0FFT1QsU0FBUDtFQTVIbUI7O1lBZ0lULG1CQUFXa0IsT0FBWCxFQUFvQnBJLE1BQXBCLEVBQTZCOztNQUVsQyxjQUFjdUksS0FBZCxJQUF1QkgsbUJBQW1CRyxNQUFNaEwsUUFBckQsRUFBZ0U7O1dBRXZEb0ssS0FBUixDQUFlLDRDQUFmO1VBQ09SLFNBQVNDLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBUDs7O01BSUdvQixTQUFTckIsU0FBU0MsYUFBVCxDQUF3QixRQUF4QixDQUFiO1NBQ09DLEtBQVAsQ0FBYXpELFFBQWIsR0FBd0IsVUFBeEI7U0FDT3lELEtBQVAsQ0FBYUMsSUFBYixHQUFvQixrQkFBcEI7U0FDT0QsS0FBUCxDQUFhb0IsTUFBYixHQUFzQixNQUF0QjtTQUNPcEIsS0FBUCxDQUFhN0gsS0FBYixHQUFxQixPQUFyQjtTQUNPNkgsS0FBUCxDQUFhcUIsTUFBYixHQUFzQixHQUF0QjtTQUNPckIsS0FBUCxDQUFhYSxPQUFiLEdBQXVCLEtBQXZCO1NBQ09iLEtBQVAsQ0FBYXNCLE1BQWIsR0FBc0IsU0FBdEI7U0FDT3RCLEtBQVAsQ0FBYVcsZUFBYixHQUErQixNQUEvQjtTQUNPWCxLQUFQLENBQWFZLEtBQWIsR0FBcUIsTUFBckI7U0FDT1osS0FBUCxDQUFhTyxVQUFiLEdBQTBCLFlBQTFCO1NBQ09QLEtBQVAsQ0FBYVEsUUFBYixHQUF3QixNQUF4QjtTQUNPUixLQUFQLENBQWFTLFNBQWIsR0FBeUIsUUFBekI7U0FDT1QsS0FBUCxDQUFhdUIsU0FBYixHQUF5QixRQUF6QjtTQUNPdkIsS0FBUCxDQUFhSSxNQUFiLEdBQXNCLEtBQXRCOztNQUVLVyxPQUFMLEVBQWU7O1VBRVBTLFdBQVAsR0FBcUIsVUFBckI7VUFDT0MsT0FBUCxHQUFpQixZQUFZOztZQUVwQmxLLFlBQVIsR0FBdUJ3SixRQUFRL0csV0FBUixFQUF2QixHQUErQytHLFFBQVFqSCxjQUFSLENBQXdCLENBQUUsRUFBRUMsUUFBUXBCLE1BQVYsRUFBRixDQUF4QixDQUEvQztJQUZEOztVQU1PWSxnQkFBUCxDQUF5Qix3QkFBekIsRUFBbUQsWUFBWTs7V0FFdkRpSSxXQUFQLEdBQXFCVCxRQUFReEosWUFBUixHQUF1QixTQUF2QixHQUFtQyxVQUF4RDtJQUZELEVBSUcsS0FKSDtHQVRELE1BZU87O1VBRUNpSyxXQUFQLEdBQXFCLGVBQXJCOzs7U0FJTUwsTUFBUDs7O0NBOUtLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lNTztzQkFDYztRQUFiQyxNQUFhLHVFQUFKLEVBQUk7OztTQUNsQkEsTUFBTCxHQUFjQyxPQUFPQyxNQUFQLENBQWNGLE1BQWQsRUFBc0I7ZUFDekIsSUFEeUI7Y0FFMUI7S0FGSSxDQUFkOztTQUtLOUcsS0FBTCxHQUFhLElBQWI7U0FDS0MsTUFBTCxHQUFjLElBQWQ7U0FDS2dILE1BQUwsR0FBYyxJQUFkOzs7Ozs0QkFHTUMsVUFBUzs7O2VBQ1BDLE1BQVIsQ0FBZSxJQUFmOztVQUVJQyxXQUFXLEVBQWYsRUFBbUJDLFFBQVE1SyxJQUFSLENBQWEsaURBQWI7O1VBRWI2SyxZQUFZSixTQUFRSyxHQUFSLENBQVksV0FBWixDQUFsQjtVQUNNak0sV0FBVzRMLFNBQVFNLEdBQVIsQ0FBWSxVQUFaLENBQWpCOztVQUVNQyxTQUFTUCxTQUFRSyxHQUFSLENBQVksUUFBWixDQUFmOztXQUVLTixNQUFMLEdBQWMsSUFBSTVMLFFBQUosQ0FBYUMsUUFBYixDQUFkOztXQUVLMEUsS0FBTCxHQUFha0gsU0FBUU0sR0FBUixDQUFZLE9BQVosQ0FBYjtXQUNLdkgsTUFBTCxHQUFjaUgsU0FBUU0sR0FBUixDQUFZLFFBQVosQ0FBZDs7Z0JBRVVQLE1BQVYsQ0FBaUIsS0FBS0EsTUFBdEI7Ozs7YUFJT1MsV0FBUCxDQUFtQixVQUFDcEssS0FBRCxFQUFRQyxNQUFSLEVBQW1CO2NBQy9CMEosTUFBTCxDQUFZNUosT0FBWixDQUFvQixDQUFDQyxLQUFyQixFQUE0QixDQUFDQyxNQUE3QjtPQURGOzs7b0JBSzBCLEtBQUt1SixNQXhCaEI7VUF3QlIvQixPQXhCUSxXQXdCUkEsT0F4QlE7VUF3QkN1QixNQXhCRCxXQXdCQ0EsTUF4QkQ7OztVQTBCWHZCLE9BQUosRUFBYUYsTUFBTThDLGlCQUFOLEdBQTBCbkwsS0FBMUIsQ0FBZ0MsbUJBQVc7aUJBQ2hEb0wsSUFBVCxDQUFjeEIsV0FBZCxDQUEwQnZCLE1BQU1nRCxtQkFBTixDQUEwQjlDLE9BQTFCLENBQTFCO09BRGM7O1VBSVR1QixNQUFKLEVBQVl6QixNQUFNM0gsWUFBTixDQUFtQixtQkFBVztZQUNsQzRLLFFBQVFqRCxNQUFNa0QsU0FBTixDQUFnQjdCLE9BQWhCLEVBQXlCNUssU0FBU3lDLFVBQWxDLENBQWQ7Y0FDTWlLLFNBQU4sR0FBa0IsUUFBbEI7O2lCQUVTSixJQUFULENBQWN4QixXQUFkLENBQTBCMEIsS0FBMUI7T0FKVTs7Ozs7O0lBU0hHO3VCQUNHOzs7U0FDUC9CLE9BQUwsR0FBZSxJQUFJckgsT0FBSixDQUFZO2FBQVdnRyxNQUFNM0gsWUFBTixDQUFtQjtlQUFXNEIsUUFBUW9ILE9BQVIsQ0FBWDtPQUFuQixDQUFYO0tBQVosQ0FBZjs7Ozs7NEJBR01nQixXQUFTO2dCQUNQQyxNQUFSLENBQWUsSUFBZjs7VUFFTTdMLFdBQVc0TCxVQUFRTSxHQUFSLENBQVksVUFBWixDQUFqQjtlQUNTVSxFQUFULENBQVlDLE9BQVosR0FBc0IsSUFBdEI7Y0FDUUMsR0FBUixDQUFZaEIsUUFBWjtjQUNRZ0IsR0FBUixDQUFZLENBQVo7O1dBRUtsQyxPQUFMLENBQWEzSixJQUFiLENBQWtCLG1CQUFXO2lCQUNsQjJMLEVBQVQsQ0FBWUcsU0FBWixDQUFzQm5DLE9BQXRCOztZQUVNNEIsUUFBUWpELE1BQU1rRCxTQUFOLENBQWdCN0IsT0FBaEIsRUFBeUI1SyxTQUFTeUMsVUFBbEMsQ0FBZDtjQUNNaUssU0FBTixHQUFrQixRQUFsQjs7aUJBRVNKLElBQVQsQ0FBY3hCLFdBQWQsQ0FBMEIwQixLQUExQjtPQU5GOzs7Ozs7SUFXU1EsVUFBYjs7OzRCQUM0QztRQUE3QkMsTUFBNkIsUUFBN0JBLE1BQTZCO1FBQXJCaE4sT0FBcUIsUUFBckJBLE9BQXFCO1FBQVppTixTQUFZLFFBQVpBLFNBQVk7OztRQUNsQ0MsV0FBVyxJQUFJQyxnQkFBSixDQUFxQkgsT0FBT0ksTUFBNUIsRUFBb0NwTixPQUFwQyxDQUFqQjs7YUFFU3FOLFFBQVQsR0FBb0IsSUFBcEI7YUFDU2pNLEtBQVQsR0FBaUI2TCxTQUFqQjs7a0hBRU0sRUFBQ0Msa0JBQUQsRUFOa0M7Ozs7RUFEWkksY0FBaEM7Ozs7In0=
