import React, { forwardRef } from 'react';
import { Ctx, Editor, editorViewCtx, parserCtx, rootCtx } from '@milkdown/core';
import { EditorRef, ReactEditor, useEditor } from '@milkdown/react';
import { Slice } from 'prosemirror-model';

// Milkdown editor plugins & themes
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { clipboard } from '@milkdown/plugin-clipboard';
import { emoji } from '@milkdown/plugin-emoji';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

type SetEditorTextParams = {
  editorRef: React.MutableRefObject<EditorRef | null>;
  text: string;
};

export const setMVEditorText = ({ editorRef, text }: SetEditorTextParams) => {
  const editor = editorRef.current?.get();
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
};

type SetEditableParams = {
  editorRef: React.MutableRefObject<EditorRef | null>;
  isEditable: boolean;
};

export const setMVEditable = ({ editorRef, isEditable }: SetEditableParams) => {
  const editor = editorRef.current?.get();
  if (!editor) {
    return;
  }

  editor.action((ctx: Ctx) => {
    const view = ctx.get(editorViewCtx);
    view.setProps({
      editable: () => isEditable,
    });
  });
};

type GetTextPreviewParams = {
  editorRef: React.MutableRefObject<EditorRef | null>;
  text: string;
};

export const getMVTextPreview = ({ editorRef, text }: GetTextPreviewParams) => {
  const editor = editorRef.current?.get();
  if (!editor) {
    return '';
  }

  return editor.action((ctx: Ctx) => {
    const parser = ctx.get(parserCtx);

    const document = parser(text);
    if (!document) {
      return '';
    }

    return document.textContent;
  });
};

type SetWidthParams = {
  editorRef: React.MutableRefObject<EditorRef | null>;
  width: string;
};

export const setMVWidth = ({ editorRef, width }: SetWidthParams) => {
  const editorDom = editorRef.current?.dom();
  if (!editorDom) {
    return;
  }

  editorDom.style.width = width;
};

type MarkdownVisualProps = {
  onChange: (text: string) => void;
};

const MarkdownVisual = (
  { onChange }: MarkdownVisualProps,
  ref: React.ForwardedRef<EditorRef>
) => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(listenerCtx, {
          markdown: [
            (getText) => {
              const text = getText();
              onChange(text);
            },
          ],
        });
      })
      .use(nord)
      .use(commonmark)
      .use(clipboard)
      .use(emoji)
      .use(gfm)
      .use(history)
      .use(listener)
      .use(math)
      .use(prism)
      .use(slash)
      .use(tooltip)
  );

  return <ReactEditor ref={ref} editor={editor} />;
};

export default forwardRef(MarkdownVisual);
