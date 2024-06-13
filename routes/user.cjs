const express = require('express');
const router = express.Router();
const executeQuery = require('./requestDB/dbQuery.cjs');
const cors = require('cors');
const conn = require('./requestDB/db.cjs');

router.use(cors());

// get : req.query, post : req.body
router.post('/', async(req, res) => {
  console.log('유저 라우터 :DD ', )
})

module.exports = router