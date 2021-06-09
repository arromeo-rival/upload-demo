import { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";

function useUppy() {
  const uppy = useRef();
  const [progress, setProgress] = useState();
  const [preview, setPreview] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    uppy.current = new Uppy({ debug: true });
    uppy.current.use(XHRUpload, {
      id: "xhr-plugin",
      endpoint: "http://localhost:4000/upload",
      fieldName: "media",
      formData: true,
    });

    uppy.current.on("upload-error", (file, error, response) => {
      console.log("error with file:", file.id);
      console.log("error message:", error);
    });
    uppy.current.on("progress", (progress) => setProgress(progress));

    uppy.current.on("upload", () => {
      setStatus("uploading");
    });

    uppy.current.on("upload-success", () => {
      setStatus("success");
      setPreview(null);
    });
  }, []);

  // Adds file to Uppy's state and creates a preview URL
  function addFile(file) {
    setPreview(URL.createObjectURL(file));
    setStatus("ready");
    uppy.current.addFile({
      name: file.name,
      type: file.type,
      size: file.size,
      data: file,
      source: "Local",
      isRemote: false,
    });
  }

  function upload() {
    return uppy.current.upload();
  }

  function cancel() {
    uppy.current?.cancelAll();
  }

  function retry() {
    uppy.current?.retryAll();
  }

  return {
    addFile,
    cancel,
    progress,
    retry,
    upload,
    status,
    preview,
  };
}

export default useUppy;
