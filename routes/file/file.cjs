const express = require('express');
const router = express.Router();
const multer = require('multer');
const conn = require('../requestDB/db.cjs');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const uuid4 = require('uuid4');
const fs = require('fs');
const SFTPClient = require('ssh2-sftp-client');
app.use(express.static(publicPath));

require('dotenv').config();

const sftp = new SFTPClient();
const sftpConfig = {
  host: process.env.VITE_DB_HOST,
  port: 22,
  username: process.env.VITE_DB_USER,
  password: process.env.VITE_USER_PASS,
};

// multer 설정에 encoding 옵션 추가
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    // 환경 변수에서 업로드 경로 가져오기
    const uploadPath = process.env.VITE_UPLOAD_DIR || 'uploads/'; // 기본값은 'uploads/'로 설정

    // 디렉터리가 존재하지 않으면 생성
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    done(null, uploadPath);
  },
  filename: function (req, file, done) {
    let originalName = file.originalname;
    let uploadPath = process.env.VITE_UPLOAD_DIR || 'uploads/';
    let filePath = path.join(uploadPath, originalName);

    // 중복 이름 체크 및 변경 로직
    let counter = 1;
    while (fs.existsSync(filePath)) {
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);
      originalName = `${baseName}(${counter})${ext}`;
      filePath = path.join(uploadPath, originalName);
      counter++;
    }

    done(null, originalName);
  }
});

const upload = multer({ storage: storage, encoding: 'utf-8' });

router.post('/upload', upload.array('files',5), async (req, res) => {

  const files = req.files;
  try {

    await sftp.connect(sftpConfig);
    for (const file of files) {
      const remoteFilePath = `${process.env.VITE_UPLOAD_DIR}/${file.filename}`; // 원격 서버의 경로로 변경
      await sftp.put(file.path, remoteFilePath);
    }
    await sftp.end();
    res.json({ ok: true, message: 'Files uploaded successfully' });

    // const insertSql = 'INSERT INTO files (originalname, filename, filepath, mimetype, size) VALUES ?';
    // let values = [];
    //
    // files.forEach(file => {
    //   const filePath = path.join('uploads', file.filename);
    //   values.push([file.originalname, file.filename, filePath, file.mimetype, file.size]);
    // });
    // conn.query(insertSql, [values], (err, result) => {
    //   if (err) {
    //     console.error('파일 저장 실패 :' + err.stack);
    //   }
    //   return res.json({ok: true, insertId: result.insertId ? result.insertId : ''});
    // })
  } catch (err) {
    console.error('SFTP upload error:', err);
    res.status(500).json({ok: false, error: err.message});
  }


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
