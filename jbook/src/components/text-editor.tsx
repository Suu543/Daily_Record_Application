import "./text-editor.css";
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("# Header");

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // Comparing whether or not that element click the element inside of this div
            // console.log('ref.current', ref.current);
            // console.log('event.target', event.target);
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                console.log('element clicked on is inside editor');
                return;
            }   
            
            console.log('element clicked is not inside editor');

            setEditing(false);
        }

        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }

    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor value={value} onChange={(v) => setValue(v || '')} />
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor;