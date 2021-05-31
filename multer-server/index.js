const express = require('express');
const multer = require('multer');
const cors = require('cors');

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5000'
  })
);

app.post('/upload', upload.single('media'), function (req, res, next) {
  console.log('req.file', req.file);
  res.json({}).send();
});

app.listen('4000', () => {
  console.log('Listening on port 4000...');
});
