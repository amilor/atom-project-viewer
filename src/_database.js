'use strict';

const fetch = function _readFile () {
  return atom.getStorageFolder().load('project-viewer.json');
};

const writeFile = function _writeFile () {};

/**
* database API.
* @module project-viewer/database
*/

module.exports = {
  /** read data saved from the file */
  fetch,

  /** write data to be saved in the file */
  writeFile
};
