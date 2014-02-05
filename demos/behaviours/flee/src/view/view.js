/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 16:00
 * To change this template use File | Settings | File Templates.
 */
(function(demo) {

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
        this.image.src = "../../assets/cat.png";

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 20 + (Math.random() * 10), context));
        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 20 + (Math.random() * 10), context));
        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 20 + (Math.random() * 10), context));
        this.array.push(new Character(new Vector2d(0 + (Math.random() * 400), 0 + (Math.random() * 400)), 20 + (Math.random() * 10), context));

        canvas.width = View.CANVAS_WIDTH;
        canvas.height = View.CANVAS_HEIGHT;

        target.appendChild(canvas);

        var self = this;
        function tick(time) {
            context.save();
            context.clearRect(0, 0, View.CANVAS_WIDTH, View.CANVAS_HEIGHT);

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

    View.prototype = {
        dispose : function() {
            this.element.removeChild(this.element.firstChild);
        }
    };

    View.CANVAS_WIDTH = 500;

    View.CANVAS_HEIGHT = 500;

    demo.View = View;
})(window.demo = window.demo || {});
