const express = require('express');
const router = express.Router();
const executeQuery = require('./requestDB/dbQuery.cjs');
const cors = require('cors');
const conn = require('./requestDB/db.cjs');

// get : req.query, post : req.body
router.post('/', async(req, res) => {
  try{
    const queryData = await executeQuery(`SELECT * FROM posts ORDER BY created_at DESC`);
    return res.json({ ok: true, data: queryData });
  }catch(error){
    console.log(error)
  }
})

router.get('/detail/:id', async(req, res) => {
  try{
    const { id } = req.params;
    const posts = await executeQuery(`SELECT * FROM posts WHERE id = ${id}`);
    const files = await executeQuery(`SELECT * FROM files WHERE postId = ${id}`);
    return res.json({ ok: true, data: {posts, files} });
  }catch(error){
    console.log(error)
  }
})

router.post('/insert', async(req, res) => {
  try{
    const title = req.body.title
    const content = req.body.content
    const insertId = req.body.insertId
    const author = req.session.userId
    const values = [title, content,author, insertId];
    const insertSql = `INSERT INTO posts (title, content, author, fileId) VALUES (?,?,?,?)`

    console.log('req.session.userId : ', req.session.userId)
    conn.query(insertSql, values, async (err, result) => {
      if (err) {
        console.error('게시판 글 등록 에러' + err.stack);
      }
      // console.log('게시판 등록 성공',);
      const select = await executeQuery(`SELECT * FROM posts WHERE id = ${result.insertId}`)
      return res.json({ok: true, result : select});
    })
    // return res.json({ ok: true, data: queryData });
  }catch(error){
    console.log(error)
  }
})

module.exports = router