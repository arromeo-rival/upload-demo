import { useRef, useState } from 'react';
import './App.css';

function App() {
  const previewRef = useRef();
  const formRef = useRef();

  const [showPreview, setShowPreview] = useState();
  const [progress, setProgress] = useState();

  function handleMediaChange(e) {
    const [file] = e.target.files;

    if (file) {
      setShowPreview(true);
      previewRef.current.src = URL.createObjectURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const [file] = formRef.current.media.files;

    const formData = new FormData();
    formData.append('media', file);

    const client = new XMLHttpRequest();
    client.upload.onprogress = (pe) => {
      setProgress((pe.loaded / pe.total) * 100);
    };
    client.onloadend = (pe) => {
      console.log('loaded');
      console.log(pe.loaded);
    };
    client.open('POST', 'http://localhost:4000/upload', true);
    client.send(formData);
  }

  console.log('progress', progress);

  return (
    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="media" onChange={handleMediaChange} />
      <button type="submit">Submit</button>
      <div>
        <img
          ref={previewRef}
          alt="preview"
          style={{
            display: showPreview ? 'initial' : 'none',
            maxHeight: '400px',
            maxWidth: '400px'
          }}
        />
        <div style={{ display: 'flex', height: '20px' }}>
          <div style={{ width: `${progress}%`, backgroundColor: 'blue' }} />
        </div>
      </div>
    </form>
  );
}

export default App;
