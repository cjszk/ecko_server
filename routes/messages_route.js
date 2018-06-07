const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/messages', (req, res, next) => {
    knex.select()
        .from('messages')
        .then((result) => res.json(result))
        .catch(err => next(err))
})

router.post('/messages', (req, res, next) => {
    const { message, date, exact_time, location } = req.body;
    const object = { message, date, exact_time, location }

    knex('messages')
        .insert(object)
        .returning(['message', 'date', 'exact_time', 'location'])
        .then((result) => {
            res.json(result)
        })
        .catch(err => next(err))

})

module.exports = router;