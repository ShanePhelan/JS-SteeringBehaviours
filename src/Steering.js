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

        initialise : function(maxVelocity, slowingRadius) {
            this.maxVelocity = maxVelocity;
            this.slowingRadius = slowingRadius;
            this.desired = new Vector2d(0, 0);
        }
    };
