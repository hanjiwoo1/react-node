const conn = require('./routes/requestDB/dbQuery.cjs'),
  express = require('express'),
  cors = require('cors'),
  app = express(),
  server = require('http').createServer(app),
  path = require('path');

app.use(express.json()); // 없으면 req.body undefined
app.use(cors());

const userRouter = require('./routes/user.cjs');
// const indexRouter = require('./routes');

app.use('/user', userRouter);

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
