'use strict';

// had enabled by egg
// exports.static = true;

exports.assets = {
  enable: true,
  package: 'egg-view-assets',
  env: ['local'],
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
