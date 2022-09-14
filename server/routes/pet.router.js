const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    if (req.body.picture === '') {
        req.body.picture = 'https://res.cloudinary.com/dzyea2237/image/upload/v1662655423/logo_xqynsk.png'
    }
    console.log(req.body)
    const query =`
    INSERT INTO "pets" (
        "user_id", 
        "name", 
        "picture", 
        "description", 
        "birthday", 
        "species_id"
    )
    VALUES ($1, $2, $3, $4, $5, $6);
    `
    pool.query(query, [req.user.id, req.body.name, req.body.picture, req.body.description, req.body.birthday, req.body.species])
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
    WHERE ("user_id" = $1 OR "pets".authorized_user = $1)
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
        WHERE ("pets".id = $1 AND ("pets".user_id = $2 OR "pets".authorized_user = $2))
    ;`;
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const query1=`
        DELETE FROM "notes"
        WHERE ("notes".pets_id = $1 AND "notes".user_id = $2)
        ;`;
    const query =`
        DELETE FROM "pets"
        WHERE ("id" = $1 AND "user_id" = $2)
    ;`;
    pool.query(query1, [req.params.id, req.user.id])
    pool.query(query, [req.params.id, req.user.id]).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log("sup", req.params.id)
    const query =`
        UPDATE "pets"
        SET "name" = $1, "picture" = $2, "description" = $3, "birthday" = $4, "species_id" = $5
        WHERE ("id" = $6 AND "user_id" = $7)
    ;`;
    pool.query(query, [req.body.name, req.body.picture, req.body.description, req.body.birthday, req.body.species, req.body.id, req.user.id])
    .then(result => {
        res.sendStatus(200)
    }).catch( err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router;
