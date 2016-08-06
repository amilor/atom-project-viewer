'use strict';

/** package */
const _helpers = require('./_helpers');
const _client = require('./_client');
const _group = require('./_group');
const _project = require('./_project');

const createProject = function _createProject (candidate) {
  const model = _project.createModel();
  const view = _project.createView(model);
  view.initialize();

  if (!candidate) {
    view.render();
    return view;
  }

  if (candidate.name) {
    model.projectName = candidate.name;
  }
  if (candidate.icon) {
    model.projectIcon = candidate.icon;
  }
  if (candidate.paths) {
    model.projectPaths = candidate.paths;
  }

  view.render();
  return view;
};

const createGroup = function _createGroup (candidate) {
  const model = _group.createModel();
  const view = _group.createView(model);
  view.initialize();

  if (!candidate) {
    view.render();
    return view;
  }

  if (candidate.name) {
    model.groupName = candidate.name;
  }
  if (candidate.icon) {
    model.groupIcon = candidate.icon;
  }
  if (candidate.sortBy) {
    model.groupSort = candidate.sortBy;
  }

  view.render();
  return view;
};

const createClient = function _createClient (candidate) {
  const model = _client.createModel();
  const view = _client.createView(model);
  view.initialize();

  if (!candidate) {
    view.render();
    return view;
  }

  if (candidate.name) {
    model.clientName = candidate.name;
  }
  if (candidate.icon) {
    model.clientIcon = candidate.icon;
  }
  if (candidate.sortBy) {
    model.clientSort = candidate.sortBy;
  }

  view.render();
  return view;
};

/**
* Access.
* @module project-viewer/access
*/

module.exports = {
  /** create a project */
  createProject,

  /** create a group */
  createGroup,

  /** create a client */
  createClient
};
