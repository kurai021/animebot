/**
 * Import the module.
 * @type {Object}
 */
const illegalize = require("../main");

/**
 * Allows us to determine if
 * a file exists.
 * @type {Object}
 */
const fs = require("fs");

/**
 * Where we store the file.
 * @type {String}
 */
const location = `${__dirname}/test.gif`;

/**
 * Mocha testing,
 * here, we call the module
 * and generate a new file.
 * Then, we determine if a file
 * has been generated.
 */
describe("is-now-illegal", () => {
  /**
   * Before we start testing,
   * initialize a new gif.
   */
  beforeEach("we start testing, we generate a new file", async () => {
    // we determine if a previos test has
    // occured, if so, we delete the file
    if (fs.existsSync(location)) fs.unlinkSync(location);
    await illegalize("test", location);
  });

  /**
   * As for testing,
   * we determine if a file has
   * successfully been generated.
   */
  it("should generate a file as './test/test.js'", async () => {
    if (!fs.existsSync(location)) throw Error();
  });
});
