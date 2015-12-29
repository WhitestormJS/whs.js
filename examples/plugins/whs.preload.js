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

		element: $('.preloader'),

		done: function() {
			console.log("Objects loaded!");
			setTimeout(function() {$(scope.element).fadeOut("slow")}, 1000);
		},



		start: function(parent) {
			scope.parent = parent;
		},

		end: function() {
			scope.parent.children.forEach(function(object) {
				scope.queue.push(object);
			});

			scope.queue.forEach(function(object) {
				object._state.done(function() {
					scope.ready.push(object);

					if(scope.queue.length == scope.ready.length)
						scope.done();
				});
			});
		}
	};

	return scope;

}

