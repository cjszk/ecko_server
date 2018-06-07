const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/messages', (req, res, next) => {
    let replies = [];
    let returnObjects;
    
    knex.select()
    .from('replies')
    .then((result => {
        result.forEach((reply) => {
            replies.push(reply)
        })                   
    }))
    .then(() => {
        knex.select()
        .from('messages')
        .then((results) => {
            returnObjects = results;
            for (let i=0; i<returnObjects.length; i++) {
                returnObjects[i].replies = [];
                replies.forEach((reply) => {
                    if (reply.message_id === returnObjects[i].id) {
                        returnObjects[i].replies.push(reply)
                    }
                })
            }
            res.json(returnObjects);
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))


})

router.post('/messages', (req, res, next) => {
    const { message, time, exact_time, location } = req.body;
    const object = { message, time, exact_time, location }

    knex('messages')
        .insert(object)
        .returning(['message', 'time', 'exact_time', 'location'])
        .then((result) => {
            res.json(result)
        })
        .catch(err => next(err))

})

module.exports = router;