import { createMuiTheme } from '@material-ui/core/styles';

import colors from '@ui/settings/colors';
import setType from '@ui/mixins/setType';

const mui = createMuiTheme();

// console.group('docTheme.js');
// console.log('mui:', mui);
// console.groupEnd();

export default createMuiTheme({
  colors: colors,

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  overrides: {
    MuiIconButton: {
      root: {
        borderRadius: mui.spacing(1),
        color: colors.flare[900],
        padding: mui.spacing(0.75),
        transition: `background ${mui.transitions.duration.standard}ms, backdropFilter ${mui.transitions.duration.standard}ms`,
        '&:hover': {
          backgroundColor: colors.flare[200],
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        ...setType(100),
        backgroundColor: colors.grey[800],
        color: colors.grey[100],
      },
    },
  },

  typography: {
    h1: {
      ...setType(900),
      fontWeight: 'medium',
    },
    h2: {
      ...setType(800),
      fontWeight: 'medium',
    },
    h3: {
      ...setType(700),
      fontWeight: 'medium',
    },
    h4: {
      ...setType(600),
      fontWeight: 'normal',
    },
    h5: {
      ...setType(500),
      fontWeight: 'normal',
    },
    h6: {
      ...setType(400),
      fontWeight: 'normal',
    },
    body1: {
      ...setType(400),
      fontWeight: 'normal',
    },
    body2: {
      ...setType(300),
      fontWeight: 'normal',
    },
    caption: {
      ...setType(200),
      fontWeight: 'normal',
    },
  },
});