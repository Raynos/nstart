var test = require("tape")

var nstart = require("../index")

test("nstart is a function", function (assert) {
    assert.equal(typeof nstart, "function")
    assert.end()
})
