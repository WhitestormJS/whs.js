import Events from 'minivents';
import {extend} from '../utils/index';

class CoreObject extends Events {
  parent = null;
  params = {};
  children = [];
  static defaults = {};

  constructor() {
    super();

    // For decorators behavior.
    if (this.onRun) this.onRun();
  }

  updateParams(params = {}) {
    this.params = extend(params, this.params);
    return this.params;
  }

  add(children) {
    if (children.addTo)
      return children.addTo(this);
    else if (children instanceof Object) {
      return new Promise((resolve) => {
        children.parent = this;

        this.native.add(children.native);
        this.children.push(this);

        resolve();
      });
    }
  }

  remove(source) {
    this.native.remove(source.native);

    this.children.splice(this.children.indexOf(source), 1);
    source.parent = null;
    source.emit('remove');

    return this;
  }
}

export {
  CoreObject
};
