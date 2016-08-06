'use strict';

const clientMapper = new WeakMap();
const _helpers = require('./_helpers');
const _constants = require('./_constants');

function createModel () {
  return Object.create(null, {
    clientId: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'pv_' + Date.now()
    },
    clientSort: {
      configurable: false,
      enumerable: false,
      set: function (sorting) {
        let obj = clientMapper.get(this);
        if (!obj) {
          obj = {};
          clientMapper.set(this, obj);
        }
        if (_constants.allowedSorts.indexOf(sorting) === -1) {
          return;
        }
        obj.clientSort = sorting;
      },
      get: function () {
        let obj = clientMapper.get(this);
        if (obj && obj.hasOwnProperty('clientSort')) {
          return obj.clientSort;
        }
        return 'position';
      }
    },
    clientName: {
      configurable: false,
      enumerable: false,
      set: function (name) {
        let obj = clientMapper.get(this);
        if (!obj) {
          obj = {};
          clientMapper.set(this, obj);
        }
        if (Number(name) === name) {
          return;
        }
        obj.clientName = name;
      },
      get: function () {
        let obj = clientMapper.get(this);
        if (!obj) {
          return null;
        }
        return obj.clientName;
      }
    },
    clientIcon: {
      configurable: false,
      enumerable: false,
      set: function (icon) {
        let obj = clientMapper.get(this);
        if (!obj) {
          obj = {};
          clientMapper.set(this, obj);
        }
        if (Number(icon) === icon) {
          return;
        }
        obj.clientIcon = icon;
      },
      get: function () {
        let obj = clientMapper.get(this);
        if (!obj) {
          return null;
        }
        return obj.clientIcon;
      }
    }
  });
}

const viewMethods = {
  createdCallback: function createdCallback () {},
  attachedCallback: function attachedCallback () {
    let contentNode = this.querySelector('div.list-item');
    contentNode.addEventListener('click', this.toggle.bind(this));
  },
  detachedCallback: function detachedCallback () {
    let contentNode = this.querySelector('div.list-item');
    contentNode.removeEventListener('click', this.toggle.bind(this));
  },
  getModel: function _getModel () {
    return clientMapper.get(this);
  },
  initialize: function initialize () {
    let listItem = document.createElement('div');
    listItem.classList.add('list-item');
    this.classList.add('list-nested-item');
    this.appendChild(listItem);
  },
  render: function render () {
    const model = this.getModel();

    if (!model) {
      return;
    }

    let spanNode = this.querySelector('div.list-item span');
    let contentNode = this.querySelector('div.list-item');

    if (model.clientIcon && !spanNode) {
      contentNode.textContent = '';
      spanNode = document.createElement('span');
      contentNode.appendChild(spanNode);
    }

    if (model.clientIcon) {
      contentNode = spanNode;
      contentNode.classList.add('icon', model.clientIcon);
    }
    else if (spanNode) {
      contentNode.removeChild(spanNode);
    }

    if (model.clientName) {
      contentNode.textContent = model.clientName;
    }

    let listTree = this.querySelector('.list-tree');

    if (listTree) {
      let nodes = _helpers.castToArray(listTree.childNodes);
      let sorted = nodes;
      if (model.clientSort === 'alphabetically') {
        sorted = _helpers.sortArray(nodes)
      }
      sorted.forEach(
        (liView) => this.attachChild(liView)
      );
    }

    if (!listTree) {
      listTree = document.createElement('ul');
      listTree.classList.add('list-tree');
      this.appendChild(listTree);
    }
  },
  attachChild: function _attachChild (nodeOrModel) {
    let listTree = this.querySelector('.list-tree');
    if (!listTree) {
      this.render();
      listTree = this.querySelector('.list-tree');
    }
    let node = nodeOrModel;
    listTree.appendChild(node);
  },
  detachChild: function _detachChild (node) {
    let listTree = this.querySelector('.list-tree');
    if (!listTree) {
      return;
    }
    listTree.removeChild(node);
  },
  toggle: function _toggle (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.classList.toggle('collapsed');

  },
  sorting: function _sorting () {
    const model = this.getModel();

    if (!model) {
      return;
    }
    return model.clientName;
  }
};

function createView (model) {
  const tagExtends = 'li';
  const tagIs = 'project-viewer-client';
  let view;

  try {
    const viewConstructor = document.registerElement(
      tagIs,
      {
        prototype: viewMethods,
        extends: tagExtends
      }
    );
    Object.setPrototypeOf(viewMethods, HTMLElement.prototype);
    view = new viewConstructor();
  } catch (e) {
    view =  document.createElement(tagExtends, tagIs);
  }

  if (model) {
    clientMapper.set(view, model);
  }

  return view;
}

/**
* client.
* @module project-viewer/client
*/

module.exports = {
  /** Create a client model */
  createModel,

  /** Create a client view given a client model */
  createView
};
