import _ from 'lodash';

export class Game {
  constructor(options) {
    this.world = new WHS.World(options.world);

    this.plane = new WHS.Plane(options.plane);
    this.plane.addTo(this.world);
  }

  start() {
    this.world.start();
  }
}
