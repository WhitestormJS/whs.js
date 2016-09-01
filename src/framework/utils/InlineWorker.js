class InlineWorker {
  _blob = null;
  _worker = null;
  
  constructor(source) {
    if (typeof source !== 'function') {
      throw new TypeError('`source` must be a function');
    }
    
    this._createWorker(source);
  }
  
  getWorker() {
    return this._worker;
  }
  
  terminate() {
    if (this._worker !== null) {
      this._worker.terminate();
      this._worker = null;
    }
    
    if (this._blob !== null) {
      URL.revokeObjectURL(this._blob);
      this._blob = null;
    }
  }
  
  _createWorker(source) {
    const [, sourceStr] = source
      .toString()
      .match(/{([\w\W]*?)}/);
      
    this._createBlobURL(sourceStr);
    this._worker = new Worker(this._blob);
  }
  
  _createBlobURL(str) {
    const blob = new Blob([str], {type: 'text/javascript'});

    this._blob = URL.createObjectURL(blob);
  }
}

export {
  InlineWorker as default,
}