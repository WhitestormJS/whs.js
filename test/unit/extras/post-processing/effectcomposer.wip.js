define(['whs'], function(WHS) {
  describe('EffectComposer', () => {
    const world = new WHS.World({ modules: { rendering: false } });

    function describeAttribute(composer, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => composer[name].set(1, 1, 1));

        it('Setter', () => {
          composer[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            composer[name][dims.charAt(i)] = 3;
        });
      });
    }

    function testAPI(composer) {

      class DummyPass extends WHS.Pass {
        constructor(name) {super(name);}
        render() {}
      }

      it('#swapBuffers', () => composer.swapBuffers());
      it('#addPass', () => composer.addPass(new DummyPass('one')));
      it('#getPass', () => composer.getPass('one'));
      it('#getPassIndex', () => composer.getPassIndex(0));
      it('#addPassAfter', () => composer.addPassAfter('one', new DummyPass('two')));
      it('#insertPass', () => composer.insertPass(new DummyPass('three'), 1));
      it('#removePass', () => composer.removePass('one'));
      it('#render', () => composer.render(0));
      it('#reset', () => composer.reset(new THREE.WebGLRenderTarget(0, 0)));
      it('#setSize', () => composer.setSize(0, 0));
    }

    context('Automated EffectComposer tests', () => {
      const composer = new WHS.EffectComposer(world.renderer, new THREE.WebGLRenderTarget(0, 0));

      testAPI(composer);
    });
  });
});
