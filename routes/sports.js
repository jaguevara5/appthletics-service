const express = require('express');

const Sport = require('../models/sport');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Sport({
        name: req.body.name
    });
    post.save().then(createdSport => {
        res.status(201).json({
            message: 'success',
            sportId: createdSport._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Sport.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/delete', (req, res, next) => {
    Sport.deleteMany({ _id: {$in: req.body.sports }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    Sport.findOne({_id: req.params.id}, (err, foundSport) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundSport) {
                res.status(404).send();
            } else {
                foundSport.name = req.body.name;

                foundSport.save((err, updatedSport) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedSport
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;