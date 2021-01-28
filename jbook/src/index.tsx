import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
    // Refers to any type of variable
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            // wasmURL: '/esbuild.wasm'
            wasmURL: 'http://unpkg.com/esbuild-wasm@0.8.34/esbuild.wasm'
        });

    }

    useEffect(() => {
        startService();
    }, [])

    const onClick = async () => {
        // Reset iframe

        if (!ref.current) {
            return;
        }

        iframe.current.srcdoc = html;

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        });

        // setCode(result.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

        // It is used to just execute JavaScript that is stored inside of a string
        // try {
        //     // console.dadw('asdsda) 다음과 같이 에러를 출력하는 경우
        //     // 바로 시스템이 종료되는 문제점이 있다. 이러한 문제를 미연에 방지하기 위해
        //     // alert를 이용해 오류를 출력해준다
        //     eval(result.outputFiles[0].text);
        // } catch (err) {
        //     alert(err);
        // }
    }

    // unescaped code를 위해 <script></script>를 주면 <script>만 남으니까
    // <script></script>를 이용하면된다. 
    // console.log('<script></script>'); --> console.log("<script>
    // const html = `
    //   <script>
    //     ${code}
    //     <script></script>
    //   </script>
    // `;

    const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div';
                        console.log(err);
                    }
                }, false);
            </script>
        </body>
    </html>
    `

    return (
        <div>
            <CodeEditor 
            initialValue="const a = 2;" 
            onChange={(value) => setInput(value)}
            />
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="preview" ref={iframe} sandbox="allow-scripts"  srcDoc={html}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);