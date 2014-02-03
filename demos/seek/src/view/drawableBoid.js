/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 03/02/2014
 * Time: 12:16
 * To change this template use File | Settings | File Templates.
 */
    'use strict'

    var DrawableBoid = function(position, mass, canvas) {
        Boid.call(position, mass);

        this.mouseX = 0;
        this.mouseY = 0;

        var self = this;
        function setMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            self.mouseX = self.target._x = evt.clientX - rect.left;
            self.mouseY = self.target._y = evt.clientY - rect.top;
        }

        canvas.addEventListener('mousemove', function(evt) {
            setMousePos(canvas, evt);
        }, false);
    };

    DrawableBoid.prototype = {
        __proto__ : Boid.prototype,

        draw : function(context) {
            context.save();
            context.clearRect(0,0,500,500);
            this.drawTarget(context);
            this.drawSelf(context);
            this.drawForces(context);
            context.restore();

            var drawTarget = function(context) {
                context.lineWidth = 4.0;
                context.strokeStyle = '#FF0000';
                context.beginPath();
                context.arc(this.target._x, this.target._y, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            };

            var drawSelf = function(context) {
                context.lineWidth = 5.0;
                context.strokeStyle = '#0000FF';
                context.beginPath();
                context.arc(this.position._x, this.position._y, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            };

            var drawForces = function(context) {
                var velocity = this.velocity.clone();
                velocity.normalize();
                this.drawForceVector(context, velocity, '#00FF00');
            };

            var drawForceVector = function(context, vector, colour) {
                context.lineWidth = 5.0;
                context.strokeStyle = colour;
                context.beginPath();
                context.moveTo(this.position._x, this.position._y);
                context.lineTo(this.position._x + vector._x * 100, this.position._y + vector._y * 100);
                context.closePath();
                context.stroke();
            };
        }
    }