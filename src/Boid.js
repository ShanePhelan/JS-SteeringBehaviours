/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 30/01/2014
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */
    'use strict';

    var Boid = function(position, mass, canvas) {
        this.position = position || new Vector2d(200, 150);
        this.mass = mass || 10;
        this.velocity = new Vector2d(-1, 1);
        this.target = new Vector2d(250, 250);
        this.mouseX = 0;
        this.mouseY = 0;

        this.MAX_VELOCITY = 6;
        this.MAX_FORCE = 30;

        var self = this;
        function setMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            self.mouseX = evt.clientX - rect.left;
            self.mouseY = evt.clientY - rect.top;
        }

        canvas.addEventListener('mousemove', function(evt) {
            setMousePos(canvas, evt);
        }, false);
    };

    Boid.prototype.update = function() {
        this.target._x = this.mouseX;
        this.target._y = this.mouseY;

        this.velocity = this.target.subtract(this.position);
        this.velocity.normalize();
        this.velocity.scaleBy(this.MAX_VELOCITY);
        this.velocity.scaleBy(1 / this.mass);

        this.velocity.truncate(this.MAX_VELOCITY);
        this.position = this.position.add(this.velocity);
    };

    Boid.prototype.draw = function(context) {
        context.save();
        context.clearRect(0,0,500,500);
        this.drawTarget(context);
        this.drawSelf(context);
        this.drawForces(context);
        context.restore();
    };

    Boid.prototype.drawTarget = function(context) {
        context.lineWidth = 4.0;
        context.strokeStyle = '#FF0000';
        context.beginPath();
        context.arc(this.target._x, this.target._y, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
    };

    Boid.prototype.drawSelf = function(context) {
        context.lineWidth = 5.0;
        context.strokeStyle = '#0000FF';
        context.beginPath();
        context.arc(this.position._x, this.position._y, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
    };

    Boid.prototype.drawForces = function(context) {
        var velocity = this.velocity.clone();

        velocity.normalize();

        this.drawForceVector(context, velocity, '#00FF00');
    };

    Boid.prototype.drawForceVector = function(context, vector, colour) {
        context.lineWidth = 5.0;
        context.strokeStyle = colour;
        context.beginPath();
        context.moveTo(this.position._x, this.position._y);
        context.lineTo(this.position._x + vector._x * 100, this.position._y + vector._y * 100);
        context.closePath();
        context.stroke();
    };
