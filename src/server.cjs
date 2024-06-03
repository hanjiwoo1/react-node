const conn = require('../routes/requestDB/db.cjs'),
  express = require('express'),
  executeQuery = require('../routes/requestDB/dbQuery.cjs');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

app.use(cors());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api', async (req, res) => {
  try {
    // 쿼리 파라미터를 가져오는 방식이 잘못되었습니다. GET 요청의 쿼리 파라미터는 req.query에서 가져와야 합니다.
    const { query = {} } = req.query;

    const result = await executeQuery(`SELECT * FROM USER`);

    return res.json({ ok: true, data: result });
  } catch (error) {
    return res.json({ ok: false, error });
  }
});


server.listen(8080, () => {
  console.log('server is running on 8080 : ')
});

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '../dist/index.html'));
});
