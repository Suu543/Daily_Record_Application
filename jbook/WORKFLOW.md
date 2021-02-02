

<img src="https://cdn-images-1.medium.com/max/800/1*Gv3h3q7fXYqP8pRtgfqH4A.png" />

![img](https://cdn-images-1.medium.com/max/800/1*fTcZzFLhJP8l44xkAYWttQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*Y4EVF85b_HRADOAYLgoekQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*nTFYoY22wTcxk77cnrB3_A.png)

![img](https://cdn-images-1.medium.com/max/800/1*zQ7K6FR7tw6ZfKhRaKZqBA.png)

![img](https://cdn-images-1.medium.com/max/800/1*ZXodilpdu6F3byJZhgYwWA.png)

![img](https://cdn-images-1.medium.com/max/800/1*fWy6irHXjyB31fJ7sKmVuA.png)

![img](https://cdn-images-1.medium.com/max/800/1*fjhcXXnUOENf1VZXeDTdow.png)

![img](https://cdn-images-1.medium.com/max/800/1*1HfIwslQ7b5JpGlchhtgRA.png)

![img](https://cdn-images-1.medium.com/max/800/1*90eSABFXqHhEfutG0bNFEQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*Yms3ot_fD8L5e6KvADXb4w.png)

![img](https://cdn-images-1.medium.com/max/800/1*vMp7eMcTJ6JAwr3FRRcjQA.png)

![img](https://cdn-images-1.medium.com/max/800/1*99gdn4VvYErccXnRsMaZcQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*tDmkmCdoUKSkHCWCsarbxA.png)

![img](https://cdn-images-1.medium.com/max/800/1*bd37z48pT__FGATARNsUdg.png)

axios → request

![img](https://cdn-images-1.medium.com/max/800/1*XNe0pP6W9xLyCnK-47gf7Q.png)

![img](https://cdn-images-1.medium.com/max/800/1*2jVlHRnkxi00QJKZe3NJ6g.png)

![img](https://cdn-images-1.medium.com/max/800/1*2jVlHRnkxi00QJKZe3NJ6g.png)

### Considerations Around Code Execution

- User-Provided code might throw errors and cause our program to crash
- User-Provided code might mutate the DOM, causing our progrm to crash
- A user might accidentally run code provided by anohter malicious user

```javascript
document.querySelector('iframe').contentWindow.b
```


#### index-before
```javascript
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from './bundler/plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
    // Refers to any type of variable
    const ref = useRef<any>();
    const [code, setCode] = useState('');
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

        // iframe.current.srcdoc = html;

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

        setCode(result.outputFiles[0].text); 

        // setCode(result.outputFiles[0].text);
        // iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

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

    return (
        <div>
            <CodeEditor 
            initialValue="const a = 2;" 
            onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
```














