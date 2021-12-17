import './stylesheets/main.scss';

import React, { createRef, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { EditorRef } from '@milkdown/react';
import MarkdownVisual, {
  setMVEditable,
  setMVEditorText,
  getMVTextPreview,
  setMVWidth,
} from './components/MarkdownVisual';

import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import CodeMirror, {
  getCMDisplay,
  setCMEditable,
  setCMEditorText,
  setCMLineWrapping,
  setCMStyle,
} from './components/CodeMirror';

import { RiBookReadLine } from 'react-icons/ri';

import EditorKit from '@standardnotes/editor-kit';

const AppWrapper: React.FC = () => {
  const markdownVisualRef = createRef<EditorRef>();
  const codeMirrorRef = createRef<ReactCodeMirrorRef>();

  const prevTextRef = useRef('');
  const editorKitRef = useRef<any>();

  const onMilkdownChange = (text: string) => {
    if (prevTextRef.current.trim() === text.trim()) {
      return;
    }

    prevTextRef.current = text;

    setCMEditorText({ editorRef: codeMirrorRef, text });
    editorKitRef.current.onEditorValueChanged(text);
  };

  const onCodeMirrorChange = (text: string) => {
    if (prevTextRef.current === text) {
      return;
    }

    prevTextRef.current = text;

    setMVEditorText({ editorRef: markdownVisualRef, text });
    editorKitRef.current.onEditorValueChanged(text);
  };

  useEffect(() => {
    const editorKitDelegate = {
      setEditorRawText: (text: string) => {
        prevTextRef.current = text;
        setMVEditorText({ editorRef: markdownVisualRef, text });
        setCMEditorText({ editorRef: codeMirrorRef, text });
      },
      generateCustomPreview: (text: string) => {
        return {
          plain: getMVTextPreview({ editorRef: markdownVisualRef, text }),
        };
      },
      onNoteLockToggle: (isLocked: boolean) => {
        const isEditable = !isLocked;
        setMVEditable({ editorRef: markdownVisualRef, isEditable });
        setCMEditable({ editorRef: codeMirrorRef, isEditable });
      },
      clearUndoHistory: () => {},
    };

    editorKitRef.current = new EditorKit(editorKitDelegate, {
      mode: 'markdown',
      supportsFilesafe: false,
    });

    setMVWidth({
      editorRef: markdownVisualRef,
      width: '100%',
    });
  });

  const toggleSplitView = () => {
    const codeMirrorDisplay = getCMDisplay({
      editorRef: codeMirrorRef,
    });

    const newDisplay = codeMirrorDisplay === 'block' ? 'none' : 'block';

    setCMStyle({
      editorRef: codeMirrorRef,
      display: newDisplay,
      width: newDisplay === 'none' ? '0%' : '50%',
    });

    setMVWidth({
      editorRef: markdownVisualRef,
      width: newDisplay === 'none' ? '100%' : '50%',
    });

    setCMLineWrapping({
      editorRef: codeMirrorRef,
    });
  };

  const styles = {
    splitView: {
      display: 'flex',
      marginTop: '2rem',
    },
    rightPane: {
      width: '50%',
      display: 'none',
    },
  };

  return (
    <>
      <div className="app-header">
        <RiBookReadLine
          className="toggle-button"
          onClick={toggleSplitView}
          size={32}
        />
      </div>
      <div style={styles.splitView}>
        <MarkdownVisual ref={markdownVisualRef} onChange={onMilkdownChange} />
        <CodeMirror
          ref={codeMirrorRef}
          onChange={onCodeMirrorChange}
          style={styles.rightPane}
        />
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
