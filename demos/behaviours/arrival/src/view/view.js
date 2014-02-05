/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 16:00
 * To change this template use File | Settings | File Templates.
 */
(function(arrival) {

    'use strict'

    var View = function(target) {

        this.element = target;
        this.update = tick.bind(this);
        this.array = [];
        this.mouseX = 0;
        this.mouseY = 0;

        this.image = new Image();
        this.image.onload = function() {
            context.drawImage(self.image, 50, 50);
        }
        this.image.src = "../assets/cat.png";

        var radius = 1000;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 10, context));
        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 0 + (Math.random() * 20), context));

        canvas.width = canvas.height = radius;
        target.appendChild(canvas);

        var self = this;
        function tick(time) {
            context.save();
            context.clearRect(0,0,1000,1000);

            var halfWidth = self.image.width / 2;
            var halfHeight = self.image.height / 2;
            context.drawImage(self.image, self.mouseX - halfWidth, self.mouseY - halfHeight);
            var length = self.array.length;
            for(var i = 0; i < length; i++)	{
                var character = self.array[i];
                character.draw(context);
                character.update();
            }

            context.restore();
        }

        function setMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            self.mouseX = evt.clientX - rect.left;
            self.mouseY = evt.clientY - rect.top;

            var length = self.array.length;
            for(var i = 0; i < length; i++)	{
                var character = self.array[i];
                character.updateTarget(new Vector2d(self.mouseX, self.mouseY))
            }
        }

        canvas.addEventListener('mousemove', function(evt) {
            setMousePos(canvas, evt);
        }, false);
    };

    View.prototype.dispose = function() {
        this.element.removeChild(this.element.firstChild);
    };

    arrival.View = View;
})(window.arrival = window.arrival || {});
