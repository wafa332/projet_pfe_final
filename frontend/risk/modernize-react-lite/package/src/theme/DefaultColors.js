import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#dc6900', // PwC's orange
      light: '#eb8c00', // Lighter variation
      dark: '#000000', // Black for a strong contrast
    },
    secondary: {
      main: '#eb8c00', // Another orange shade
      light: '#ffffff', // White as a light variation
      dark: '#404040', // Dark grey for a muted contrast
    },
    success: {
      main: '#5A6A85', // A neutral grey
      light: '#E6FFFA', // Keeping the existing light success color
      dark: '#404040', // Dark grey
      contrastText: '#ffffff',
    },
    info: {
      main: '#eb8c00', // Matching with secondary main
      light: '#EBF3FE', // Keeping existing light info color
      dark: '#1682d4', // Keeping the existing dark info color
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc6900', // PwC's primary orange
      light: '#FDEDE8', // Keeping existing light error color
      dark: '#f3704d', // Keeping existing dark error color
      contrastText: '#ffffff',
    },
    warning: {
      main: '#eb8c00', // Orange for warning
      light: '#FEF5E5', // Keeping existing light warning color
      dark: '#ae8e59', // Keeping existing dark warning color
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE', // Keeping existing purple shades
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#f5f5f5', // Light grey
      200: '#e0e0e0', // Slightly darker grey
      300: '#bdbdbd', // Medium grey
      400: '#7C8FAC', // Keeping existing grey
      500: '#5A6A85', // Keeping existing grey
      600: '#404040', // Dark grey
    },
    text: {
      primary: '#404040', // Dark grey for primary text
      secondary: '#5A6A85', // A slightly lighter grey for secondary text
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)', // Keeping existing action colors
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef', // Keeping existing divider color
  },
  typography,
  shadows
});

export { baselightTheme };
