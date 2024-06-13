const express = require('express');
const router = express.Router();
const executeQuery = require('./requestDB/dbQuery.cjs');
const cors = require('cors');

router.use(cors());

// get : req.query, post : req.body
router.post('/', async(req, res) => {
  console.log('유저 라우터 :DD ', )
})



router.post('/login', async (req, res) => {
  try {
    console.log('123 : ', )


    const {
      userId,
      password
    } = req.body;

    const result = await executeQuery(`SELECT * FROM USER`);
    return res.json({ ok: true, data: result });
  } catch (error) {
    return res.json({ ok: false, error });
  }
});

module.exports = router