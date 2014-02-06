/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 04/02/2014
 * Time: 18:27
 * To change this template use File | Settings | File Templates.
 */

    'use strict'

    var Steering = function(maxVelocity, slowingRadius) {
        this.initialise(maxVelocity, slowingRadius);
    };

    Steering.CIRCLE_DISTANCE = 60;

    Steering.CIRCLE_RADIUS = 120;

    Steering.ANGLE_CHANGE = 1;

    Steering.prototype = {

        /**
         * The maximum velocity of this steering instance.
         * @property maxVelocity
         * @type Number
         **/
        maxVelocity : null,

        /**
         * The desired velocity of this steering instance.
         * @property desired
         * @type Vector2d
         **/
        desired : null,

        /**
         * The radius of the target when slowing will occur.
         * @property slowingRadius
         * @type Number
         **/
        slowingRadius : 0,

        /**
         * The radius of the target when slowing will occur.
         * @property wanderAngle
         * @type Number
         **/
        wanderAngle : 0,

        seek : function(position, velocity, target) {
            var force;

            this.desired = target.subtract(position);
            this.desired.normalize();
            this.desired.scaleBy(this.maxVelocity);

            force = this.desired.subtract(velocity);

            return force;
        },

        seekWithArrival : function(position, velocity, target) {
            var force;
            var distance, slowingRadius = this.slowingRadius;

            this.desired = target.subtract(position);

            distance = this.desired.length();
            this.desired.normalize();

            if (distance <= slowingRadius) {
                console.log("inside radius, slowing down");
                this.desired.scaleBy(this.maxVelocity * (distance/slowingRadius));
            } else {
                console.log("outside radius");
                this.desired.scaleBy(this.maxVelocity);
            }

            force = this.desired.subtract(velocity);

            return force;
        },

        flee : function(position, velocity, target) {
            var force;

            this.desired = position.subtract(target);
            this.desired.normalize();
            this.desired.scaleBy(this.maxVelocity);

            force = this.desired.subtract(velocity);

            return force;
        },

        evade : function(position, velocity, target) {
            var distance = target.position.subtract(position);

            var updatesNeeded = distance.length() / this.maxVelocity;

            var tv = target.velocity.clone();
            tv.scaleBy(updatesNeeded);

            var targetFuturePosition = target.position.clone().add(tv);

            return this.flee(position, velocity, targetFuturePosition);
        },

        pursuit : function() {

        },

        wander : function(velocity) {
            // Calculate the circle center
            var circleCenter = velocity.clone();
            circleCenter.normalize();
            circleCenter.scaleBy(Steering.CIRCLE_DISTANCE);
            //
            // Calculate the displacement force
            var direction = Math.random() < 0.5 ? -1 : 1;
            var displacement = new Vector2d(0, direction);
            displacement.scaleBy(Steering.CIRCLE_RADIUS);
            //
            // Randomly change the vector direction
            // by making it change its current angle
            this.setAngle(displacement, this.wanderAngle);
            //
            // Change wanderAngle just a bit, so it
            // won't have the same value in the
            // next game frame.
            this.wanderAngle += Math.random() * Steering.ANGLE_CHANGE - Steering.ANGLE_CHANGE * .5;
            //
            // Finally calculate and return the wander force
            var wanderForce = circleCenter.add(displacement);
            console.log("WanderForce x: " + wanderForce._x + " y: " + wanderForce._y);
            return wanderForce;
        },

        setAngle : function(vector, value) {
            var len = vector.length();
            vector._x = Math.cos(value) * len;
            vector._y = Math.sin(value) * len;
        },

        initialise : function(maxVelocity, slowingRadius) {
            this.maxVelocity = maxVelocity;
            this.slowingRadius = slowingRadius;
            this.desired = new Vector2d(0, 0);
        }
    };
