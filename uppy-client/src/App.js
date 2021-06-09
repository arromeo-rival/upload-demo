import React from 'react';
import { createStyles, withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Preview from './Preview';

const styles = createStyles({
  appContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  }
});

const App = withStyles(styles)(function App(props) {
  const { classes } = props;
  return (
    <Box className={classes.appContainer}>
      <Preview />
    </Box>
  );
});

export default App;
