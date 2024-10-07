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
    const ids = await executeQuery(`SELECT * FROM post_files WHERE postId = ${id}`);
    const fileIds = ids.map(file => file.fileId);
    const files = await executeQuery(`SELECT * FROM files WHERE id IN (${fileIds})`);
    return res.json({ ok: true, posts: posts[0], files: files});
  }catch(error){
    console.log(error)
  }
})

/**
 * files table insert -> posts table insert-> fileId 받아온 후 post_files 테이블에 [postId, fileId] 형식으로 삽입
 */
router.post('/insert', async(req, res) => {
  try{
    const title = req.body.title
    const content = req.body.content
    const insertIds = Array.isArray(req.body.insertId)
                                ? req.body.insertId
                                : [req.body.insertId];
    const author = req.session.userId
    const values = [title, content, author];

    const insertSql = `INSERT INTO posts (title, content, author) VALUES (?,?,?)` // posts table insert
    conn.query(insertSql, values, async (err, result) => {
      if (err) {
        console.error('게시판 글 등록 에러' + err.stack);
        return res.json({ok: false});
      }

      const postId = result.insertId; // posts table insert 후 id값
      const fileValues = insertIds.map(id => [postId, id]) // [게시판id, 파일id] 형태로 배열 생성
      const fileInsertSql = `INSERT INTO post_files (postId, fileId) VALUES ?` // post_files table insert
      conn.query(fileInsertSql, [fileValues], (err, result) => {
        if (err) {
          console.error('포스트 파일 테이블 인서트 에러' + err.stack);
          return
        }
      })
      return res.json({ok: true});
    })
  }catch(error){
    console.log(error)
  }
})

router.post('/update', async(req, res) => {
  try{
    const title = req.body.title
    const content = req.body.content
    const insertId = req.body.insertId
    const id = req.body.id
    const author = req.session.userId
    const values = [title, content,author, insertId, id];
    const updateSql = `UPDATE posts SET title = ?, content = ?, author = ?, fileId = ? WHERE id = ?`;

    conn.query(updateSql, values, async (err, result) => {
      if (err) {
        console.error('게시판 글 수정 에러' + err.stack);
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