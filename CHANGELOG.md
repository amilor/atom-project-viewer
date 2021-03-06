# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

- (0.4.0) Fixed the `font-size` and centering for the icons in the tree-view;

- Right a proper feature list on the README;
- Add bulk operation on project creation ([#50](https://github.com/jccguimaraes/atom-project-viewer/issues/50));
- Keybindings for cycling between projects ([#22](https://github.com/jccguimaraes/atom-project-viewer/issues/22));
- Resizable panel (as a pane instead?) *(investigate)* ([#37](https://github.com/jccguimaraes/atom-project-viewer/issues/37));
- Validate if root path is a git repository and initialize it *(investigate)*;
- Clear saved project state (this can get above 1Mb of size) *(investigate)*;

## [0.3.18] - 2016-08-05

### Fixed

- Elevate to project would not check for the name;

## [0.3.17] - 2016-08-05

### Fixed

- Add root path in windows does not trim path as name([#78](https://github.com/jccguimaraes/atom-project-viewer/issues/78));

## [0.3.16] - 2016-08-01

### Fixed

- After updating to 1.9.0 some errors occur when changing between projects (this is a workaround for now);
- Fixed selected / active project highlighted color;
- Fixed AppVeyor link.

## [0.3.15] - 2016-07-17

### Added

- Adding live filter feature for icons ([#70](https://github.com/jccguimaraes/atom-project-viewer/pull/70));

### Fixed

- Fix pathNotInArray ([#72](https://github.com/jccguimaraes/atom-project-viewer/pull/72)), ([#71](https://github.com/jccguimaraes/atom-project-viewer/issues/71));
- Cannot read property 'addNode' of null ([#69](https://github.com/jccguimaraes/atom-project-viewer/issues/69));
- Cannot read property 'visible' of undefined ([#68](https://github.com/jccguimaraes/atom-project-viewer/issues/68));

## [0.3.14] - 2016-07-11

### Fixed

- Does not open left-aligned on first load ([#67](https://github.com/jccguimaraes/atom-project-viewer/issues/67));
- Possible icon redundancy ([#65](https://github.com/jccguimaraes/atom-project-viewer/pull/65));

## [0.3.13] - 2016-07-04

### Fixed

- Uncaught TypeError: Cannot read property 'groups' of undefined ([#62](https://github.com/jccguimaraes/atom-project-viewer/issues/62))

### Added

- Possible icon redundancy ([#63](https://github.com/jccguimaraes/atom-project-viewer/issues/63)) ([#64](https://github.com/jccguimaraes/atom-project-viewer/pull/64));

## [0.3.12] - 2016-06-28

### Added

- Reimplement colors ([#49](https://github.com/jccguimaraes/atom-project-viewer/issues/49));
- Button to add the current tree view paths ([#59](https://github.com/jccguimaraes/atom-project-viewer/pull/59));
- Sort clients, groups and projects by natural position or alphabetically ([#21](https://github.com/jccguimaraes/atom-project-viewer/issues/21));

### Fixed

- Removing a project path when updating behaves weirdly ([#60](https://github.com/jccguimaraes/atom-project-viewer/issues/60));

## [0.3.11] - 2016-06-18

### Added

- Added Travis CI and AppVeyor badges;

### Fixed

- The backup only saves once. Any other changes are not saved ([#58](https://github.com/jccguimaraes/atom-project-viewer/issues/58));

## [0.3.10] - 2016-06-17

### Added

- Elevate current `tree-view` opened folders to project ([#26](https://github.com/jccguimaraes/atom-project-viewer/issues/26));
- Forcing all icons at font-size: `@component-icon-size` extension to `SelectView` ([#56](https://github.com/jccguimaraes/atom-project-viewer/pull/56));

## [0.3.9] - 2016-06-16

### Fixed

- Forcing all icons at font-size: `@component-icon-size` ([#56](https://github.com/jccguimaraes/atom-project-viewer/pull/56));

## [0.3.8] - 2016-06-15

### Fixed

- Project status does not update on adding/removing paths ([#55](https://github.com/jccguimaraes/atom-project-viewer/issues/55));

## [0.3.7] - 2016-06-15

### Fixed

- Added extra validation in the context-menu for opening a project in a new/same window.

## [0.3.6] - 2016-06-15

### Added

- Added a context-menu entry to open a project in a new window if `alwaysOpenInNewWindow` is enabled and the other way round ([#46](https://github.com/jccguimaraes/atom-project-viewer/issues/46#issuecomment-225396861));

### Changed

- Grammar and spelling fixes ([#54](https://github.com/jccguimaraes/atom-project-viewer/pull/54));

## [0.3.5] - 2016-06-14

### Added

- When using a package like `tool-bar`, there were conflicts with the icons classes ([#51](https://github.com/jccguimaraes/atom-project-viewer/pull/51));

### Fixed

- addIcons() now pre-seeds changesToItem if the item has an icon ([#53](https://github.com/jccguimaraes/atom-project-viewer/pull/53/)) ([#52](https://github.com/jccguimaraes/atom-project-viewer/issues/52));
- When `alwaysOpenInNewWindow` was enabled, it would also open in the same window ([#46](https://github.com/jccguimaraes/atom-project-viewer/issues/46#issuecomment-225468789));
- Added @DamnedScholar to contributors list;
- This file structure;

## [0.3.4] - 2016-06-13

### Added

- Options information in the README file

### Fixed

- New projects are gone after restart ([#47](https://github.com/jccguimaraes/atom-project-viewer/issues/47));

### Changed

- Due to some key-bindings conflict between packages, have decided to change the project own key-bindings. ([#46](https://github.com/jccguimaraes/atom-project-viewer/issues/46));

## [0.3.3] - 2016-06-11

### Fixed

- Fixed bad workflow on updating Clients/Groups/Projects ([#48](https://github.com/jccguimaraes/atom-project-viewer/issues/48));

### Added

- Possibility (through config option) to always open projects in a new window (default Atom\'s behavior), instead of opening in the same window. ([#46](https://github.com/jccguimaraes/atom-project-viewer/issues/46));

## [0.3.2] - 2016-06-08

### Fixed

- Fixed `SelectView` when no projects were available ([#45](https://github.com/jccguimaraes/atom-project-viewer/issues/45));

## [0.3.1] - 2016-06-08

### Changed

- Moved `atom-space-pen-views` from `devDependencies` to `dependencies` available ([#45](https://github.com/jccguimaraes/atom-project-viewer/issues/45));

## [0.3.0] - 2016-06-08

### Added

- SelectView Component *(from atom-space-pen)* `ctrl-alt-t`;
- Autohide sidebar component ([#27](https://github.com/jccguimaraes/atom-project-viewer/issues/27));
- Visually disabled projects that have no paths;
- Save database file into a private *GitHub* gist;
- Convert existing/old database file to the new schema;
- Current project on status bar ([#22](https://github.com/jccguimaraes/atom-project-viewer/issues/22));
- Added `devicons` to enhance icons ([#41](https://github.com/jccguimaraes/atom-project-viewer/issues/41));

### Changed

- Sidebar component;
- Organize by client and/or group and/or project (3 levels) ([#25](https://github.com/jccguimaraes/atom-project-viewer/issues/25));
- Toggle PV state `ctrl-alt-v`;
- Add Clients, Groups and Projects (menu and context-menu);
- Remove Clients, Groups and Projects (menu and context-menu);
- Update Clients, Groups and Projects (context-menu only);
- Drag & Drop workflow;

### Deprecated

- None;

### Removed

- Groups/Projects Colors;
- Update Clients, Groups and Projects from menu;
- Update database folder (you can now backup as a private *Gist*);

### Fixed

- Project state (workspace / files, history and tree-view package);
- Project configuration now lives on atom's internal storage folder;

### Security

- None;
