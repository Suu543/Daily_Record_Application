import * as esbuild from 'esbuild-wasm';

// Testing Purpose
// (async() => {
//   await fileCache.setItem('color', 'red');

//   const color = await fileCache.getItem('color');

//   console.log(color);
// })()

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // debugging purpose
    setup(build: esbuild.PluginBuild) {

      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' }
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(
            args.path,
            'https://unpkg.com' + args.resolveDir + '/'
          ).href,
        }
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);

        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        } 

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          }
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      }); 
    },
  };
};