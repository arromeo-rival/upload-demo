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

// import Uppy from '@uppy/core';
// import GoldenRetriever from '@uppy/golden-retriever';
// import Dashboard from '@uppy/react/lib/Dashboard';
// import XHRUpload from '@uppy/xhr-upload';
// import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';

// const uppy = new Uppy();

// uppy.use(GoldenRetriever, { serviceWorker: true });
// uppy.use(XHRUpload, {
//   endpoint: 'http://localhost:4000/upload',
//   fieldName: 'media',
//   formData: true
// });

// uppy.on('upload', () => {
//   console.log('uploading...');
// });

// uppy.on('progress', (progress) => {
//   console.log(progress);
// });

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Dashboard uppy={uppy} />
//       </header>
//     </div>
//   );
// }

const App = withStyles(styles)(function App(props) {
  const { classes } = props;
  return (
    <Box className={classes.appContainer}>
      <Preview />
    </Box>
  );
});

export default App;
