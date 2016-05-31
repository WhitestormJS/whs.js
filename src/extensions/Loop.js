import {Clock} from 'three';

class Loop {
  constructor(func) {
    this.func = func;
    this.clock = new Clock();
    this.enabled = false;
  }

  start() {

  }

  stop() {

  }

  remove() {

  }
}

// WHS.loop = (func) => {
//   this.loop = {
//     func: func,
//     id: WHS.loops.length,
//     clock: new Clock(),
//     enabled: false
//   };
//
//   WHS.loops.push(this.loop);
// }
//
// WHS.loop.prototype.start = () => {
//   this.loop.clock.start();
//   this.loop.enabled = true;
// };
//
// WHS.loop.prototype.stop = () => {
//   this.loop.clock.stop();
//   this.loop.enabled = false;
// };
//
// WHS.loop.prototype.remove = () => {
//   this.loop.clock.stop();
//   this.loop.enabled = false;
//
//   WHS.loops.filter((el) => el !== this.loop);
// };

export {
  Loop as default
};
