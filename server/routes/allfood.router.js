const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const query =`
      SELECT * FROM "foods"
      ORDER BY "foods".food_name ASC
    ;`;
    pool.query(query).then(result => {
      console.log("food", result.rows)
      res.send(result.rows)
    }).catch (err => {
      console.log(err)
      res.sendStatus(500)
    })
  });

  module.exports = router;
