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

module.exports = router;
