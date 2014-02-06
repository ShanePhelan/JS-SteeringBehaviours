/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 06/02/2014
 * Time: 17:22
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
        canvas.style.border = "2px solid #000000";
        var context = canvas.getContext('2d');
        var targetCharacter = new Character(new Vector2d(View.CANVAS_WIDTH / 2, View.CANVAS_HEIGHT / 2), 20 + (Math.random() * 20), context);

        for (var i = 0; i < View.NUMBER_OF_CHARACTERS; i++) {
            var x = Math.random() * View.CANVAS_WIDTH;
            var y = Math.random() * View.CANVAS_HEIGHT;
            var mass = 20 + (Math.random() * 20);
            this.array.push(new Character(new Vector2d(x, y), mass, context, targetCharacter));
        }

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

    View.NUMBER_OF_CHARACTERS = 1;

    View.CANVAS_WIDTH = 1000;

    View.CANVAS_HEIGHT = 500;

    demo.View = View;
})(window.demo = window.demo || {});
