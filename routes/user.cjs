const express = require('express');
const router = express.Router();
const conn = require("./requestDB/db.cjs");
const bcrypt = require("bcryptjs");

router.get('/authCheck', (req, res) => {
  const sendData = { isLogin: '', userId: '' };
  if (req.session.isLogin) {
    sendData.isLogin = true;
    sendData.userId = req.session.userId;
  } else {
    sendData.isLogin = false;
  }
  res.send(sendData);
});

router.post('/logout', async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.error('세션 삭제 오류:', err);
      res.status(500).json({ ok: false, error: "로그아웃 중 오류 발생" });
      return;
    }
    res.json({ ok: true, message: "로그아웃 되었습니다." });
  });
});

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  if (userId === '' || password === '') {
    res.status(401).json({ ok: false, error: "ID와 PW를 모두 입력해주세요." });
  } else {
    const loadUser = `SELECT * FROM USER WHERE userId = '${userId}'`;
    conn.query(loadUser, [userId], function (error, results, fields) {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (error, result) => {
          if (error) {
            console.error('bcrypt 비교 오류:', error);
            res.status(500).json({ ok: false, error: "서버 오류 발생" });
            return;
          }
          if (result) {
            req.session.isLogin = true;
            req.session.userId = userId;
            req.session.save(function (err) {
              if (err) {
                console.error('세션 저장 오류:', err);
                res.status(500).json({ ok: false, error: "세션 저장 오류 발생" });
                return;
              }
              res.json({ ok: true, isLogin: true, userId: userId });
            });
          } else {
            res.status(401).json({ ok: false, error: "비밀번호가 틀렸습니다." });
          }
        });
      } else {
        res.status(401).json({ ok: false, error: "사용자를 찾을 수 없습니다." });
      }
    });
  }
});

router.post('/sign', async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const sendData = { isSuccess: '' };
  if (userId && password) {
    conn.query(`SELECT * FROM USER WHERE userId = ?`, [userId], function (err, results, fields) {
      if (results.length <= 0) {
        const hasedPw = bcrypt.hashSync(password, 10);
        conn.query(`INSERT INTO USER (userId, password) VALUES (?, ?)`, [userId, hasedPw], function (error, data) {
          if (error) {
            console.log('error : ', error);
          }
          req.session.save(function () {
            sendData.isSuccess = true;
            res.send(sendData);
          });
        });
      } else {
        sendData.isSuccess = '이미 존재하는 아이디 입니다.';
        res.send(sendData);
      }
    });
  }
});

module.exports = router;