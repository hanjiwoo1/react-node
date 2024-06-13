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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); // 없으면 req.body undefined
app.use(cors());

const sessionStore = new MySQLStore(sessionOption);

app.use(session({
  key: 'session_cookie_name',
  secret: '~',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))


const userRouter = require('./routes/user.cjs');
// const indexRouter = require('./routes');

app.use('/user', userRouter);

app.post('/login', async (req, res) => {
  const {
    userId,
    password
  } = req.body;

  const sendData = {isLogin: ""}

  if (userId == '' || password == '') {
    res.status(401).json({ok: false, error: "ID와 PW를 모두 입력해주세요."});
  } else {
    const loadUser = `SELECT * FROM USER WHERE userId = '${userId}'`;
    conn.query(loadUser, [userId], function (error, results, fields) {

      if (results.length > 0) {
        console.log('results : ', results[0].password)
        bcrypt.compare(password, results[0].password, (error, result) => {
          if (error) {
            console.error('bcrypt 비교 오류:', error);
            res.status(500).json({ ok: false, error: "서버 오류 발생" });
            return;
          }
          console.log('비밀번호대조 결과 : ', result)

          if (result) {
            console.log('로그인성공 : ', )
            req.session.isLogin = true;
            req.session.userId = userId;
            req.session.save(function () {
              sendData.isLogin = 'true';
              res.send(sendData);
            });
          }
        });
      }

      res.json({ok:true, data: sendData})

    });
  }
});

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
