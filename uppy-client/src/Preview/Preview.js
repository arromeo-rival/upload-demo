import React, { useRef, useState } from 'react';
import { createStyles, withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const styles = createStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px',

    '&>*': {
      marginLeft: '8px'
    }
  },
  imageContainer: {
    maxHeight: '500px',
    maxWidth: '500px'
  },
  noPreview: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  preview: {
    alignItems: 'center',
    backgroundColor: '#cccccc',
    display: 'flex',
    height: '500px',
    justifyContent: 'center',
    width: '500px'
  }
});

const Preview = withStyles(styles)(function Preview(props) {
  const { classes } = props;
  const fileInputRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const [source, setSource] = useState();

  function handleFilePickerClick() {
    fileInputRef.current.click();
  }

  function handleMediaChange(event) {
    const [file] = event.target.files;

    if (file) {
      setShowPreview(true);
      setSource(URL.createObjectURL(file));
    }
  }

  return (
    <Box paddingTop="24px">
      <Card>
        <Box className={classes.preview}>
          {showPreview ? (
            <img
              className={classes.imageContainer}
              src={source}
              alt="preview"
            />
          ) : (
            <Box className={classes.noPreview} onClick={handleFilePickerClick}>
              <AddAPhotoIcon style={{ height: '100px', width: '100px' }} />
            </Box>
          )}
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            color="primary"
            onClick={handleFilePickerClick}
            variant="contained"
          >
            Pick file
          </Button>
          <Button color="primary" disabled={!source} variant="contained">
            Upload
          </Button>
        </Box>
        <input
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleMediaChange}
          type="file"
        />
      </Card>
    </Box>
  );
});

export default Preview;
