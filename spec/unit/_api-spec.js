'use strict';

const expect = require('chai').expect;

const access = require('../../src/_api');

context ('unit-test :: api', function () {

  context ('#createProject', function () {

    it ('should create a project', function () {
      let candidate = {
        name: 'project #1',
        icon: 'icon-github',
        paths: [
          '/Users/path/one',
          '/Users/path/two'
        ]
      };
      let project = access.createProject(candidate);
      console.debug(project);
    });

  });

});
