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
Boid.MAX_VELOCITY = 2;

Boid.MAX_FORCE = 0.6;

Boid.prototype = {

    /**
     * The individual id of this instance
     * @property id
     * @type Number
     */
    id : 0,

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
     * This Boids steering instance.
     * @property steering
     * @type Steering
     **/
    steering : null,

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
        this.steering = new Steering(Boid.MAX_VELOCITY + (Math.random() * 10), 150);

        this.velocity.truncate(Boid.MAX_VELOCITY);
        this.createId();
    },

    createId : function() {
        this.id = Math.random();
    },

    /**
     * Update method. Updates the steering and goals of the Boid
     * @method update
     * @param {Sprite|MovieClip} target The instance to manage.
     **/
    update : function() {
        var result = this.steering.seekWithArrival(this.position, this.velocity, this.target);
        result.truncate(Boid.MAX_FORCE);
        result.scaleBy(1 / this.mass);

        this.velocity = this.velocity.add(result);
        this.velocity.truncate(Boid.MAX_VELOCITY);

        this.position = this.position.add(this.velocity);
    }
};
