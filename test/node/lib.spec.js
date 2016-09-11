const jsdom = require("jsdom").jsdom;
const document = jsdom("hello world");
const window = document.defaultView;

const WHS = require('../../lib/index');

const path_assets = '/base/test/_assets/';

describe('Test Lib folder', () => {
  const world = new WHS.World({
    autoresize: false,
    container: document.body,
    width: 100,
    height: 100,
    init: {renderer: false}
  }, window);

  it('Physics works', () => {
    const box = new WHS.Box();

    box.addTo(world);
    world.getScene().simulate(undefined, 1);
  });
});
