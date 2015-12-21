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
  var scope = {};

  //api.def(params.hex, 0x000000); //, this.hex);
  //api.def(params.near, 0.015); //, this.near);
  //api.def(params.far, 1000); //, this.far);
  //api.def(params.density, 0.00025); //, this.density);

  switch (type) {
    case "zoomBlurPass":
      scope.effect = new wagnerjs.ZoomBlurPass();
      scope.effect.params.strength = .05;

      scope.effect.params.center.set(
        .5 * this.composer.width,
        .5 * this.composer.height
      );

      this.composer.pass(scope.effect);
      break;

    case "multiPassBloomPass":
      scope.effect = new wagnerjs.MultiPassBloomPass();
      scope.effect.params.blurAmount = 1.32;
      scope.effect.params.strength = .5;
      scope.effect.params.applyZoomBlur = true;
      scope.effect.params.zoomBlurStrength = 0.84;
      scope.effect.params.useTexture = true;

      scope.effect.glowTexture = wagnerjs.Pass.prototype.getOfflineTexture(
        this.composer.width,
        this.composer.height,
        false
      );

      scope.effect.params.center.set(
        .5 * this.composer.width,
        .5 * this.composer.height
      );

      this.composer.pass(scope.effect);
      break;

    case "vignettePass":
      scope.effect = new wagnerjs.VignettePass();
      scope.effect.params.amount = 0.7;
      scope.effect.params.falloff = 0.2;
      this.composer.pass(scope.effect);
      break;

    case "directionalBlurPass":
      scope.effect = new wagnerjs.DirectionalBlurPass();
      scope.effect.params.delta = 0.1;
      this.composer.pass(scope.effect);
      break;

    case "motionBlurPass":
      scope.motionBlurEffect = new wagnerjs.DirectionalBlurPass();
      scope.motionBlurEnable = true;
      scope.motionBlurEffect.params.delta = 0;
      scope.effect = scope.motionBlurEffect;
      this.composer.pass(scope.effect);
      break;
    case "ASCIIPass":
      scope.effect = new wagnerjs.ASCIIPass();
      this.composer.pass(scope.effect);
      break;
    case "dotScreenPass":
      scope.effect = new wagnerjs.DotScreenPass();
      this.composer.pass(scope.effect);
      break;
    case "fxaaPass":
      scope.effect = new wagnerjs.FXAAPass();
      this.composer.pass(scope.effect);
      break;
    case "chromaticAberrationPass":
      scope.effect = new wagnerjs.ChromaticAberrationPass();
      this.composer.pass(scope.effect);
      break;
    case "dirtPass":
      scope.effect = new wagnerjs.DirtPass();
      this.composer.pass(scope.effect);
      break;
    case "edgeDetectionPass":
      scope.effect = new wagnerjs.SobelEdgeDetectionPass();
      this.composer.pass(scope.effect);
      break;
    case "highPassPass":
      scope.effect = new wagnerjs.HighPassPass();
      this.composer.pass(scope.effect);
      break;
    case "grayscalePass":
      scope.effect = new wagnerjs.GrayscalePass();
      this.composer.pass(scope.effect);
      break;
    case "halftonePass":
      scope.effect = new wagnerjs.HalftonePass();
      this.composer.pass(scope.effect);
      break;
    case "invertPass":
      scope.effect = new wagnerjs.InvertPass();
      this.composer.pass(scope.effect);
      break;
    default:
      console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");
      return;
  }

  //this.composer.eff.push(this.effect);
  this.composer.toScreen();

  scope.composer = this.composer;

  scope.apply = function() {
    this.composer.eff.push(scope.effect);
    return scope;
  }

  return scope;
}
