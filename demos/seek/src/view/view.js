/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 16:00
 * To change this template use File | Settings | File Templates.
 */
(function(seek) {

    'use strict'

    var View = function(target) {

        this.element = target;
        this.update = tick.bind(this);

        var radius = 500;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        this.boid = new DrawableBoid(new Vector2d(200,200), 35, canvas);

        canvas.width = canvas.height = radius;
        target.appendChild(canvas);

        function tick(time) {
            this.boid.update();
            this.boid.draw(context);
        }
    };

    View.prototype.dispose = function() {
        this.element.removeChild(this.element.firstChild);
    };

    seek.View = View;
})(window.seek = window.seek || {});
