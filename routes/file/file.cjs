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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files', 5), async (req, res) => {
  const files = req.files;
  let insertId = [];
  try {
    await sftp.connect(sftpConfig);
    for (const file of files) {
      const remoteDir = process.env.VITE_UPLOAD_DIR;
      const remoteFilePath = `${remoteDir}/${file.originalname}`;

      // 원격 디렉토리 존재 여부 확인 및 생성
      try {
        await sftp.mkdir(remoteDir, true);
        const insertSql = 'INSERT INTO files (originalname, filename, filepath, mimetype, size) VALUES ?';
        let values = [];
        values.push([file.originalname, file.originalname, remoteFilePath, file.mimetype, file.size]);
        conn.query(insertSql, [values], (err, result) => {
          if (err) {
            console.error('파일 저장 실패 :' + err.stack);
          }
          insertId.push(result.insertId);
        });
      } catch (err) {
        if (err.code !== 4) {
          throw err;
        }
      }

      // 메모리에서 원격 서버로 파일 업로드
      await sftp.put(Buffer.from(file.buffer), remoteFilePath);
    }
    await sftp.end();
    return res.json({ ok: true, insertId: insertId ? insertId : '' });
  } catch (err) {
    console.error('SFTP upload error:', err);
    res.status(500).json({ ok: false, error: err.message });
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
