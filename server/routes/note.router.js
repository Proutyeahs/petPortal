const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const query =`
    INSERT INTO "notes" ("pets_id", "foods_id", "date", "notes")
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [req.body.pet_id, req.body.food, req.body.date, req.body.note])
    .then( result => {
        res.sendStatus(201);
    }).catch (err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    const query =`
    SELECT "foods".food_name, * FROM "notes"
    JOIN "foods"
    ON "foods".id = "notes".foods_id
    WHERE "notes".pets_id = $1;
    ;`;
    pool.query(query, [req.params.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router;
