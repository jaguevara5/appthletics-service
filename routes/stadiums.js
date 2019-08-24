const express = require('express');

const Stadium = require('../models/stadium');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Stadium({
        name: req.body.name,
        address: req.body.address
    });
    post.save().then(createdStadium => {
        res.status(201).json({
            message: 'success',
            stadiumId: createdStadium._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Stadium.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/delete', (req, res, next) => {
    Stadium.deleteMany({ _id: {$in: req.body.stadiums }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {

    Stadium.findOne({_id: req.params.id}, (err, foundStadium) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundStadium) {
                res.status(404).send();
            } else {
                foundStadium.name = req.body.name;

                foundStadium.save((err, updatedStadium) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedStadium
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;