const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const query =`
    SELECT * FROM "foods"
    WHERE "authorized" = true
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

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body.food)
    const query =`
    INSERT INTO "foods" ("food_name")
    VALUES ($1)
    ;`;
    pool.query(query, [req.body.food]).then(result => {
        res.sendStatus(200)
    }).catch (err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/:id', (req, res) => {
    const query =`
        SELECT "foods".food_name, COUNT("food_name") FROM "foods"
        JOIN "notes"
        ON "notes".foods_id = "foods".id
        JOIN "pets"
        ON "pets".id = "notes".pets_id
        WHERE ("pets".species_id = $1 AND "authorized" = true)
        GROUP BY "foods".food_name;
    ;`;
    pool.query(query, [req.params.id]).then(result => {
      console.log("food", result.rows)
      res.send(result.rows)
    }).catch (err => {
      console.log(err)
      res.sendStatus(500)
    })
  });

module.exports = router;
