import {addons} from 'storybook/manager-api';
import {create} from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    // Served from `staticDirs`
    brandImage: '/dnd-kit-banner.svg',
    appBg: '#F9F9F9',
  }),
  showPanel: false,
});
