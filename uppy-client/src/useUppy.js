import { useEffect, useRef, useState } from 'react';
import Uppy from '@uppy/core';
import GoldenRetriever from '@uppy/golden-retriever';
import XHRUpload from '@uppy/xhr-upload';

function useUppy() {
  const uppy = useRef();
  const [progress, setProgress] = useState();

  useEffect(() => {
    uppy.current = new Uppy();

    uppy.current.use(GoldenRetriever, { serviceWorker: true });
    uppy.current.use(XHRUpload, {
      endpoint: 'http://localhost:4000/upload',
      fieldName: 'media',
      formData: true
    });

    uppy.current.on('upload', () => console.log('uploading...'));

    uppy.current.on('progress', (progress) => setProgress(progress));
  }, []);

  function upload(fileObject) {
    uppy.current?.addFile(fileObject);
    uppy.current?.upload();
  }

  function cancel() {
    uppy.current?.cancelAll();
  }

  function retry() {
    uppy.current?.retryAll();
  }

  return {
    cancel,
    progress,
    retry,
    upload
  };
}

export default useUppy;
