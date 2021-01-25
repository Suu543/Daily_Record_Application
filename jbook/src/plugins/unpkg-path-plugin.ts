import * as esbuild from 'esbuild-wasm';
import axios from 'axios'; 

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // debugging purpose
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        } 

        if (args.path.includes('./') || args.path.includes('../')) {
          // {path: "./utils", importer: "https://unpkg.com/medium-test-pkg", namespace: "a", resolveDir: ""}
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          }
        }

        // if (args.path.includes('./') || args.path.includes('../')) {
        //   // {path: "./utils", importer: "https://unpkg.com/medium-test-pkg", namespace: "a", resolveDir: ""}
        //   return {
        //     namespace: 'a',
        //     path: new URL(args.path, args.importer + '/').href
        //   }
        // }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
 
    // build.onLoad({ filter: /.*/, namespace: 'b })
    // That means that this onload function is only going to be applied to files that have a namespace of B
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        // Let's solve process.env.NODE_ENV when bundling for the browser
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react@16.0.0';
              console.log(React, useState);
            `
          }
        }
        // new URL('./', address)
        // 폴더명만 추출하고 싶은 경우

        const { data, request } = await axios.get(args.path);
        console.log(request);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        }

        // resolveDir
        // It is going to be provided to the next file that we tried to require
        // And it's going to describe where we found this original file
        // In other words, where we did we find nested test packages 
        // so we can communicate where we found nested package at the next file
        // that we tried to resolve this resolved proerty right here.
      });
    },
  };
};