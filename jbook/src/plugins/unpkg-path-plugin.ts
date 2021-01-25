import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // debugging purpose
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });
 
    // build.onLoad({ filter: /.*/, namespace: 'b })
    // That means that this onload function is only going to be applied to files that have a namespace of B
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `
          }
        }
        
        // if (args.path === 'index.js') {
        //   return {
        //     loader: 'jsx',
        //     contents: `
        //       import message from './message';
        //       console.log(message);
        //     `,
        //   };
        // } else {
        //   return {
        //     loader: 'jsx',
        //     contents: 'export default "hi there!"',
        //   };
        // }
      });
    },
  };
};