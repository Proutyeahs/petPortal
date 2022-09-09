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
    SELECT "foods".food_name, "notes".* FROM "foods"
    JOIN "notes"
    ON "foods".id = "notes".foods_id
    JOIN "pets"
    ON "pets".id = "notes".pets_id
    WHERE ("notes".pets_id = $1 AND "pets".user_id = $2)
    ORDER BY "notes".date DESC
    ;`;
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log("note", req.body)
    const query =`
        UPDATE "notes"
        SET "foods_id" = $1, "date" = $2, "notes" = $3
        WHERE "id" = $4
    ;`;
    pool.query(query, [req.body.food, req.body.date, req.body.note, req.body.id])
    .then(result => {
        res.sendStatus(200)
    }).catch( err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/this/:id', rejectUnauthenticated, (req, res) => {
    console.log("wow", req.params.id)
    const query =`
        SELECT * FROM "notes"
        WHERE "notes".id = $1
    ;`;
    pool.query(query, [req.params.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const query =`
        DELETE FROM "notes"
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
