const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// posts a new note for a pet to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const query =`
    INSERT INTO "notes" ("pets_id", "foods_id", "date", "notes", "user_id")
        VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query, [req.body.pet_id, req.body.food, req.body.date, req.body.note, req.user.id])
    .then( result => {
        res.sendStatus(201);
    }).catch (err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// gets all the notes for a specific pet from the databse
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    const query =`
    SELECT "foods".food_name, "notes".* FROM "foods"
    JOIN "notes"
    ON "foods".id = "notes".foods_id
    JOIN "pets"
    ON "pets".id = "notes".pets_id
    WHERE ("notes".pets_id = $1 AND ("pets".user_id = $2 OR "pets".authorized_user = $2))
    ORDER BY "notes".date DESC
    ;`;
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// updates a specific note
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log("note", req.body)
    const query =`
        UPDATE "notes"
        SET "foods_id" = $1, "date" = $2, "notes" = $3
        WHERE ("id" = $4 AND "user_id" = $5)
    ;`;
    pool.query(query, [req.body.food, req.body.date, req.body.note, req.body.id, req.user.id])
    .then(result => {
        res.sendStatus(200)
    }).catch( err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// get the info for a specific note from the database
router.get('/this/:id', rejectUnauthenticated, (req, res) => {
    console.log("wow", req.params.id)
    const query =`
        SELECT * FROM "notes"
        WHERE ("notes".id = $1 AND "notes".user_id = $2)
    ;`;
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// deletes a specific note from the databse
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const query =`
        DELETE FROM "notes"
        WHERE ("id" = $1 AND "user_id" = $2)
    ;`;
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router;
