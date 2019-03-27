import {EffectComposer, RenderPass, EffectPass, ShaderPass} from "postprocessing";

export class EffectsModule {
  setup(app, {manager}) {
    manager.composer = new EffectComposer(manager.renderer);

    manager.renderFunc = clock => {
      manager.composer.render(clock.getDelta());
    };

    manager.effects = {
      render(renderToScreen = false) {
        console.log(manager.scene, manager.camera.native);
        const pass = new RenderPass(manager.scene, manager.camera.native);
        pass.renderToScreen = renderToScreen;

        manager.composer.addPass(pass);

        return manager.effects;
      },
      effect(effect, renderToScreen = false) {
        const pass = new EffectPass(manager.camera.native, effect);
        pass.renderToScreen = renderToScreen;

        manager.composer.addPass(pass);

        return manager.effects;
      },
      shader(shaderMaterial, renderToScreen = false, inputName = 'inputBuffer') {
        const pass = new ShaderPass(shaderMaterial, inputName);
        pass.renderToScreen = renderToScreen;

        manager.composer.addPass(pass);

        return manager.effects;
      }
    };
  }
}
