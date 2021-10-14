import './stylesheets/main.scss';

import React, { createRef, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { EditorRef } from '@milkdown/react';

import EditorKit from '@standardnotes/editor-kit';
import MarkdownVisual, {
  setEditable,
  setEditorText,
} from './components/MarkdownVisual';

const MarkdownVisualWrapper: React.FC = () => {
  const editorRef = createRef<EditorRef>();
  const prevTextRef = useRef('');
  const editorKitRef = useRef<any>();

  const onChange = (text: string) => {
    if (prevTextRef.current === text) {
      return;
    }

    prevTextRef.current = text;
    editorKitRef.current.onEditorValueChanged(text);
  };

  useEffect(() => {
    const editorKitDelegate = {
      setEditorRawText: (text: string) => {
        prevTextRef.current = text;
        setEditorText({ editorRef, text });
      },
      generateCustomPreview: (text: string) => {
        const format = (value: number) =>
          value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

        const kbSize = Buffer.byteLength(text) / 1024;

        return {
          html:
            `<span>~${format(kbSize)} KB worth of text.</span>` +
            '<div><em>Created with Markdown Visual.</em></div>',
        };
      },
      onNoteLockToggle: (isLocked: boolean) => {
        const isEditable = !isLocked;
        setEditable({ editorRef, isEditable });
      },
      clearUndoHistory: () => {},
    };

    editorKitRef.current = new EditorKit(editorKitDelegate, {
      mode: 'markdown',
      supportsFilesafe: false,
    });
  }, [editorRef]);

  return <MarkdownVisual ref={editorRef} onChange={onChange} />;
};

ReactDOM.render(
  <React.StrictMode>
    <MarkdownVisualWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
