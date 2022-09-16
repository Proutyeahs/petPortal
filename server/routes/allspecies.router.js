const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// gets all the species in the database
router.get('/', (req, res) => {
    const query = `
      SELECT * FROM "species"
      ORDER BY "species".species_name ASC
    ;`;
    pool.query(query).then(result => {
        console.log("hi", result.rows)
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
});

// deletes a specific species from the database and changes the the default value to 1
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const put = `
        UPDATE "pets"
        SET "species_id" = 1
        WHERE "species_id" = $1
    ;`;
    const query = `
        DELETE FROM "species"
        WHERE "id" = $1
    ;`;
    pool.query(put, [req.params.id]).then(result => {
        pool.query(query, [req.params.id]).then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
})

// toggles the authorized or unauthorized column so only authorized species render for users
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('this', req.body)
    const query = `
        UPDATE "species"
        SET "authorized" = $1
        WHERE "id" = $2
    ;`;
    pool.query(query, [!req.body.authorized, req.body.id])
        .then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router;
