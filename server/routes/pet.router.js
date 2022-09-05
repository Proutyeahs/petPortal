const { query } = require('express');
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const query =`
    INSERT INTO "pets" (
        "user_id", 
        "name", 
        "picture", 
        "description", 
        "birthday", 
        "species_id",
        "cloud_id"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `
    pool.query(query, [req.user.id, req.body.name, req.body.picture, req.body.description, req.body.birthday, req.body.species, req.body.cloud_id])
    .then( result => {
        res.sendStatus(201);
    }).catch (err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
  const query =`
    SELECT * FROM "pets"
    WHERE "user_id" = $1
  ;`;
  pool.query(query, [req.user.id]).then(result => {
    console.log("pets", result.rows)
    res.send(result.rows)
  }).catch (err => {
    console.log(err)
    res.sendStatus(500)
  })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    const query =`
        SELECT "species".species_name, * FROM "species"
        JOIN "pets"
        ON "species".id = "pets".species_id
        WHERE "pets".id = $1
    ;`;
    pool.query(query, [req.params.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.delete(':id', rejectUnauthenticated, (req, res) => {
    const query =`
        DELETE FROM "pets"
        WHERE "id" = $1
    ;`;
    pool.query(query, [req.params.id]).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router;
