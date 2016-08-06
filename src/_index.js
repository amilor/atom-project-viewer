'use strict';

/** atom */
const CompositeDisposable = require('atom').CompositeDisposable;

/** package */
const _config = require('./config');
const _main = require('./_main');
const _atom = require('./_atom');
const _api = require('./_api');
const _database = require('./_database');

_database.fetch();

module.exports = {
  config: _config,
  mapper: new WeakMap(),
  activate: function _active () {
    this.mapper.set(this, {});
    this.initialize();
  },
  deactivate: function _deactivate () {
    if (this.disposables && typeof this.disposables.dispose === 'function') {
      this.disposables.dispose();
    }
  },
  serialize: function _serialize () {},
  initialize: function _initialize () {
    this.disposables = new CompositeDisposable();
    this.disposables.add(
      atom.config.observe('project-viewer.panelPosition', (value) => {
        const refs = this.mapper.get(this);
        if (refs.mainPanel && typeof refs.mainPanel.destroy === 'function') {
          refs.mainPanel.destroy();
        }
        const mainView = _main.createView();
        mainView.initialize();
        refs.mainPanel = _atom.openPanel(mainView, value);

        const database = _database.fetch();

        if (!database) {
          return;
        }

        // TODO: MUST refactor
        database.clients.forEach(
          (clientCandidate) => {
            const clientView = _api.createClient(clientCandidate);
            mainView.attachChild(clientView);
            clientCandidate.groups.forEach(
              (groupCandidate) => {
                const groupView = _api.createGroup(groupCandidate);
                clientView.attachChild(groupView);
                groupCandidate.projects.forEach(
                  (candidateProject) => {
                    const projectView = _api.createProject(candidateProject);
                    groupView.attachChild(projectView);
                  }
                );
              }
            );
          }
        );
        database.projects.forEach(
          (candidateProject) => {
            const projectView = _api.createProject(candidateProject);
            mainView.attachChild(projectView);
          }
        );
      })
    );
  },
  consumeProjectViewer: function _consumeProjectViewer () {
    return _api;
  }
}
