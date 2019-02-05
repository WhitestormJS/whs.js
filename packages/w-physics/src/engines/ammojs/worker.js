import CMD from './commands';

const transferableMessage = self.webkitPostMessage || self.postMessage;

new class AmmoBackend {
  constructor() {
    self.onmessage = ({data}) => {
      switch (data[0] || data.cmd) {
        case CMD.INITIALIZE:
          this.initialize(data.data.path);
          transferableMessage(true);
          break;
        default:

      }
    };
  }

  initialize(ammoPath) {
    importScripts(ammoPath);
  }
}
