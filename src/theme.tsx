import { type ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  // Overide the default colors
  palette: {
    mode: 'light',
    primary: {
      main: '#3E874F',
    },
    secondary: {
      main: '#F50057',
    },
    text: {
      primary: '#2E3823',
      secondary: '#FFFFFF',
      disabled: '#A7A7A7',
    },
    error: {
      main: '#EA3442',
    },
  },

  // Override the default text variants
  typography: {
    fontFamily: 'Greycliff CF',
    fontSize: 15,

    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    h1: {
      fontSize: 30,
      fontWeight: '500',
      color: '#303030 !important' 
    },    
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 'bold',
    },

  },

  // Override the default component styles
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 50,
          boxShadow: 'none',
          fontSize: 16,
          fontWeight: 'bold',
          height: '40px',
          width: '100%',
          ":disabled": {
            backgroundColor: '#C9C9C9',
            color: '#FFFFFF',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          padding: '50px 20px',
          width: '80%',
          [theme.breakpoints.up('sm')]: {
            width: '450px',
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#A7A7A7',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          input: {
            height: "40px",
            padding: '0 15px',
            backgroundColor: '#FAFAFA',
            fontSize: 15,
            fontWeight: 'medium',
          },
          width: '100%',
        }
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.text.primary,
        }),
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: '0 10px !important',
          backgroundColor: '#FAFAFA',
        },
        listbox: {
          border: '2px solid ',
          borderColor: '#3E874F',
          '& .MuiAutocomplete-option:hover': { // hover effect for list items
            backgroundColor: '#3E874F26',
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          height: 40,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;