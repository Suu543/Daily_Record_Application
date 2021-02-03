import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code); 
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [input])

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                    initialValue="const a = 2;" 
                    onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    )
};

export default CodeCell;


// const CodeCell = () => {
//     const [code, setCode] = useState('');
//     const [err, setErr] = useState('');
//     const [input, setInput] = useState('');

//     useEffect(() => {
//         const timer = setTimeout(async () => {
//             const output = await bundle(input);
//             setCode(output.code); 
//             setErr(output.err);
//         }, 1000);

//         // Only after I stop typing for one second that is actually executed.
//         return () => {
//             clearTimeout(timer);
//         }
//     }, [input])

//     // Debouncing is when we want to allow some function or some code to run
//     // As much as possible, and then only after some period of time elapses, 
//     // we then want to do some other process

//     // Set timer to bundle in 1s
//     // Cancel previous timer - set timer to bundle in 1s
//     // Set new timer to bundle in 1s
//     // 1 second passes without any updates to 'input' state --> Run bundling logic

//     return (
//         <Resizable direction="vertical">
//             <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
//                 <Resizable direction="horizontal">
//                     <CodeEditor 
//                     initialValue="const a = 2;" 
//                     onChange={(value) => setInput(value)}
//                     />
//                 </Resizable>
//                 <Preview code={code} />
//             </div>
//         </Resizable>
//     )
// };

// export default CodeCell;
