/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 30/01/2014
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */

    'use strict';

    var Boid = function(position, mass) {
        this.initialise(position, mass);
    };

    /**
     * @property MAX_VELOCITY
     * @static
     * @type {Number}
     * @default "6"
     * @readonly
     **/
    Boid.MAX_VELOCITY = 6;

    Boid.prototype = {

        /**
         * The position vector of this Boid.
         * @property position
         * @type Vector2d
         **/
        position : null,

        /**
         * The velocity vector of this Boid.
         * @property velocity
         * @type Vector2d
         **/
        velocity : null,

        /**
         * This Boids target vector.
         * @property target
         * @type Vector2d
         **/
        target : null,

        /**
         * The mass of this Boid.
         * @property mass
         * @type Number
         **/
        mass : 0,

        /**
         * Initialization method.
         * @method initialize
         * @param {Vector2d} the initial position of this Boid.
         * @param {Number} the mass of this Boid.
         * @protected
         **/
        initialise : function(position, mass) {
            this.position = position || new Vector2d(0, 0);
            this.mass = mass || 10;
            this.velocity = new Vector2d(-1, 1);
            this.target = new Vector2d(250, 250);
        },

        /**
         * Update method. Updates the steering and goals of the Boid
         * @method update
         * @param {Sprite|MovieClip} target The instance to manage.
         **/
        update : function() {
            this.velocity = this.target.subtract(this.position);
            this.velocity.normalize();
            this.velocity.scaleBy(Boid.MAX_VELOCITY);
            this.velocity.scaleBy(1 / this.mass);

            this.velocity.truncate(Boid.MAX_VELOCITY);
            this.position = this.position.add(this.velocity);
        }
    };
