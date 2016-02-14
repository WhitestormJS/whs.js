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
WHS.init.prototype.addWagner = function( type, params ) {

    'use strict';

    params = params || {};

    var scope = {
        _composer: this._composer
    };

    var target = api.extend(params, {
        hex: 0x000000,
        near: 0.015,
        far: 1000,
        density: 0.00025
    });

    switch (type) {
        case "ZoomBlurPass":
            scope.effect = new WAGNER.ZoomBlurPass();

            target = api.extend(target, { 
                strength: .05,

                center: {
                    x: .5 * this._composer.width,
                    y: .5 * this._composer.height
                }
            });

            break;

        case "MultiPassBloomPass":
            scope.effect = new WAGNER.MultiPassBloomPass();

            target = api.extend(target, { 
                strength: .5,
                blurAmount: 1.32,
                applyZoomBlur: true,
                zoomBlurStrength: 0.84,
                useTexture: true,

                center: {
                    x: .5 * this._composer.width,
                    y: .5 * this._composer.height
                }
            });

            scope.effect.glowTexture = WAGNER.Pass.prototype.getOfflineTexture(
                this._composer.width,
                this._composer.height,
                false
            );

            break;

        case "VignettePass":
            scope.effect = new WAGNER.VignettePass();

            target = api.extend(target, { 
                amount: 0.7,
                falloff: 0.2
            });

            break;

        case "DirectionalBlurPass":
            scope.effect = new WAGNER.DirectionalBlurPass();

            target = api.extend(target, { delta: 0.1 });

            break;

        case "MotionBlurPass":
            scope.effect = new WAGNER.DirectionalBlurPass();

            scope.motionBlurEnable = true;

            target = api.extend(target, { delta: 0 });

            break;

        case "ASCIIPass":
            scope.effect = new WAGNER.ASCIIPass();

            break;

        case "DotScreenPass":
            scope.effect = new WAGNER.DotScreenPass();

            break;

        case "FxaaPass":
            scope.effect = new WAGNER.FXAAPass();

            break;

        case "ChromaticAberrationPass":
            scope.effect = new WAGNER.ChromaticAberrationPass();

            break;

        case "DirtPass":
            scope.effect = new WAGNER.DirtPass();

            break;

        case "EdgeDetectionPass":
            scope.effect = new WAGNER.SobelEdgeDetectionPass();

            break;

        case "HighPassPass":
            scope.effect = new WAGNER.HighPassPass();

            break;
            
        case "GrayscalePass":
            scope.effect = new WAGNER.GrayscalePass();

            break;
            
        case "HalftonePass":
            scope.effect = new WAGNER.HalftonePass();

            break;
            
        case "InvertPass":
            scope.effect = new WAGNER.InvertPass();

            break;

        default:
            console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");

            return;
    }

    scope.effect.params = target;

    this._composer.stack.addPass(type, true, target);

    return scope;
    
}

WHS.init.prototype.initWagner = function() {

    this._composer = new WAGNER.Composer(this._renderer);
    
    this._composer.setSize(this._settings.rWidth, this._settings.rHeight);
    this._composer.autoClearColor = true;

    this._composer.reset();
    this._composer.render(this.scene, this._camera);

    this._composer.stack = new WAGNER.Stack( new WAGNER.ShadersPool() );

}
