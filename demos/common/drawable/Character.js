/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 03/02/2014
 * Time: 12:16
 * To change this template use File | Settings | File Templates.
 */
    'use strict'

    var Character = function(position, mass, context, target) {
        this.initialise(position, mass, context, target);
    };

    Character.prototype = {

        image : null,

        boid : null,

        initialise : function(position, mass, context, target) {
            this.boid = new Boid(position, mass, target);
            this.loadImage(context);
        },

        loadImage : function(context) {
            var self = this;
            this.image = new Image();
            this.image.onload = function() {
                context.drawImage(self.image, 50, 50);
                self.image.style.width = "50%";
                self.image.style.height = "auto";
            }
            this.image.src = "../../assets/dog.png";
        },

        update : function() {
            this.boid.update();
        },

        draw : function(context) {
            var self = this;
            var boid = this.boid;

            var halfWidth = self.image.width / 2;
            var halfHeight = self.image.height / 2;

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
                context.lineWidth = 2.0;
                context.strokeStyle = colour;
                context.beginPath();
                context.moveTo(boid.position._x, boid.position._y);
                context.lineTo(boid.position._x + vector._x * 50, boid.position._y + vector._y * 50);
                context.closePath();
                context.stroke();
            }
        },

        updateTarget : function(target) {
            this.boid.target = target;
        }
    }
