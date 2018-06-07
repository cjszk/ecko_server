const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/replies', (req, res, next) => {
    knex.select()
        .from('replies')
        .then((result) => {
            res.json(result)
        })
        .catch(err => next(err))
})

module.exports = router;