// src/muse/config/muse.config.ts

import type { ThemeConfig } from 'antd';

export const museAntdTheme: ThemeConfig = {
  token: {
    colorPrimary:        '#c9a84c',
    colorPrimaryHover:   '#a88735',
    colorPrimaryActive:  '#a88735',
    borderRadius:        8,
    fontFamily:          'Inter, sans-serif',
    colorBgContainer:    '#ffffff',
    colorBorder:         '#e8e6e0',
    colorText:           '#1a1f2e',
    colorTextSecondary:  '#6b7280',
    colorBgLayout:       '#f5f4f0',
  },
  components: {
    Button: {
      primaryColor:       '#ffffff',
      defaultBorderColor: '#e8e6e0',
      defaultColor:       '#1a1f2e',
    },
    Input: {
      activeBorderColor:  '#c9a84c',
      hoverBorderColor:   '#c9a84c',
    },
    Select: {
      optionSelectedBg:   'rgba(201, 168, 76, 0.10)',
    },
    Table: {
      headerBg:           '#f9f8f5',
      rowHoverBg:         '#faf9f6',
    },
    Card: {
      borderRadiusLG:     12,
    },
    Tag: {
      borderRadiusSM:     6,
    },
  },
};