import React, { useRef } from "react";
import { createStyles, withStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useUppy from "../useUppy";

const styles = createStyles({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "8px",

    "&>*": {
      marginLeft: "8px",
    },
  },
  imageContainer: {
    maxHeight: "500px",
    maxWidth: "500px",
  },
  noPreview: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  overlay: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  success: {
    alignItems: "center",
    backgroundColor: "green",
    cursor: "pointer",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  preview: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#cccccc",
    display: "flex",
    height: "500px",
    justifyContent: "center",
    width: "500px",
  },
});

const Preview = withStyles(styles)(function Preview(props) {
  const { classes } = props;
  const fileInputRef = useRef();

  const { addFile, preview, progress, status, upload } = useUppy();

  function handleFilePickerClick() {
    fileInputRef.current.click();
  }

  function handleMediaChange(event) {
    const [file] = event.target.files;

    if (file) {
      addFile(file);
    }
  }

  function handleUploadButtonClick() {
    upload();
  }

  return (
    <Box paddingTop="24px">
      <Card>
        <Box className={classes.preview}>
          {status !== "idle" ? (
            <>
              {status === "uploading" && (
                <Box className={classes.overlay}>
                  <CircularProgress
                    size={80}
                    thickness={5}
                    value={progress}
                    variant="determinate"
                  />
                </Box>
              )}

              {status === "success" && (
                <Box className={classes.success}>
                  <CheckCircleIcon
                    style={{ height: "100px", width: "100px" }}
                  />
                </Box>
              )}
              {preview && (
                <img
                  className={classes.imageContainer}
                  src={preview}
                  alt="preview"
                />
              )}
            </>
          ) : (
            <Box className={classes.noPreview} onClick={handleFilePickerClick}>
              <AddAPhotoIcon style={{ height: "100px", width: "100px" }} />
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
          <Button
            color="primary"
            disabled={!preview}
            onClick={handleUploadButtonClick}
            variant="contained"
          >
            Upload
          </Button>
        </Box>
        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleMediaChange}
          type="file"
        />
      </Card>
    </Box>
  );
});

export default Preview;
