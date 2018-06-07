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

router.post('/replies', (req, res, next) => {

    const { message, time, exact_time, location, message_id } = req.body;

    let object = { message, time, exact_time, location, message_id };

    knex('replies')
        .insert(object)
        .returning(['message', 'time', 'exact_time', 'location', 'message_id'])
        .then((result) => {
            res.json(result)
        })
        .catch(err => next(err))
})

module.exports = router;