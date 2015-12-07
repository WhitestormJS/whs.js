(function($) {
    if ("undefined" !== typeof $.event) {
        $.event.special.mousestop = {
            setup: function(data) {
                $(this).data('mousestop', _data(data))
                    .bind('mouseenter.mousestop', _mouseenter)
                    .bind('mouseleave.mousestop', _mouseleave)
                    .bind('mousemove.mousestop', _mousemove);
            },
            teardown: function() {
                $(this).removeData('mousestop')
                    .unbind('.mousestop');
            }
        };

        function _mouseenter() {
            var _self = this,
                data = $(this).data('mousestop');

            this.movement = true;

            if (data.timeToStop) {
                this.timeToStopTimer = window.setTimeout(function() {
                    _self.movement = false;
                    window.clearTimeout(_self.timer);
                }, data.timeToStop);
            }
        }

        function _mouseleave() {
            window.clearTimeout(this.timer);
            window.clearTimeout(this.timeToStopTimer);
        }

        function _mousemove() {
            var $el = $(this),
                data = $el.data('mousestop');

            if (this.movement) {
                window.clearTimeout(this.timer);
                this.timer = window.setTimeout(function() {
                    $el.trigger('mousestop');
                }, data.delay);
            }
        }

        function _data(data) {
            if ($.isNumeric(data)) {
                data = {
                    delay: data
                };
            } else if (typeof data !== 'object') {
                data = {};
            }

            return $.extend({}, $.fn.mousestop.defaults, data);
        }

        $.fn.mousestop = function(data, fn) {
            if (typeof data === 'function') {
                fn = data;
            }
            return arguments.length > 0 ? this.bind('mousestop', data, fn) : this.trigger('mousestop');
        };

        $.fn.mousestop.defaults = {
            delay: 300,
            timeToStop: null
        };
    }
})(jQuery);