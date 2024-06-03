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
    // get : req.query, post : req.body
    const { query = {} } = req.query;
    const result = await executeQuery(`SELECT * FROM USER`);
    return res.json({ ok: true, result });
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
