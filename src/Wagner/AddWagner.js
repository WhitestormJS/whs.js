/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Wagner.
 *
 * @param {Object} wagnerjs *WAGNER.JS*. (REQUIRED)
 * @param {Object} type Type of wagner effect. (REQUIRED)
 * @param {Object} params Parameters. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init.prototype.addWagner = function(wagnerjs, type, params) {

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
        case "zoomBlurPass":
            scope.effect = new wagnerjs.ZoomBlurPass();

            target = api.extend(target, { 
                strength: .05,

                center: {
                    x: .5 * this._composer.width,
                    y: .5 * this._composer.height
                }
            });

            break;

        case "multiPassBloomPass":
            scope.effect = new wagnerjs.MultiPassBloomPass();

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

            scope.effect.glowTexture = wagnerjs.Pass.prototype.getOfflineTexture(
                this._composer.width,
                this._composer.height,
                false
            );

            break;

        case "vignettePass":
            scope.effect = new wagnerjs.VignettePass();

            target = api.extend(target, { 
                amount: 0.7,
                falloff: 0.2
            });

            break;

        case "directionalBlurPass":
            scope.effect = new wagnerjs.DirectionalBlurPass();

            target = api.extend(target, { delta: 0.1 });

            break;

        case "motionBlurPass":
            scope.effect = new wagnerjs.DirectionalBlurPass();

            scope.motionBlurEnable = true;

            target = api.extend(target, { delta: 0 });

            break;

        case "ASCIIPass":
            scope.effect = new wagnerjs.ASCIIPass();

            break;

        case "dotScreenPass":
            scope.effect = new wagnerjs.DotScreenPass();

            break;

        case "fxaaPass":
            scope.effect = new wagnerjs.FXAAPass();

            break;

        case "chromaticAberrationPass":
            scope.effect = new wagnerjs.ChromaticAberrationPass();

            break;

        case "dirtPass":
            scope.effect = new wagnerjs.DirtPass();

            break;

        case "edgeDetectionPass":
            scope.effect = new wagnerjs.SobelEdgeDetectionPass();

            break;

        case "highPassPass":
            scope.effect = new wagnerjs.HighPassPass();

            break;
        case "grayscalePass":
            scope.effect = new wagnerjs.GrayscalePass();

            break;
        case "halftonePass":
            scope.effect = new wagnerjs.HalftonePass();

            break;
        case "invertPass":
            scope.effect = new wagnerjs.InvertPass();

            break;

        default:
            console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");

            return;
    }

    scope.effect.params = target;

    this._composer.pass(scope.effect);
    this._composer.toScreen();

    scope.apply = function() {
        this._composer.eff.push(scope.effect);

        return scope;
    }

    return scope;
    
}
