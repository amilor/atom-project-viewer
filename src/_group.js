'use strict';

const groupMapper = new WeakMap();
const _helpers = require('./_helpers');
const _constants = require('./_constants');

function createModel () {
  return Object.create(null, {
    groupId: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'pv_' + Date.now()
    },
    groupSort: {
      configurable: false,
      enumerable: false,
      set: function (sorting) {
        let obj = groupMapper.get(this);
        if (!obj) {
          obj = {};
          groupMapper.set(this, obj);
        }
        if (_constants.allowedSorts.indexOf(sorting) === -1) {
          return;
        }
        obj.groupSort = sorting;
      },
      get: function () {
        let obj = groupMapper.get(this);
        if (obj && obj.hasOwnProperty('groupSort')) {
          return obj.groupSort;
        }
        return 'position';
      }
    },
    groupName: {
      configurable: false,
      enumerable: false,
      set: function (name) {
        let obj = groupMapper.get(this);
        if (!obj) {
          obj = {};
          groupMapper.set(this, obj);
        }
        if (Number(name) === name) {
          return;
        }
        obj.groupName = name;
      },
      get: function () {
        let obj = groupMapper.get(this);
        if (!obj) {
          return null;
        }
        return obj.groupName;
      }
    },
    groupIcon: {
      configurable: false,
      enumerable: false,
      set: function (icon) {
        let obj = groupMapper.get(this);
        if (!obj) {
          obj = {};
          groupMapper.set(this, obj);
        }
        if (Number(icon) === icon) {
          return;
        }
        obj.groupIcon = icon;
      },
      get: function () {
        let obj = groupMapper.get(this);
        if (!obj) {
          return null;
        }
        return obj.groupIcon;
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
    return groupMapper.get(this);
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

    if (model.groupIcon && !spanNode) {
      contentNode.textContent = '';
      spanNode = document.createElement('span');
      contentNode.appendChild(spanNode);
    }

    if (model.groupIcon) {
      contentNode = spanNode;
      contentNode.classList.add('icon', model.groupIcon);
    }
    else if (spanNode) {
      contentNode.removeChild(spanNode);
    }

    if (model.groupName) {
      contentNode.textContent = model.groupName;
    }

    let listTree = this.querySelector('.list-tree');

    if (listTree) {
      let nodes = _helpers.castToArray(listTree.childNodes);
      let sorted = nodes;
      if (model.groupSort === 'alphabetically') {
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
    return model.groupName;
  }
};

function createView (model) {
  const tagExtends = 'li';
  const tagIs = 'project-viewer-group';
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
    groupMapper.set(view, model);
  }

  return view;
}

/**
* Group.
* @module project-viewer/group
*/

module.exports = {
  /** Create a group model */
  createModel,

  /** Create a group view given a group model */
  createView
};
