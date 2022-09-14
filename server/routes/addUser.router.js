const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body.user)
    const query =`
      SELECT "user".id FROM "user"
      WHERE "user".username = $1
    ;`;
    pool.query(query, [req.body.user]).then(result => {
      console.log("user", result.rows[0].id, req.body)
      const query1 =`
        UPDATE "pets"
        SET "authorized_user" = $1
        WHERE "id" = $2
      ;`;
      pool.query(query1, [result.rows[0].id, req.body.id]).then(result => {
        res.sendStatus(200)
      })
    }).catch (err => {
      console.log(err)
      res.sendStatus(500)
    })
  });

  module.exports = router;
