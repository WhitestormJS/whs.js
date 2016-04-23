"use strict";

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
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
}

/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

/**
 * Wagner.
 *
 * @param {Object} type Type of wagner effect. (REQUIRED)
 * @param {Object} params Parameters. (OPTIONAL)
 * @return {Object} Scope.
 */

WHS.Wagner = function(_WHS$Object) {
    _inherits(Wagner, _WHS$Object);

    function Wagner(scope) {
        _classCallCheck(this, Wagner);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wagner).call(this));

        scope._composer = new WAGNER.Composer(scope._renderer);

        scope._composer.setSize(+(scope.__params.width * scope.__params.rWidth).toFixed(), +(scope.__params.height * scope.__params.rHeight).toFixed());

        scope._composer.autoClearColor = true;

        scope._composer.reset();
        scope._composer.render(scope.scene, scope._camera.camera);

        scope._composer.stack = new WAGNER.Stack(new WAGNER.ShadersPool());

        _this.setParams({
            composer: scope._composer
        });

        return _this;
    }

    _createClass(Wagner, [{
        key: "add",
        value: function add(type, params) {

            'use strict';

            var target = WHS.API.extend(params, {
                hex: 0x000000,
                near: 0.015,
                far: 1000,
                density: 0.00025
            });

            switch (type) {
                case "ZoomBlurPass":

                    target = WHS.API.extend(target, {
                        strength: .05,

                        center: {
                            x: .5 * this.__params.composer.width,
                            y: .5 * this.__params.composer.height
                        }
                    });

                    break;

                case "MultiPassBloomPass":

                    target = WHS.API.extend(target, {
                        strength: .5,
                        blurAmount: 1.32,
                        applyZoomBlur: true,
                        zoomBlurStrength: 0.84,
                        useTexture: true,

                        center: {
                            x: .5 * this.__params.composer.width,
                            y: .5 * this.__params.composer.height
                        }
                    });

                    break;

                case "VignettePass":

                    target = WHS.API.extend(target, {
                        amount: 0.7,
                        falloff: 0.2
                    });

                    break;

                case "DirectionalBlurPass":

                    target = WHS.API.extend(target, {
                        delta: 0.1
                    });

                    break;

                case "MotionBlurPass":

                    target = WHS.API.extend(target, {
                        delta: 0
                    });

                    break;

                case "ASCIIPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "DotScreenPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "FxaaPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "ChromaticAberrationPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "DirtPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "EdgeDetectionPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "HighPassPass":

                    // TODO: Params defaults for this effect.

                    break;

                case "GrayscalePass":

                    // TODO: Params defaults for this effect.

                    break;

                case "HalftonePass":

                    // TODO: Params defaults for this effect.

                    break;

                case "InvertPass":

                    // TODO: Params defaults for this effect.

                    break;

                default:
                    console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");

                    return;
            }

            this.__params.composer.stack.addPass(type, true, target);

            return this;
        }
    }]);

    return Wagner;
}(WHS.Object);

WHS.World.prototype.Wagner = function() {
    return new WHS.Wagner(this);
};