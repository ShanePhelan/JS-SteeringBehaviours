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

        this.mouseX = 0;
        this.mouseY = 0;
        this.element = target;
        this.update = tick.bind(this);
        this.array = [];

        var radius = 500;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 35 + (Math.random() * 35), canvas));
        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 35 + (Math.random() * 35), canvas));

        canvas.width = canvas.height = radius;
        target.appendChild(canvas);

        var self = this;
        function tick(time) {
            context.save();
            context.clearRect(0,0,500,500);

            var length = self.array.length;
            for( var i = 0; i < length; i++)	{
                var character = self.array[i];
                character.draw(context);
                character.update();
            }

            drawTarget(context);
            context.restore();
        }

        function drawCharacters(func) {

        }

        function setMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            self.mouseX = evt.clientX - rect.left;
            self.mouseY = evt.clientY - rect.top;
        }

        canvas.addEventListener('mousemove', function(evt) {
            setMousePos(canvas, evt);
        }, false);
    };

    View.prototype.dispose = function() {
        this.element.removeChild(this.element.firstChild);
    };

    seek.View = View;
})(window.seek = window.seek || {});
