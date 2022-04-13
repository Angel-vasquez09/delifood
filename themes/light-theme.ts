import { createTheme } from '@mui/material/styles';
import { red,  } from '@mui/material/colors';

//light
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#464953'
    },
    secondary: {
      main: '#3A64D8'
    },
    info: {
      main: '#fff'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiDrawer: {
      defaultProps: {
      },
      styleOverrides: {
        paper: {
          /* borderRadius: '30px 0px 0px 30px', */
        }
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: 'Cascadia Code',
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontFamily: 'Cascadia Code',
          fontSize: 20,
          fontWeight: 400
        },
        h3: {
          fontFamily: 'Cascadia Code',
        },
        h5: {
          fontFamily: 'Cascadia Code',
          fontSize: 16,
          fontWeight: 500
        },
        h6: {
          fontFamily: 'Cascadia Code',
        },
        subtitle1: {
          fontFamily: 'Cascadia Code',
          fontSize: 18,
          fontWeight: 600
        },
        subtitle2: {
          fontFamily: 'Cascadia Code',
          fontSize: 14,
          fontWeight: 400
        },
      }
    },


    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 6px rgba(0,0,0,.5)',
          borderRadius: '10px',
        }
      }
    }
  }
});