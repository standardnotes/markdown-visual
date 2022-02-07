/* Copyright 2021, Milkdown by Mirone. */

import { createCmd, createCmdKey } from '@milkdown/core';
import { Plugin, PluginKey, selectParentNode } from '@milkdown/prose';
import { createPlugin } from '@milkdown/utils';

import { MenuConfig, menuConfig } from './config';
import { Manager } from './manager';

export type Options = {
  config: MenuConfig;
  enabled: boolean;
};

export { menuConfig } from './config';

export const menu = createPlugin<string, Options>((utils, options) => {
  const config = options?.config ?? menuConfig;
  const enabled = options?.enabled ?? true;

  const SelectParent = createCmdKey();

  return {
    commands: () => [createCmd(SelectParent, () => selectParentNode)],
    prosePlugins: (_, ctx) => {
      const plugin = new Plugin({
        key: new PluginKey('milkdown-advanced-menu'),
        view: (editorView) => {
          const manager = new Manager(config, utils, ctx, editorView, {
            enabled,
          });

          return {
            update: (view) => manager.update(view),
          };
        },
      });

      return [plugin];
    },
  };
});
