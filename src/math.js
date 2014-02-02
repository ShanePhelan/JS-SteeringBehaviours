/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 16:35
 * To change this template use File | Settings | File Templates.
 */

'use strict'

var Vector2d = function(x, y) {
    this._x = x || 0;
    this._y = y || 0;
};

Vector2d.prototype = {

    add : function(target) {
        return new Vector2d(this._x + target._x, this._y + target._y);
    },

    subtract : function(target) {
        return new Vector2d(this._x - target._x, this._y - target._y);
    },

    scaleBy : function(scalar) {
        this._x *= scalar;
        this._y *= scalar;
    },

    dotProduct : function(target) {
        return (this._x * target._x) + (this._y * target._y);
    },

    crossProduct : function(target) {

    },

    normalize : function() {
        var magnitude = this.length();

        this._x /= magnitude;
        this._y /= magnitude;

        return this;
    },

    length : function() {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    },

    lengthSquared : function() {
        return (this._x * this._x) + (this._y * this._y);
    },

    truncate : function(max) {
        var i;

        i = max / this.length();
        i = i < 1.0 ? 1.0 : i;

        this.scale(i);
    },

    clone : function() {
        return new Vector2d(this._x, this._y);
    },

    toString : function() {
        return "Vector2d x: " + this._x + " y: " + this._y;
    }
}
