const express = require('express');
const router = express.Router();
const multer = require('multer');
const conn = require('../requestDB/db.cjs');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const uuid4 = require('uuid4');
app.use(express.static(publicPath));

require('dotenv').config();

// multer 설정에 encoding 옵션 추가
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    // 환경 변수에서 업로드 경로 가져오기
    const uploadPath = process.env.VITE_UPLOAD_DIR || 'uploads/'; // 기본값은 'uploads/'로 설정
    done(null, uploadPath);
  },
  filename: function (req, file, done) {
    const random = uuid4(); // 랜덤한 파일 이름 생성
    const ext = path.extname(file.originalname); // 파일 확장자 유지
    const fileName = random + ext; // 새 파일 이름 생성
    done(null, fileName);
  }
});

const upload = multer({ storage: storage, encoding: 'utf-8' });

router.post('/upload', upload.array('files',5), (req, res) => {

  const files = req.files;
  const insertSql = 'INSERT INTO files (originalname, filename, filepath, mimetype, size) VALUES ?';
  let values = [];

  files.forEach(file => {
    const filePath = path.join('uploads', file.filename);
    values.push([file.originalname, file.filename, filePath, file.mimetype, file.size]);
  });
  conn.query(insertSql, [values], (err, result) =>{
    if (err) {
      console.error('파일 저장 실패 :' + err.stack);
    }
    return res.json({ ok: true, insertId: result.insertId ? result.insertId : '' });
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
      return res.json({ ok: true, result });
    })
  }catch(error){
    console.log(error)
  }
})

router.post('/getFiles', async (req, res) => {
  try {
    const sql = `SELECT * FROM files`;
    conn.query(sql, (err, results) => {
      if (err) {
        console.error('파일정보 조회 에러' + err.stack);
        return res.status(500).json({ ok: false, error: err.message });
      }
      return res.json({ ok: true, results });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
