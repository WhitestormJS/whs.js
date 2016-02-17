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

WHS.Wagner = function() {
    function Wagner(scope) {
        _classCallCheck(this, Wagner);

        scope._composer = new WAGNER.Composer(scope._renderer);

        scope._composer.setSize(+(window.innerWidth * scope._settings.rWidth).toFixed(), +(window.innerHeight * scope._settings.rHeight).toFixed());

        scope._composer.autoClearColor = true;

        scope._composer.reset();
        scope._composer.render(scope.scene, scope._camera);

        scope._composer.stack = new WAGNER.Stack(new WAGNER.ShadersPool());

        this._settings = {
            composer: scope._composer
        };
    }

    _createClass(Wagner, [{
        key: "add",
        value: function add(type, params) {

            'use strict';

            var target = api.extend(params, {
                hex: 0x000000,
                near: 0.015,
                far: 1000,
                density: 0.00025
            });

            switch (type) {
                case "ZoomBlurPass":

                    target = api.extend(target, {
                        strength: .05,

                        center: {
                            x: .5 * this._settings.composer.width,
                            y: .5 * this._settings.composer.height
                        }
                    });

                    break;

                case "MultiPassBloomPass":

                    target = api.extend(target, {
                        strength: .5,
                        blurAmount: 1.32,
                        applyZoomBlur: true,
                        zoomBlurStrength: 0.84,
                        useTexture: true,

                        center: {
                            x: .5 * this._settings.composer.width,
                            y: .5 * this._settings.composer.height
                        }
                    });

                    break;

                case "VignettePass":

                    target = api.extend(target, {
                        amount: 0.7,
                        falloff: 0.2
                    });

                    break;

                case "DirectionalBlurPass":

                    target = api.extend(target, {
                        delta: 0.1
                    });

                    break;

                case "MotionBlurPass":

                    target = api.extend(target, {
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

            this._settings.composer.stack.addPass(type, true, target);

            return this;
        }
    }]);

    return Wagner;
}();

WHS.init.prototype.Wagner = function() {
    return new WHS.Wagner(this);
};