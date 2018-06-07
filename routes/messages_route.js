const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/messages', (req, res, next) => {
    let replies = [];
    let returnObj;
    knex.select()
        .from('messages')
        .then((result) => {
            returnObj = result[0];
            returnObj.replies = [];
            knex.select()
                .from('replies')
                .then((result => {
                    result.forEach((reply) => {
                        if (reply.id === returnObj.id) {
                            replies.push(reply)
                        }
                    })
                    returnObj.replies = replies;
                    console.log(returnObj)
                    res.json(returnObj)                    
                }))
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