/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 31/01/2014
 * Time: 20:55
 * To change this template use File | Settings | File Templates.
 */
describe("Boid", function() {
    var boid;

    beforeEach(function () {
        var canvas = document.createElement('canvas');
        boid = new Boid(new Vector2d(), 20, canvas);
    });

    afterEach(function () {
        boid = null;
    });

    it("should", function() {
       expect(boid).toBeDefined();
    });
});
