/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 03/02/2014
 * Time: 12:16
 * To change this template use File | Settings | File Templates.
 */
    'use strict'

    var Character = function(position, mass, canvas) {
        this.initialise(position, mass, canvas);
    };

    Character.prototype = {

        boid : null,

        initialise : function(position, mass, canvas) {
            this.boid = new Boid(position, mass);
        },

        update : function() {
            this.boid.update();
        },

        draw : function(context) {
            var boid = this.boid;

            drawSelf(context);
            drawTarget(context);
            drawForces(context);

            function drawSelf(context) {
                context.lineWidth = 5.0;
                context.strokeStyle = '#0000FF';
                context.beginPath();
                context.arc(boid.position._x, boid.position._y, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            }

            function drawTarget(context) {
                context.lineWidth = 4.0;
                context.strokeStyle = '#FF0000';
                context.beginPath();
                context.arc(boid.target._x, boid.target._y, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
            }

            function drawForces(context) {
                var velocity = boid.velocity.clone();
                velocity.normalize();
                drawForceVector(context, velocity, '#00FF00');
            }

            function drawForceVector(context, vector, colour) {
                context.lineWidth = 5.0;
                context.strokeStyle = colour;
                context.beginPath();
                context.moveTo(boid.position._x, boid.position._y);
                context.lineTo(boid.position._x + vector._x * 100, boid.position._y + vector._y * 100);
                context.closePath();
                context.stroke();
            }
        },

        updateTarget : function(target) {
            this.boid.target = target;
        }
    }
