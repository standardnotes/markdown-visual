import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import CodeMirrorReact, {
  EditorView,
  ReactCodeMirrorRef,
  StateEffect,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { CSSProperties, forwardRef } from 'react';

type SetEditorTextParams = {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>;
  text: string;
};

export const setCMEditorText = ({ editorRef, text }: SetEditorTextParams) => {
  const view = editorRef.current?.view;
  if (!view) {
    return;
  }

  const { state } = view;
  if (!state) {
    return;
  }

  const document = state?.doc;
  if (!document) {
    return;
  }

  view.dispatch({
    changes: {
      from: 0,
      to: document.toString().length,
      insert: text,
    },
  });
};

type SetLineWrappingParams = {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>;
};

export const setCMLineWrapping = ({ editorRef }: SetLineWrappingParams) => {
  const view = editorRef.current?.view;
  if (!view) {
    return;
  }

  const extension = [];
  extension.push(EditorView.lineWrapping);

  view.dispatch({
    effects: StateEffect.reconfigure.of(extension),
  });
};

type SetEditableParams = {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>;
  isEditable: boolean;
};

export const setCMEditable = ({ editorRef, isEditable }: SetEditableParams) => {
  const view = editorRef.current?.view;
  if (!view) {
    return;
  }

  const extension = [];
  extension.push(EditorView.editable.of(isEditable));

  view.dispatch({
    effects: StateEffect.reconfigure.of(extension),
  });
};

type SetStyleParams = {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>;
  display?: CSSStyleDeclaration['display'];
  width?: CSSStyleDeclaration['width'];
};

export const setCMStyle = ({ editorRef, display, width }: SetStyleParams) => {
  const editorDom = editorRef.current?.editor;
  if (!editorDom) {
    return;
  }

  if (display) {
    editorDom.style.display = display;
  }

  if (width) {
    editorDom.style.width = width;
  }
};

type GetDisplayParams = {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>;
};

export const getCMDisplay = ({ editorRef }: GetDisplayParams) => {
  const editorDom = editorRef.current?.editor;
  if (!editorDom) {
    return;
  }

  return editorDom.style.display;
};

type CodeMirrorEditorProps = {
  onChange: (text: string, viewUpdate: ViewUpdate) => void;
  style: CSSProperties;
};

const CodeMirror = (
  { onChange, style }: CodeMirrorEditorProps,
  ref: React.ForwardedRef<ReactCodeMirrorRef>
) => {
  const extensions = [
    markdown({
      base: markdownLanguage,
    }),
  ];

  return (
    <CodeMirrorReact
      ref={ref}
      extensions={extensions}
      onChange={onChange}
      style={style}
    />
  );
};

export default forwardRef(CodeMirror);
