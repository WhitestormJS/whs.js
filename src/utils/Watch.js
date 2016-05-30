class Watch {
  constructor(queue) {
    this._queue = Array.isArray(queue) ? queue.slice() : [];
  }

  add(element) {
    this._queue.push(element);
  }

  remove(element) {
    this._queue = this._queue.filter(function (item) {
      return item !== element;
    });
  }
}

export {
  Watch as default
};
