/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 06/02/2014
 * Time: 17:24
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var Boid = function(position, mass, boid) {
    this.initialise(position, mass, boid);
};

/**
 * @property MAX_VELOCITY
 * @static
 * @type {Number}
 * @default "6"
 * @readonly
 **/
Boid.MAX_VELOCITY = 3;

Boid.MAX_FORCE = 8;

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
     * @type Boid
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
    initialise : function(position, mass, boid) {
        this.position = position || new Vector2d(0, 0);
        this.mass = mass || 20;
        this.velocity = new Vector2d(-1, 1);
        this.target = boid;
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
        var result = this.steering.evade(this.position, this.velocity, this.target);
        result.truncate(Boid.MAX_FORCE);
        result.scaleBy(1 / this.mass);

        this.velocity = this.velocity.add(result);
        this.velocity.truncate(Boid.MAX_VELOCITY);

        this.position = this.position.add(this.velocity);

        if (this.position._x < 0) {
            this.position._x = window.demo.View.CANVAS_WIDTH;
        } else if (this.position._x > window.demo.View.CANVAS_WIDTH) {
            this.position._x = 0;
        } else if (this.position._y < 0) {
            this.position._y = window.demo.View.CANVAS_HEIGHT;
        } else if (this.position._y > window.demo.View.CANVAS_HEIGHT) {
            this.position._y = 0;
        }
    },

    reset : function() {
        this.position._x = window.demo.View.CANVAS_WIDTH / 2;
        this.position._y = window.demo.View.CANVAS_HEIGHT / 2;

        this.velocity._x = -1 * (Math.random() < 0.5 ? -2 : 1);
        this.velocity._y = -1 * (Math.random() < 0.5 ? -2 : 1);

        this.velocity.truncate(Boid.MAX_VELOCITY * 0.5);
    }
};
