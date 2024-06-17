const express = require('express');
const router = express.Router();
const executeQuery = require('./requestDB/dbQuery.cjs');
const cors = require('cors');
const conn = require('./requestDB/db.cjs');

// get : req.query, post : req.body
router.post('/', async(req, res) => {
  try{
    const queryData = await executeQuery(`SELECT * FROM posts`);
    return res.json({ ok: true, data: queryData });
  }catch(error){
    console.log(error)
  }
})

module.exports = router