/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Watch = function (queue) {
  'use strict';

  this._queue = Array.isArray(queue) ? queue : [];

  return this;
}

WHS.Watch.prototype.add = function (element) {
  'use strict';

  this._queue.push(element);

  return this;
}

WHS.Watch.prototype.remove = function (element) {
  'use strict';

  this._queue = this._queue.filter(function (item) {
    return item != element;
  });

  return this;
}
