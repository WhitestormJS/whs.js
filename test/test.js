var assert = require("assert");
var WHS = require("../build/whitestorm.test");

describe("WhitestormJS", function() {
    it("should be defined", function() {
        assert.equal(typeof WHS, "object");
    });
    describe("#init()", function() {
        it("should be defined", function() {
            assert.equal(typeof WHS.init, "function");
        });
    });
});