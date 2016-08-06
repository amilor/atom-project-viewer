'use strict';

const expect = require('chai').expect;

const client = require('../../src/_client');
const project = require('../../src/_project');
const helpers = require('../../src/_helpers');

context ('unit-test :: client', function () {

  context ('#createModel', function () {

    it ('should be a public method', function () {
      expect(client.createModel).to.be.a('function');
    });

    context ('.clientId', function () {

      it ('should create an Id', function () {
        let model = client.createModel();
        expect(model.clientId).to.exist;
      });

      it ('should not allow to override the Id', function () {
        let model = client.createModel();
        const fn = function () {
          model.clientId = 'pv_' + Date.now();
        };
        expect(fn).to.throw(TypeError);
      });
    });

    context ('.clientSort', function () {

      it ('should start as position', function () {
        let model = client.createModel();
        expect(model.clientSort).to.equal('position');
      });

      it ('should switch to alphabetically', function () {
        let model = client.createModel();
        model.clientSort = 'alphabetically';
        expect(model.clientSort).to.equal('alphabetically');
      });

      it ('should not switch to other types', function () {
        let model = client.createModel();
        model.clientSort = 'other sorting';
        expect(model.clientSort).to.equal('position');
      });
    });

    context ('.clientName', function () {
      it ('should return null if no parameter passed', function () {
        let model = client.createModel();
        expect(model.clientName).to.be.null;
      });

      it ('should return undefined if parameter is a Number', function () {
        let model = client.createModel();
        model.clientName = 0;
        expect(model.clientName).to.be.undefined;
        model.clientName = 1;
        expect(model.clientName).to.be.undefined;
        model.clientName = 10;
        expect(model.clientName).to.be.undefined;
      });

      it ('should define the name if parameter is a string', function () {
        let model = client.createModel();
        model.clientName = '';
        expect(model.clientName).to.equal('');
        model.clientName = 'group';
        expect(model.clientName).to.equal('group');
        model.clientName = 'another group';
        expect(model.clientName).to.equal('another group');
      });

      it ('should redefine the name if already defined', function () {
        let model = client.createModel();
        model.clientName = 'group';
        expect(model.clientName).to.equal('group');
        model.clientName = '';
        expect(model.clientName).to.equal('');
        model.clientName = undefined;
        expect(model.clientName).to.be.undefined;
      });

      it ('should not redefine the name if already defined', function () {
        let model = client.createModel();
        model.clientName = 'group';
        expect(model.clientName).to.equal('group');
        model.clientName = 10;
        expect(model.clientName).to.equal('group');
      });

      it ('should define the names of multiple groups', function () {
        let model_1 = client.createModel();
        model_1.clientName = 'group 1';
        expect(model_1.clientName).to.equal('group 1');

        let model_2 = client.createModel();
        model_2.clientName = 'group 2';
        expect(model_2.clientName).to.equal('group 2');
      });

    });

    context ('.clientIcon', function () {
      it ('should return null if no parameter passed', function () {
        let model = client.createModel();
        expect(model.clientIcon).to.be.null;
      });

      it ('should return undefined if parameter is a Number', function () {
        let model = client.createModel();
        model.clientIcon = 0;
        expect(model.clientIcon).to.be.undefined;
        model.clientIcon = 1;
        expect(model.clientIcon).to.be.undefined;
        model.clientIcon = 10;
        expect(model.clientIcon).to.be.undefined;
      });

      it ('should set the name if parameter is a String', function () {
        let model = client.createModel();
        model.clientIcon = '';
        expect(model.clientIcon).to.equal('');
        model.clientIcon = 'icon';
        expect(model.clientIcon).to.equal('icon');
        model.clientIcon = 'another icon';
        expect(model.clientIcon).to.equal('another icon');
      });

      it ('should redefine the name if already defined', function () {
        let model = client.createModel();
        model.clientIcon = 'icon';
        expect(model.clientIcon).to.equal('icon');
        model.clientIcon = '';
        expect(model.clientIcon).to.equal('');
        model.clientIcon = undefined;
        expect(model.clientIcon).to.be.undefined;
      });

      it ('should not redefine the name if already defined', function () {
        let model = client.createModel();
        model.clientIcon = 'icon';
        expect(model.clientIcon).to.equal('icon');
        model.clientIcon = 10;
        expect(model.clientIcon).to.equal('icon');
      });

    });
  });

  context ('#createView', function () {

    it ('should be a public method', function () {
      expect(client.createView).to.be.a('function');
    });

    it ('should return a DOM Node', function () {
      let view = client.createView(client.createModel());
      expect(view).to.be.an.instanceof(HTMLElement);
    });

    it ('should render the view with no name', function () {
      let model = client.createModel();
      let view = client.createView(model);
      view.initialize();
      view.render();
      let viewName = view.querySelector('.list-item').textContent;
      expect(viewName).to.be.empty;
    });

    it ('should render the view with icon but no name', function () {
      let model = client.createModel();
      let view = client.createView(model);
      model.clientIcon = 'icon-github';
      view.initialize();
      view.render();
      let viewName = view.querySelector('.list-item span').textContent;
      expect(viewName).to.be.empty;
    });

    it ('should render the view with the name', function () {
      let model = client.createModel();
      let view = client.createView(model);
      model.clientName = 'group #1';
      view.initialize();
      view.render();
      let viewName = view.querySelector('.list-item').textContent;
      expect(viewName).to.be.equal(model.clientName);
    });

    it ('should render the view with icon and name', function () {
      let model = client.createModel();
      let view = client.createView(model);
      model.clientName = 'group #1';
      model.clientIcon = 'icon-github';
      view.initialize();
      view.render();
      let viewName = view.querySelector('.list-item span').textContent;
      expect(viewName).to.be.equal(model.clientName);
    });

    it ('should render position', function () {
      let model = client.createModel();
      let view = client.createView(model);
      view.initialize();
      view.render();
      let viewNode = view.querySelector('.list-tree');
      expect(viewNode.nodeName).to.be.equal('UL');
      view.render();
      expect(viewNode.nodeName).to.be.equal('UL');
    });

    it ('should render and sort a list', function () {
      let model = client.createModel();
      let view = client.createView(model);
      model.clientName = 'group #1';
      view.initialize();

      const childNames = ['Things', 'Actions', 'Zebra', 'Áctions'];
      const AlphaChildNames = ['Actions', 'Áctions', 'Things', 'Zebra'];

      for (let i=0; i< childNames.length; i++) {
        let childModel = project.createModel();
        let childView = project.createView(childModel);
        childModel.projectName = childNames[i];
        if ([1, 3].indexOf(i) !== -1) {
          childModel.projectIcon = 'icon-github';
        }
        childView.initialize();
        childView.render();
        view.attachChild(childView);
      }
      view.render();

      const positionedChildNodes = helpers.castToArray(
        view.querySelector('ul').childNodes
      );
      positionedChildNodes.forEach(
        (positionedOne, idx) => expect(
          positionedOne.sorting()
        ).to.equal(childNames[idx])
      );
      model.clientSort = 'alphabetically';
      view.render();

      const alphabeticallyChildNodes = helpers.castToArray(
        view.querySelector('ul').childNodes
      );
      alphabeticallyChildNodes.forEach(
        (alphabeticallyOne, idx) => expect(
          alphabeticallyOne.sorting()
        ).to.equal(AlphaChildNames[idx])
      );
    });

  });

});
