const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// gets all the food info from the databse
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
      SELECT * FROM "foods"
      ORDER BY "foods".food_name ASC
    ;`;
    pool.query(query).then(result => {
        console.log("food", result.rows)
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
});

// deletes a specific food from the databse and changes the the default value to 1
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const put = `
        UPDATE "notes"
        SET "foods_id" = 1
        WHERE "foods_id" = $1
    ;`;
    const query = `
        DELETE FROM "foods"
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

// updates a food to be viewed by all user or not
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('this', req.body)
    const query = `
        UPDATE "foods"
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
