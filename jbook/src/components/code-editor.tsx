import './code-editor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorMount: OnMount = (editor, _monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => onChange(editor.getValue()));
        editor.getModel()?.updateOptions({ tabSize: 2 });
     
        const highlighter = new Highlighter(
          //@ts-ignore
          window.monaco,
          codeShift,
          editor,
        );

        console.log('aa', highlighter.highLightOnDidChangeModelContent);
        
        highlighter.highLightOnDidChangeModelContent(
          () => {},
          () => {},
          undefined,
          () => {},
        );
      }
     

    // const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    //     editorRef.current = monacoEditor;
    //     // second argument references the actual MonacoEditor itself that is being displayed on the screen
    //     monacoEditor.onDidChangeModelContent(() => {
    //         // getValue --> get whatever current value inside of the editor
    //         onChange(getValue());
    //     });

    //     monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    //     const highlighter = new Highlighter(
    //         // @ts-ignore
    //         window.monaco, // this is essentially a reference to the Monaco Library itself
    //         codeShift,
    //         monacoEditor
    //     );

    //     highlighter.highLightOnDidChangeModelContent(
    //         () => {},
    //         () => {},
    //         undefined,
    //         () => {}
    //     );
    // }

    const onFormatClick = () => {
        // get current value from the editor
        const unformatted = editorRef.current.getModel().getValue();

        // format that value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    }

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
            <MonacoEditor
            onMount={onEditorMount} 
            value={initialValue}
            theme="vs-dark" 
            language="javascript" 
            height="500px" 
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }}
            /> 
        </div>
    )
}

export default CodeEditor;