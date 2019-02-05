import AmmoWorker from 'worker!./worker.js';
import CMD from './commands';

export class AmmoEngine {
  static CMD = CMD;
  static ArrayBuffer = SharedArrayBuffer || ArrayBuffer;
  isShared = AmmoEngine.ArrayBuffer instanceof SharedArrayBuffer;

  constructor(options) {
    this.worker = new AmmoWorker();
    this.worker.transferableMessage = this.worker.webkitPostMessage || this.worker.postMessage;
    this.send(CMD.INITIALIZE, options);
  }

  send(command, data) {
    if (Array.isArray(data)) {
      this.sendBuffer(command, data);
      return;
    }

    this.worker.transferableMessage({
      cmd: CMD.INITIALIZE,
      data
    });
  }

  sendBuffer(command, data = []) {
    const buffer = this.buffer = new AmmoEngine.ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * (data.length + 1));
    const array = this.array = new Float32Array(buffer);
    array[0] = command;

    array.set(data, 1);
    this.worker.transferableMessage(array, buffer);
  }
}
