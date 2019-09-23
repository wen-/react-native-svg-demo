'use strict';

const config = [
  // rn-fetch-blob组件相互引用警告
  {
    source: 'scripts/overwrite/rn-fetch-blob/Blob.js',
    dist: 'node_modules/rn-fetch-blob/polyfill/Blob.js'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/Fetch.js',
    dist: 'node_modules/rn-fetch-blob/polyfill/Fetch.js'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/FileReader.js',
    dist: 'node_modules/rn-fetch-blob/polyfill/FileReader.js'
  },
  {
    source: 'scripts/overwrite/rn-fetch-blob/XMLHttpRequest.js',
    dist: 'node_modules/rn-fetch-blob/polyfill/XMLHttpRequest.js'
  },
  {
    source: 'scripts/overwrite/react-native-reanimated/TransitionModule.java',
    dist: 'node_modules/react-native-reanimated/android/src/main/java/com/swmansion/reanimated/transitions/TransitionModule.java'
  },
  {
    source: 'scripts/overwrite/react-native-reanimated/ChangeTransition.java',
    dist: 'node_modules/react-native-reanimated/android/src/main/java/com/swmansion/reanimated/transitions/ChangeTransition.java'
  },
  {
    source: 'scripts/overwrite/react-native-reanimated/SaneSidePropagation.java',
    dist: 'node_modules/react-native-reanimated/android/src/main/java/com/swmansion/reanimated/transitions/SaneSidePropagation.java'
  },
  {
    source: 'scripts/overwrite/react-native-reanimated/Scale.java',
    dist: 'node_modules/react-native-reanimated/android/src/main/java/com/swmansion/reanimated/transitions/Scale.java'
  },
  {
    source: 'scripts/overwrite/react-native-reanimated/TransitionUtils.java',
    dist: 'node_modules/react-native-reanimated/android/src/main/java/com/swmansion/reanimated/transitions/TransitionUtils.java'
  },

];

const fs = require('fs-extra');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');

const log = (pass, msg) => {
  const prefix = pass ? chalk.green.bgBlack('PASS') : chalk.red.bgBlack('FAIL');
  const color = pass ? chalk.blue : chalk.red;
  console.log(prefix, color(msg));
};

config.forEach((item, index) => {
  if (item.source && item.dist) {
    const source = path.join(process.cwd(), item.source);
    const dist = path.join(process.cwd(), item.dist);
    fs.copy(source, dist, function(err) {
      if (err) {
        log(false, `overwrite file '${item.source}' => '${item.dist}'\n${err}`);
      } else {
        log(true, `overwrite file '${item.source}' => '${item.dist}'`);
      }
    });
  }
});
