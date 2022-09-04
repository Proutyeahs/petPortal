const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const query =`
    SELECT * FROM "species"
  ;`;
  pool.query(query).then(result => {
    console.log("hi", result.rows)
    res.send(result.rows)
  }).catch (err => {
    console.log(err)
    res.sendStatus(500)
  })
});

module.exports = router;
