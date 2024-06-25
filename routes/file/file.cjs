const express = require('express');
const router = express.Router();
const multer = require('multer');
const conn = require('../requestDB/db.cjs');

// multer 설정에 encoding 옵션 추가
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 원본 파일 이름으로 저장
  }
});
const upload = multer({ storage: storage, encoding: 'utf-8' });

router.post('/upload', upload.single('file'), (req, res) => {

  const file = req.file;
  if (!file) {
    return res.status(400).send('파일을 업로드해야 합니다.');
  }

  const insertSql = 'INSERT INTO files (originalname, filename,mimetype, size) VALUES (?, ?, ?, ?)';
  const values = [file.originalname, file.filename, file.mimetype, file.size];

  conn.query(insertSql, values, (err, result) =>{
    if (err) {
      console.error('파일 저장 실패 :' + err.stack);
    }
    // console.log('파일정보 저장 성공; : ',);
    return res.json({ ok: true, insertId: result.insertId });
  })
});

router.post('/update', async(req, res) => {
  try{

    const postId = req.body.result[0].id
    const fileId = req.body.result[0].fileId
    const values = [postId,fileId];

    const updateSql = `UPDATE files SET postId = ? WHERE id = ?`

    conn.query(updateSql, values, (err, result) => {
      if (err) {
        console.error('파일정보등록 에러' + err.stack);
        return
      }
      // console.log('파일등록정보 업데이트',);
      return res.json({ ok: true, result });
    })
    // return res.json({ ok: true, data: queryData });
  }catch(error){
    console.log(error)
  }
})

module.exports = router;
