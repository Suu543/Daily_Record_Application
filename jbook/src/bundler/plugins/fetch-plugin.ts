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
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedResult) {
                    return cachedResult
                }
            })

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                console.log('onLoad', args);
                
                const { data, request } = await axios.get(args.path);        
        
                console.log(args.path);

                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
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