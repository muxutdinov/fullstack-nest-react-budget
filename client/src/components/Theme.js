import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 30,
    },
  },
});

export const styles = {
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabs: {
    marginLeft: 'auto',
    '& .MuiButtonBase-root.MuiTab-root': {
      fontSize: 14,
    },
    '& .Mui-selected': {
      backgroundColor: '#fce0a2',
      color: '#000',
      opacity: 0.7,
      borderRadius: 2,
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 5,
    marginLeft: '5px',
    marginRight: '5px',
    color: 'white',
  },

  hamburgerMenuIcon: {
    height: '30px',
    width: '30px',
  },
  menuIconContainer: {
    marginLeft: 'auto',
    color: 'white',
    '&:hover': {
      opacity: 1,
    },
  },
};