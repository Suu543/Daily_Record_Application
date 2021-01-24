var webpack_modules = {
  './src/index.js': (
    unused_webpack_module,
    webpack_exports,
    webpack_require
  ) => {
    var importedModule = webpack_require('./src/message.js');
    console.log(importedModule.default);
  },

  './src/message.js': (
    unused_webpack_module,
    webpack_exports,
    webpack_require
  ) => {
    webpack_require.d(webpack_exports, {
      default: () => WEBPACK_DEFAULT_EXPORT,
    });
    const WEBPACK_DEFAULT_EXPORT = 'Hi there';
  }
};

// The module cache
var webpack_module_cache = {};

// The require function
function webpack_require(moduleId) {
  // Check if module is in cache
  if (webpack_module_cache[moduleId]) {
      return webpack_module_cache[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = (webpack_module_cache[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {}
  });

  // Execute the module function
  webpack_modules[moduleId](module, module.exports, webpack_require);

  // Return the exports of the module
  return module.exports;
}

(() => {
  // define getter functions for harmony exports
  webpack_require.d = (exports, definition) => {
    for (var key in definition) {
      if (
        webpack_require.o(definition, key) &&
        !webpack_require.o(exports, key)
      ) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key]
        })
      }
    }
  }
})

/* webpack/runtime/hasOwnProperty shorthand */
(() => {
  webpack_require.o = (obj, prop) => 
    Object.prototype.hasOwnProperty.call(obj, prop);
})();

/* webpack/runtime/make namespace object */
(() => {
  // define esModule on exports
  webpack_require.r = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: true})
    }
    Object.defineProperty(exports, 'esModule', { value: true});
  }
})();

/****************************************************************** */
// startup
// Load Entry Module
webpack_require('./src/index.js');
// This entry module used 'exports' so it can't be inlined


