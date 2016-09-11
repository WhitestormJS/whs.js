define(['whs'], function(WHS) {
  describe('PostProcessor', () => {
    const world = new WHS.World({init: {renderer: false}});

    function describeAttribute(postprocessor, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => postprocessor[name].set(1, 1, 1));

        it('Setter', () => {
          postprocessor[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            postprocessor[name][dims.charAt(i)] = 3;
        });

        //it('=== Values are equal ===', () => postprocessor.position === postprocessor.native.position);
      });
    }

    function testAPI(postprocessor) {
      it('#createPass()', () => postprocessor.createPass(() => {return new Pass();}));
      it('#getPass()', () => postprocessor.getPass('name'));
      it('#createRenderPass()', () => postprocessor.createRenderPass(false));
      it('#getRenderPass()', () => postprocessor.getRenderPass());
      it('#removePass()', () => postprocessor.removePass());
      it('#setContainerConfig()', () => postprocessor.setContainerConfig(world.container));
      it('#setRenderScene()', () => postprocessor.setRenderScene(new THREE.Scene(), new THREE.PerspectiveCamera()));
      it('#render()', () => postprocessor.render(0));
    }

    context('Should wrap EffectComposer and Pass', () => {
      const postprocessor = new WHS.PostProcessor();

      testAPI(postprocessor);
    });
  });
});
