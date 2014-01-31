/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 30/01/2014
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */
    'use strict';

    var Boid = function(position, mass) {
        this.position = position;
        this.velocity = null;
        this.target = null;
        this.desired = null;
        this.steering = null;
        this.mass = mass;

        this.MAX_VELOCITY = 3;
        this.MAX_FORCE = 0.4;
    };

    function seek(target) {
        var force;

        this.desired = target.subtract(position);
        this.desired.normalize();
        this.desired.scaleBy(MAX_VELOCITY);

        force = this.desired.subtract(this.velocity);

        return force;
    }

    function truncate(vector, max) {
        var i;

        i = max / vector.length;
        i = i < 1.0 ? 1.0 : i;

        vector.scaleBy(i);
    }

    Boid.prototype.update = function() {
        this.target = Game.mouse;

        this.steering = seek(this.target);

        truncate(this.steering, this.MAX_FORCE);
        this.steering.scaleBy(1 / this.mass);

        this.velocity = this.velocity.add(this.steering);
        truncate(this.velocity, this.MAX_VELOCITY);

        this.position = this.position.add(this.velocity);
    };

    Boid.prototype.draw = function() {

    };
