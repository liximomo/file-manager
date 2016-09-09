import { 
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { darken, lighten, fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

const red = {
  lighten2: '#ee6e73',
};

const teal = {
  lighten1: '#26a69a',
};

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: red.lighten2,
    primary2Color: darken(red.lighten2, 0.15),
    primary3Color: lighten(red.lighten2, 0.15),
    accent1Color: teal.lighten1,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: red.lighten2,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  userAgent: false,
};