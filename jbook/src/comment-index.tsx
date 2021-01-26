import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    // Refers to any type of variable
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });

    }

    useEffect(() => {
        startService();
    }, [])

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        // console.log(ref.current);
        // transform ==> takes jsx and turn it into normal js
        // const result = await ref.current.transform(input, {
        //     loader: 'jsx', // jsx as a string
        //     target: 'es2015', // what options we want to assume that it needs to transpire
        // });

        // Let's solve process.env.NODE_ENV when bundling for the browser
        // define property

        // Versioning을 원하는 경우
        // unpkg.com/react@16.0.0/cjs/react.development.js
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            // replace any instance of process.env.NODE_ENV, with a variable of production
            // bundling 과정중 process.env.NODE_ENV를 만나면 "production"으로 변환
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
            // The reason for that is, as we just saw on the defined documentation, yes,
            // esbuild is going to try to find where there might be some potentially unreachable code
            // and automatically print it out 
            // process.env.NODE_ENV 주석처리해서 확인할 수 있다.
        });

        // console.log(result);

        setCode(result.outputFiles[0].text);
    }

    return (
        <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);