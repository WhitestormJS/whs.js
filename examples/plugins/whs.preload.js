WHS.gp.preloader = function() {

	var scope = {
		queue: [],
		ready: [],
		parent: false,

		element: $('.preloader'),

		done: function() {
			console.log("Objects loaded!");
			$(scope.element).fadeOut("slow");
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

