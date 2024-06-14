const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.post('/', upload.single('file'), (req, res) => {
  console.log('file111111: ', req.file)
});

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('file22222 : ', req.file)
});

module.exports = router