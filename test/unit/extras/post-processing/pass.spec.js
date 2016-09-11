define(['whs'], function(WHS) {
  describe('Pass', () => {

    function describeAttribute(pass, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => pass[name].set(1, 1, 1));

        it('Setter', () => {
          pass[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            pass[name][dims.charAt(i)] = 3;
        });
      });
    }

    function testAPI(pass) {
      it('#setSize()', () => pass.setSize(0, 0));
      it('#render()', () => pass.render(0));
    }

    context('Automated Pass tests', () => {
      class DummyPass extends WHS.Pass {
        constructor(name) { super(name); }
        render() {}
      }

      const pass = new DummyPass('name');

      testAPI(pass);
    });
  });
});
