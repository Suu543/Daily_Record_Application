import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
    name: 'filecache'
})

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode
                };
                // if (args.path === 'index.js') {
                //     console.log('aaa');
            
                //     return {
                //         loader: 'jsx',
                //         contents: inputCode
                //     }
                // }    
            });

            // We are not actually required to return a result from a onload function
            // this onload function is going to be called for all different files 
            // that we tried to include into our bundle that are not named exactly indexed
            // If we do not return an object from this function right here, then
            // ESBuild is going to assume that this must have been a false call, 
            // must have been a mistake
            // object를 리턴하지 않으면 호출만하고, 다음 onLoad로 넘어간다.
            // log 용으로 사용하기 좋다
            // null을 리턴하기 때문에, OK I'm going to still continue trying to call
            // the onLoad until I eventually get an actual object back
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // console.log("I ran but didn't do anything...")
                // return null;                

                // If we find some cash value, get, let's return it and ESBuild will stop there
                // It will not call any additional all the onLoad functions because it got back
                // a result or the file that,
                // If we do not return anything or a cash result, no problem,
                // just move to the next onLoad until it eventually gets some configuration object
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedResult) {
                    return cachedResult
                }
            })

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                console.log('onLoad', args);
                
                const { data, request } = await axios.get(args.path);        
        
                console.log(args.path);

                // Tricking ESBuild's CSS Handling
                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

                // ' or " 때문에 early terminate이 발생할 수 있다
                // escape
                const escaped = data
                    .replace(/\n/g, '')  // newline character to empty string
                    .replace(/"/g, '\\"') // double quotes to (encode or kind of escaping all these double quotes)
                    .replace(/'/g, "\\'") // find any single quote and escape them
                const contents = fileType === 'css' ? 
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    `
                    : data

                console.log(contents);
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname
                }
        
                // store response in cache
                await fileCache.setItem(args.path, result);
        
                return result;            
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);
                
                const { data, request } = await axios.get(args.path);        
                
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname
                }
        
                // store response in cache
                await fileCache.setItem(args.path, result);
        
                return result;
            });       
        }
    }
}

// export const fetchPlugin = (inputCode: string) => {
//     return {
//         name: 'fetch-plugin',
//         setup(build: esbuild.PluginBuild) {
//             build.onLoad({ filter: /.*/ }, async (args: any) => {
//                 console.log('onLoad', args);
        
//                 if (args.path === 'index.js') {
//                     console.log('aaa');
            
//                     return {
//                         loader: 'jsx',
//                         contents: inputCode
//                     }
//                 }
        
//                 // Check to see if we have already fetched this file
//                 // and if it is in the cache
//                 // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
//                 // // if it is, return it immediately
//                 // if (cachedResult) {
//                 //     return cachedResult;
//                 // }
        
//                 const { data, request } = await axios.get(args.path);        
        
//                 console.log(args.path);

//                 // Tricking ESBuild's CSS Handling
//                 const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

//                 // ' or " 때문에 early terminate이 발생할 수 있다
//                 // escape
//                 const escaped = data
//                     .replace(/\n/g, '')  // newline character to empty string
//                     .replace(/"/g, '\\"') // double quotes to (encode or kind of escaping all these double quotes)
//                     .replace(/'/g, "\\'") // find any single quote and escape them
//                 const contents = fileType === 'css' ? 
//                     `
//                         const style = document.createElement('style');
//                         style.innerText = '${escaped}';
//                         document.head.appendChild(style);
//                     `
//                     : data

//                 console.log(contents);
//                 const result: esbuild.OnLoadResult = {
//                     loader: 'jsx',
//                     contents,
//                     resolveDir: new URL("./", request.responseURL).pathname
//                 }
        
//                 // store response in cache
//                 await fileCache.setItem(args.path, result);
        
//                 return result;
//             });       
//         }
//     }
// }