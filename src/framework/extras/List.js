class List {
  constructor(queue) {
    this._array = Array.isArray(queue) ? queue.slice() : [];
  }

  add(element) {
    this._array.push(element);
  }

  remove(element) {
    this._array = this._array.filter((item) => {
      return item !== element;
    });
  }

  get() {
    return this._array;
  }
}

export {
  List
};
