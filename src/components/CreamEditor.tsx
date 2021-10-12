import React, { useRef } from 'react';
import { Editor, rootCtx, editorViewCtx, parserCtx, Ctx } from '@milkdown/core';
import { EditorRef, ReactEditor, useEditor } from '@milkdown/react';
import { Slice } from 'prosemirror-model';
import EditorKit from '@standardnotes/editor-kit';

// Milkdown editor plugins & themes
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { clipboard } from '@milkdown/plugin-clipboard';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { Listener, listener, listenerCtx } from '@milkdown/plugin-listener';

type UpdateContentParams = {
  editorRef: React.MutableRefObject<EditorRef | null>;
  text: string;
};

function updateContent({ editorRef, text }: UpdateContentParams) {
  if (!editorRef.current) {
    return;
  }

  const editor = editorRef.current.get();
  if (!editor) {
    return;
  }

  editor.action((ctx: Ctx) => {
    const view = ctx.get(editorViewCtx);
    const parser = ctx.get(parserCtx);

    const document = parser(text);
    if (!document) {
      return;
    }

    const { state } = view;

    view.dispatch(
      state.tr
        .replace(0, state.doc.content.size, new Slice(document.content, 0, 0))
        .setMeta('addToHistory', false)
    );
  });
}

function generateCustomPreview(text: string) {
  return {
    plain: 'Created with Cream Editor',
  };
}

const CreamEditor: React.FC = () => {
  const editorRef = useRef<EditorRef | null>(null);

  const editorKitDelegate = {
    setEditorRawText: (text: string) => updateContent({ editorRef, text }),
    generateCustomPreview,
    clearUndoHistory: () => {},
  };

  const editorKit = new EditorKit(editorKitDelegate, {
    mode: 'markdown',
    supportsFilesafe: false,
  });

  const contentListener: Listener = {
    markdown: [
      (getText) => {
        const text = getText();
        editorKit.onEditorValueChanged(text);
      },
    ],
  };

  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(listenerCtx, contentListener);
      })
      .use(nord)
      .use(commonmark)
      .use(clipboard)
      .use(gfm)
      .use(history)
      .use(listener)
      .use(math)
      .use(prism)
      .use(slash)
      .use(tooltip)
  );

  return <ReactEditor ref={editorRef} editor={editor} />;
};

export default CreamEditor;
