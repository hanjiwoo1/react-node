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
  bcrypt = require('bcryptjs');

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

const userRouter = require('./routes/user.cjs')
const postsRouter = require('./routes/posts.cjs');
const fileRouter = require('./routes/file/file.cjs')

app.use('/api/posts', postsRouter);
app.use('/api/file', fileRouter);
app.use('/api/user', userRouter);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, './dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

server.listen(8080, () => {
  console.log('server is running on 8080 :::::::::: ')
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, './dist/index.html'));
});
