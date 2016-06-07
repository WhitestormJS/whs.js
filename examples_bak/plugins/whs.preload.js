/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

var Preloader = function() {

	var scope = {
		queue: [],
		ready: [],
		parent: false,

		element: document.querySelector('.preloader'),

		done: function() {
			console.log("Objects loaded!");
			setTimeout(function() { scope.element.fadeOut(1) }, 1000);
		},

		check: function(...objects) {

			if (objects.length > 0) {

				objects.forEach(function(object) {
					scope.queue.push(object);
				});

				scope.queue.forEach(function(object) {
					object.ready.on("ready", function() {
						scope.ready.push(object);

						if(scope.queue.length == scope.ready.length)
							scope.done();
					
					});
				});

			} else {
				scope.done();
			}

		}
	};

	return scope;

}

