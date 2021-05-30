import React from 'react';
import './App.css';

import Uppy from '@uppy/core';
import GoldenRetriever from '@uppy/golden-retriever';
import Dashboard from '@uppy/react/lib/Dashboard';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uppy = new Uppy();

uppy.use(GoldenRetriever, { serviceWorker: true });
uppy.use(XHRUpload, {
  endpoint: 'http://localhost:4000/upload',
  fieldName: 'media',
  formData: true
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard uppy={uppy} />
      </header>
    </div>
  );
}

export default App;
