// CodeceptJS's console reporter, for mocha-multi. CodeceptJS 4 is an ES module, and mocha-multi loads reporters with
// require(), which gives the module's namespace ({ default }) rather than the reporter, so it is unwrapped here.
module.exports = require('codeceptjs/lib/mocha/cli').default;
