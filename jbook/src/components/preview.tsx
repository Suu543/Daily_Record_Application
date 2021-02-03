import "./preview.css";
import { useEffect, useRef } from 'react';

interface PreviewProps {
    code: string;
}

const html = `
    <html>
        <head>
            <style>html { background-color: white; } </style>
        </head>
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {

        iframe.current.srcdoc = html;

        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe 
                title="preview" 
                ref={iframe} 
                sandbox="allow-scripts"  
                srcDoc={html} 
            />
        </div>
    );
};

export default Preview;

// useEffect(() => {
//     // we update the source of the iFrame and then we immediately post a message into the iFrame
//     // right now when we put some content into that iFrame, 
//     // we are not giving it enough time to initialize and actually set up this event listener to start watching for messages
//     // right now when we set the srcdoc and then immediately post a message,
//     // it is actually the current HTML Document 

//     // In other words, the previous one that was in the iFrame that is receiving the message and processing our code
//     // Then a half second later, all the current content of the window is updated or replaced with the previous line of code
//     // If I put in some content to run, I see the update because we are posting a message into the current version or the current side
//     // the iFrame, and then a millisecond later the browser then replaces the content in the iFrame and everything inside goes away

//     // To fix this up, we can arbitraily delay our post message

//     // 업데이트가 반영되기 전에 반영을 해서 이전께 그대로 오버랩된다.
//     iframe.current.srcdoc = html;
//     // console.log('html', html);
//     // console.log('code', code);

//     // It makes sure that our browser has enough time to update the srcdoc and set up a message listener inside there
//     // or really an event listener inside there and watch for our post message attempt
//     setTimeout(() => {
//         iframe.current.contentWindow.postMessage(code, '*');
//     }, 50);
// }, [code]);