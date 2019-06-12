const { PythonShell } = require("python-shell");

/**
 * Acts as a middle man for the python
 * code, if called with sufficient parameters,
 * this will execute the python code located
 * in src/ and generate a gif file.
 * @param  {String} phrase     The phrase that Trump will ban.
 * @param  {String} location   Where should this script store the file.
 */
module.exports = (phrase, location) => {
  // determine if a phrase is given
  if (!phrase) throw Error("Please provide something to ban.");
  // determine if a location is given
  if (!location) throw Error("Please provide a location for the file.");

  // next, we limit the character amount
  //if (phrase.length > 12) throw Error("Please only use up to 12 characters.");

  /**
   * Consists of options that
   * is important to execute the python script.
   * @type {Object}
   */
  const options = {
    scriptPath: `${__dirname}/src`,
    args: [phrase, location],
    pythonPath: 'python2'
  };

  /**
   * Execute the python script with
   * its respective parameters.
   * @param {Error} error Determines if an error has occured.
   */
  return new Promise((resolve, reject) => {
    PythonShell.run("generate.py", options, (error, res) => {
      if (error) return reject(error);
      resolve(res);
    });
  });
};
