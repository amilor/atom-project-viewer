'use strict';

/** package */
const _config = require('./config');

const openPanel = function _openPanel (view, position) {
  if (!view) {
    return;
  }
  if (!_config || !_config.panelPosition || !_config.panelPosition.enum) {
    return null;
  }
  if (_config.panelPosition.enum.indexOf(position) === -1) {
    position === 'Right';
  }
  const fnName = [String().concat('add', position, 'Panel')];
  if (!atom.workspace || typeof atom.workspace[fnName] !== 'function') {
    return null;
  }
  return atom.workspace[fnName]({
    item: view
  });
};

const getConfigKey = function _getConfig (config) {
    return String().concat('project-viewer', '.', config);
};

const getConfigValue = function _getConfig (config) {
    return atom.config.get(getConfigKey(config));
};

/**
* Atom API.
* @module project-viewer/atom
*/

module.exports = {
  /** add a panel on a specific side */
  openPanel,

  /** get the key of a config */
  getConfigKey,

  /** get the value of a config */
  getConfigValue
};
