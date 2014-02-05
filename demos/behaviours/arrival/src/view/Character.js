/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 03/02/2014
 * Time: 12:16
 * To change this template use File | Settings | File Templates.
 */
'use strict'

var Character = function(position, mass, context) {
    this.initialise(position, mass, context);
};

Character.prototype = {

    image : null,

    boid : null,

    initialise : function(position, mass, context) {
        this.boid = new Boid(position, mass);
        this.loadImage();
    },

    loadImage : function() {
        var self = this;
        this.image = new Image();
        this.image.onload = function() {
            context.drawImage(self.image, 50, 50);
        }
        this.image.src = "../assets/dog.png";
    },

    update : function() {
        this.boid.update();
    },

    draw : function(context) {
        var self = this;
        var boid = this.boid;

        var halfWidth = self.image.width / 2;
        var halfHeight = self.image.height / 2;
        var desiredX = boid.position._x;
        var desiredY = boid.position._y;

        drawSelf(context);
        drawForces(context);

        function drawSelf(context) {
            context.drawImage(self.image, boid.position._x - halfWidth, boid.position._y - halfHeight);
        }

        function drawForces(context) {
            var velocity = boid.velocity.clone();
            velocity.normalize();
            drawForceVector(context, velocity, '#0000FF');
        }

        function drawForceVector(context, vector, colour) {
            context.lineWidth = 5.0;
            context.strokeStyle = colour;
            context.beginPath();
            context.moveTo(desiredX, desiredY);
            context.lineTo(desiredX + vector._x * 100, desiredY + vector._y * 100);
            context.closePath();
            context.stroke();
        }
    },

    updateTarget : function(target) {
        this.boid.target = target;
    }
}
