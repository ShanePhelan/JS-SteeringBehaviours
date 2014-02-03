/**
 * Created with IntelliJ IDEA.
 * User: shanephelan
 * Date: 01/02/2014
 * Time: 21:32
 * To change this template use File | Settings | File Templates.
 */
describe("Math functions", function() {
    var sut;

    beforeEach(function() {

    });

    it("should setup prototype", function() {
        var vector = new Vector2d();

        expect(vector.add).toBeDefined();
        expect(vector.subtract).toBeDefined();
        expect(vector.scaleBy).toBeDefined();
        expect(vector.crossProduct).toBeDefined();
        expect(vector.dotProduct).toBeDefined();
        expect(vector.normalize).toBeDefined();
        expect(vector.length).toBeDefined();
        expect(vector.lengthSquared).toBeDefined();
        expect(vector.truncate).toBeDefined();
        expect(vector.clone).toBeDefined();
        expect(vector.toString).toBeDefined();
    });

    it("should set default values on Vector2d", function() {
        var vector = new Vector2d();

        var expectedValue = 0;
        expect(vector._x).toEqual(expectedValue);
        expect(vector._y).toEqual(expectedValue);
    });

    it("should set correct values on Vector2d", function() {
        var x = -10;
        var y = 100;
        var vector = new Vector2d(x,y);

        expect(vector._x).toEqual(x);
        expect(vector._y).toEqual(y);
    });

    it("add should return the outcome of a vector added to another", function() {
        var vector1 = new Vector2d(50, 50);
        var vector2 = new Vector2d(100, 100);

        var addedVector = vector1.add(vector2);

        var expectedX = 150;
        var expectedY = 150;
        expect(addedVector._x).toEqual(expectedX);
        expect(addedVector._y).toEqual(expectedY);
    });

    it("subtract should return the outcome of a vector subtracted from another", function() {
        var vector1 = new Vector2d(25, 25);
        var vector2 = new Vector2d(100, 100);

        var subtractedVector = vector2.subtract(vector1);

        var expectedX = 75;
        var expectedY = 75;
        expect(subtractedVector._x).toEqual(expectedX);
        expect(subtractedVector._y).toEqual(expectedY);
    });

    it("scaleBy should return the outcome of a vector scaled by a scalar value", function() {
        var vector1 = new Vector2d(25, 50);

        vector1.scaleBy(2);

        var expectedX = 50;
        var expectedY = 100;
        expect(vector1._x).toEqual(expectedX);
        expect(vector1._y).toEqual(expectedY);
    });

    it("dotProduct should return the product of two vectors", function() {
        var vector1 = new Vector2d(10, 20);
        var vector2 = new Vector2d(60, 40);

        var expectedDotProduct = 1400;
        var actualDotProduct = vector1.dotProduct(vector2);

        expect(actualDotProduct).toEqual(expectedDotProduct);

        var cos = actualDotProduct / (vector1.length() * vector2.length());
        expect(cos).toEqual(1);
    });
});
