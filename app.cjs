const conn = require('./routes/requestDB/db.cjs'),
  express = require('express'),
  cors = require('cors'),
  app = express(),
  server = require('http').createServer(app),
  path = require('path'),
  session = require('express-session'),
  sessionOption = require('./routes/sessionOption.cjs'),
  bodyParser = require("body-parser"),
  MySQLStore = require('express-mysql-session')(session),
  bcrypt = require('bcrypt');

// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); // 없으면 req.body undefined
app.use(cors({
  origin: ['http://localhost:5173','http://223.130.150.7'],
  credentials: true
}));

const sessionStore = new MySQLStore(sessionOption);
const sessionSecret = process.env.VITE_API_SESSION_SECRET;

app.use(session({
  key: 'session_cookie_name',
  secret: sessionSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 쿠키 유효기간 설정 (예: 1일)
    secure: false,
    httpOnly: true // 클라이언트에서 자바스크립트를 통해 쿠키에 접근하지 못하도록 설정
  }
}))

const postsRouter = require('./routes/posts.cjs');
const fileRouter = require('./routes/file/file.cjs')
// const indexRouter = require('./routes');

app.use('/posts', postsRouter);
app.use('/file', fileRouter);

app.get('/authCheck', (req, res) => {

  const sendData = {isLogin: '', userId : ''};
  if (req.session.isLogin) {
    sendData.isLogin = true;
    sendData.userId = req.session.userId;
  } else {
    sendData.isLogin = false;
  }
  res.send(sendData);
});

app.post('/logout', async (req, res) => {
  // 세션 삭제
  req.session.destroy(function(err) {
    if (err) {
      console.error('세션 삭제 오류:', err);
      res.status(500).json({ ok: false, error: "로그아웃 중 오류 발생" });
      return;
    }
    // 로그아웃 성공 응답
    res.json({ ok: true, message: "로그아웃 되었습니다." });
  });
});


app.post('/login', async (req, res) => {
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


app.post('/sign', async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const sendData = {isSuccess: ''};

  if (userId && password) {
    conn.query(`SELECT * FROM USER WHERE userId = ?`, [userId], function (err, results, fields) {
      if (results.length <= 0) {
        const hasedPw = bcrypt.hashSync(password, 10);
        conn.query(`INSERT INTO USER (userId, password) VALUES (?, ?)`, [userId, hasedPw], function (error, data) {
          if (error) {
            console.log('error : ', error)
          }
          req.session.save(function () {
            sendData.isSuccess = true;
            res.send(sendData);
          });
        });
      } else {
        sendData.isSuccess = '이미 존재하는 아이디 입니다.'
        res.send(sendData);
      }
    });
  }

});

// console.log('precess.env.NODE_ENV : ', process.env.NODE_DEV)

// 정적 파일 제공
app.use(express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

server.listen(8080, () => {
  console.log('server is running on 8080 :::::::::: ')
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, './dist/index.html'));
});
